'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';
import { getCategoryIcon } from './PremiumIcons';
import { useSmoothScroll } from './SmoothScroll';
import tts from '@/utils/tts';
import { Mascot } from './Mascot';
import { usePassport } from '@/contexts/Passport';
import { useIsMobile } from '@/utils/useIsMobile';

// ── Splits narrator text into sentence-sized caption chunks ──────────────────
function splitIntoCaptions(text: string): string[] {
  if (!text) return [];
  // Split on sentence-ending punctuation, keeping the delimiter
  const raw = text.match(/[^.!?]+[.!?]*/g) || [text];
  const chunks: string[] = [];
  for (const sentence of raw) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;
    // Long sentences: break further at commas/semicolons (~60 chars max)
    if (trimmed.length > 80) {
      const sub = trimmed.split(/(?<=[,;])\s+/);
      let current = '';
      for (const part of sub) {
        if ((current + ' ' + part).trim().length > 80 && current) {
          chunks.push(current.trim());
          current = part;
        } else {
          current = current ? current + ' ' + part : part;
        }
      }
      if (current.trim()) chunks.push(current.trim());
    } else {
      chunks.push(trimmed);
    }
  }
  return chunks.filter(Boolean);
}

export const CultureDetail = ({ visible }) => {
  const { selectedCulture, selectedProvince, goTo, startQuiz, markCultureListened } = useAppFlow();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ttsFinished, setTtsFinished] = useState(false);
  const progressInterval = useRef(null);
  const startTime = useRef(null);
  const estimatedDuration = useRef(15000);
  const infoPanelRef = useRef(null);
  const isMobile = useIsMobile(768);
  const pausedCaptionIndex = useRef(0);

  useSmoothScroll(infoPanelRef, visible);

  const { stampProvince } = usePassport();

  // Full-screen cinematic mode — desktop only
  const isCinematic = !isMobile && isSpeaking && !isPaused;
  // Mobile sticky highlight — mobile only
  const isMobileNarrating = isMobile && isSpeaking;

  // Pre-compute caption chunks from narrator text
  const captions = useMemo(
    () => splitIntoCaptions(selectedCulture?.narrator || ''),
    [selectedCulture]
  );

  // Derive which caption to show from progress (0–100)
  const activeCaptionIndex = useMemo(() => {
    if (!captions.length) return 0;
    const idx = Math.floor((progress / 100) * captions.length);
    return Math.min(idx, captions.length - 1);
  }, [progress, captions]);

  useEffect(() => {
    if (ttsFinished && selectedProvince?.id) {
      stampProvince(selectedProvince.id);
    }
  }, [ttsFinished, selectedProvince?.id, stampProvince]);

  useEffect(() => {
    setIsSpeaking(false);
    setIsPaused(false);
    setProgress(0);
    setTtsFinished(false);
    tts.stop();
  }, [selectedCulture]);

  useEffect(() => {
    return () => {
      tts.stop();
      clearInterval(progressInterval.current);
    };
  }, []);

  const startNarration = () => {
    if (!selectedCulture) return;
    tts.stop();
    setProgress(0);
    setTtsFinished(false);
    pausedCaptionIndex.current = 0;
    startTime.current = Date.now();
    const wordCount = selectedCulture.narrator.split(' ').length;
    estimatedDuration.current = (wordCount / 2.5) * 1000;

    tts.speak(selectedCulture.narrator, {
      lang: 'id-ID',
      rate: 0.85,
      onEnd: () => {
        setIsSpeaking(false);
        setProgress(100);
        setTtsFinished(true);
        clearInterval(progressInterval.current);
        if (selectedCulture?.id && selectedCulture?.provinceId) {
          markCultureListened(selectedCulture.id, selectedCulture.provinceId);
        }
      },
    });
    setIsSpeaking(true);
    setIsPaused(false);

    clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      if (!startTime.current) return;
      const elapsed = Date.now() - startTime.current;
      const pct = Math.min((elapsed / estimatedDuration.current) * 100, 98);
      setProgress(pct);
    }, 200);
  };

  const togglePause = () => {
    if (isPaused) {
      setIsPaused(false);
      // Construct remaining text starting from the paused sentence
      const remainingCaptions = captions.slice(pausedCaptionIndex.current);
      const remainingText = remainingCaptions.join(' ');
      
      const wordCount = remainingText.split(' ').length;
      const remainingDuration = (wordCount / 2.5) * 1000;
      const startProgress = (pausedCaptionIndex.current / captions.length) * 100;

      startTime.current = Date.now();

      tts.speak(remainingText, {
        lang: 'id-ID',
        rate: 0.85,
        onEnd: () => {
          setIsSpeaking(false);
          setProgress(100);
          setTtsFinished(true);
          clearInterval(progressInterval.current);
          if (selectedCulture?.id && selectedCulture?.provinceId) {
            markCultureListened(selectedCulture.id, selectedCulture.provinceId);
          }
        },
      });

      clearInterval(progressInterval.current);
      progressInterval.current = setInterval(() => {
        if (!startTime.current) return;
        const elapsed = Date.now() - startTime.current;
        const delta = (elapsed / remainingDuration) * (100 - startProgress);
        const pct = Math.min(startProgress + delta, 98);
        setProgress(pct);
      }, 200);
    } else {
      // Pause: Stop speaking and record current caption index
      tts.stop();
      setIsPaused(true);
      clearInterval(progressInterval.current);
      pausedCaptionIndex.current = activeCaptionIndex;
    }
  };

  const stopNarration = () => {
    tts.stop();
    setIsSpeaking(false);
    setIsPaused(false);
    setProgress(0);
    clearInterval(progressInterval.current);
  };

  if (!visible || !selectedCulture) return null;

  const Icon = getCategoryIcon(selectedCulture.category);

  return (
    <motion.div
      className="cd-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
    >
      {/* ── MOBILE: dim overlay over info content when narrating ── */}
      <AnimatePresence>
        {isMobileNarrating && (
          <motion.div
            className="cd-info-dim-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* ── LAYOUT GRID (animates columns for cinematic stretch — desktop only) ── */}
      <motion.div
        className="cd-layout"
        animate={{
          gridTemplateColumns: isCinematic ? '1fr 0fr' : '1fr 1fr',
        }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* ── LEFT: VIDEO PANEL ── */}
        <motion.div
          className={`cd-video-panel${isMobileNarrating ? ' is-sticky' : ''}`}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'relative' }}
        >
          <div className="cd-video-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${selectedCulture.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${selectedCulture.youtubeId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="cd-iframe"
              loading="lazy"
              title={selectedCulture.title}
            />
            {/* Video overlay — darker in cinematic mode for caption legibility */}
            <div className={`cd-video-overlay${isCinematic ? ' cinematic' : ''}`} />

            {/* ── FLOATING CONTROLS (visible only in cinematic mode) ── */}
            <AnimatePresence>
              {isSpeaking && (
                <motion.div
                  className="cd-floating-controls"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    className="cd-float-btn pause"
                    onClick={togglePause}
                  >
                    {isPaused ? (
                      <>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Lanjutkan
                      </>
                    ) : (
                      <>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                        Jeda
                      </>
                    )}
                  </button>
                  <button
                    className="cd-float-btn stop"
                    onClick={stopNarration}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 6h12v12H6z" />
                    </svg>
                    Selesai
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── LIVE CAPTIONS (visible only when cinematic and speaking) ── */}
            <AnimatePresence mode="wait">
              {isCinematic && captions.length > 0 && (
                <motion.div
                  key={activeCaptionIndex}
                  className="cd-captions-container"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="cd-caption-text">
                    {captions[activeCaptionIndex]}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── RIGHT: INFO PANEL ── */}
        <motion.div
          ref={infoPanelRef}
          className="cd-info-panel"
          initial={{ x: 60, opacity: 0 }}
          animate={{
            x: 0,
            opacity: isCinematic ? 0 : 1,
            pointerEvents: isCinematic ? 'none' : 'auto',
          }}
          transition={{ delay: isCinematic ? 0 : 0.3, duration: 0.65, ease: [0.24, 0.43, 0.15, 0.97] }}
        >
          <div className="cd-info-scroll" style={{ width: '100%' }}>

            {/* Category + Province */}
            <div className="cd-info-topline">
              <span className="cd-info-badge">
                <Icon size={12} />
                {selectedCulture.category}
              </span>
              {selectedProvince && (
                <span className="cd-info-province">{selectedProvince.name}</span>
              )}
            </div>

            {/* Title */}
            <motion.h1
              className="cd-info-title"
              initial={{ y: '50%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}
            >
              <span>{selectedCulture.title}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {isSpeaking && !isPaused && (
                  <div className="audio-wave-mini">
                    <span className="wave-bar" />
                    <span className="wave-bar" />
                    <span className="wave-bar" />
                    <span className="wave-bar" />
                  </div>
                )}
                <button
                  className="cd-audio-play-minimal"
                  onClick={!isSpeaking ? startNarration : togglePause}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid var(--c-accent)',
                    background: isSpeaking && !isPaused ? 'var(--c-accent)' : 'transparent',
                    color: isSpeaking && !isPaused ? '#fff' : 'var(--c-accent)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    transition: 'all 0.25s ease',
                    flexShrink: 0,
                  }}
                  title={!isSpeaking ? 'Dengarkan Narasi' : isPaused ? 'Lanjutkan' : 'Jeda'}
                >
                  {!isSpeaking || isPaused ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'translateX(1px)' }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  )}
                </button>
              </div>
            </motion.h1>

            {/* Meta row */}
            <div className="cd-info-meta">
              <div className="cd-meta-item">
                <span className="cd-meta-label">LOKASI</span>
                <span className="cd-meta-value">{selectedCulture.location}</span>
              </div>
              <div className="cd-meta-item">
                <span className="cd-meta-label">ERA</span>
                <span className="cd-meta-value">{selectedCulture.period}</span>
              </div>
            </div>

            <div className="cd-info-divider" />

            {/* Description */}
            <p className="cd-info-desc">{selectedCulture.description}</p>

            {/* Tags */}
            {selectedCulture.tags?.length > 0 && (
              <div className="cd-tags">
                {selectedCulture.tags.map(tag => (
                  <span key={tag} className="cd-tag">{tag}</span>
                ))}
              </div>
            )}

            {/* Quiz CTA Card */}
            {selectedProvince && ttsFinished && (
              <div className="cd-quiz-cta">
                <div className="cd-quiz-cta-content">
                  <h4>Siap Menguji Pengetahuanmu?</h4>
                  <p>Ayo uji pemahamanmu tentang kebudayaan {selectedProvince.name} lewat kuis interaktif!</p>
                </div>
                <button
                  className="cd-quiz-cta-btn"
                  onClick={() => {
                    tts.stop();
                    startQuiz(selectedProvince);
                  }}
                >
                  Mulai Kuis {selectedProvince.name} →
                </button>
              </div>
            )}

          </div>
        </motion.div>
      </motion.div>

      {/* Storytelling End overlay */}
      <AnimatePresence>
        {ttsFinished && (
          <StorytellingEndSheet
            cultureName={selectedCulture.title}
            provinceName={selectedProvince?.name || ''}
            onReplay={startNarration}
            onExplore={() => { tts.stop(); goTo('province'); }}
            onStartQuiz={() => { tts.stop(); startQuiz(selectedProvince); }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Helper — not critical, just a display index
const rawIndex = (culture) => {
  return culture?.id ? parseInt(culture.id.replace(/\D/g, '').slice(-2), 10) || 1 : 1;
};

const StorytellingEndSheet = ({ cultureName, provinceName, onReplay, onExplore, onStartQuiz }) => (
  <motion.div
    className="storytelling-end-backdrop"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="storytelling-end-sheet"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
    >
      <span className="end-sheet-badge">Narasi Selesai</span>
      <h3 className="end-sheet-title">"{cultureName}"</h3>
      <div className="end-sheet-divider" />
      <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0 16px 0' }}>
        <Mascot pose="excited" size={100} />
      </div>
      <p className="end-sheet-sub" style={{ fontWeight: 600, color: 'var(--c-accent-dark)', marginBottom: '16px' }}>
        Hebat! Kamu telah menyimak penjelasan budaya ini. Ingin lanjut menguji pengetahuanmu?
      </p>
      <div className="end-sheet-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
        {onStartQuiz && (
          <motion.button
            className="end-btn start-quiz"
            onClick={onStartQuiz}
            style={{
              width: '100%',
              padding: '12px',
              background: 'var(--c-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              boxShadow: '0 4px 12px rgba(27, 79, 156, 0.2)',
              transition: 'none',
            }}
            whileHover={{
              scale: 1.02,
              background: '#0D1B2A',
              boxShadow: '0 6px 16px rgba(13, 27, 42, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            Mulai Kuis {provinceName} →
          </motion.button>
        )}
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <motion.button
            className="end-btn replay"
            onClick={onReplay}
            style={{ flex: 1, transition: 'none' }}
            whileHover={{
              scale: 1.02,
              background: 'rgba(27, 79, 156, 0.06)',
              borderColor: 'var(--c-primary)',
              color: 'var(--c-primary)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            Ulangi Cerita
          </motion.button>
          <motion.button
            className="end-btn explore"
            onClick={onExplore}
            style={{ flex: 1, transition: 'none' }}
            whileHover={{
              scale: 1.02,
              background: '#0D1B2A',
              borderColor: '#0D1B2A',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            Kembali ke Peta
          </motion.button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);
