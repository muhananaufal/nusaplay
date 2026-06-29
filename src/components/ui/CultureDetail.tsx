'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';
import { getCategoryIcon } from './PremiumIcons';
import { useSmoothScroll } from './SmoothScroll';
import tts from '@/utils/tts';
import { Mascot } from './Mascot';
import { usePassport } from '@/contexts/Passport';

export const CultureDetail = ({ visible }) => {
  const { selectedCulture, selectedProvince, goTo, startQuiz } = useAppFlow();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ttsFinished, setTtsFinished] = useState(false);
  const progressInterval = useRef(null);
  const startTime = useRef(null);
  const estimatedDuration = useRef(15000);
  const infoPanelRef = useRef(null);

  useSmoothScroll(infoPanelRef, visible);

  const { stampProvince } = usePassport();

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
      tts.resume();
      setIsPaused(false);
    } else {
      tts.pause();
      setIsPaused(true);
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
      <div className="cd-layout">

        {/* â”€â”€ LEFT: VIDEO PANEL â”€â”€ */}
        <motion.div
          className="cd-video-panel"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
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
            <div className="cd-video-overlay" />
          </div>


        </motion.div>

        {/* â”€â”€ RIGHT: INFO PANEL â”€â”€ */}
        <motion.div
          ref={infoPanelRef}
          className="cd-info-panel"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.65, ease: [0.24, 0.43, 0.15, 0.97] }}
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
                  title={!isSpeaking ? "Dengarkan Narasi" : isPaused ? "Lanjutkan" : "Jeda"}
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
      </div>

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

// Helper â€” not critical, just a display index
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
          <button 
            className="end-btn start-quiz" 
            onClick={onStartQuiz}
            style={{
              width: '100%',
              padding: '12px',
              background: 'var(--c-accent)',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              boxShadow: '0 4px 12px rgba(85, 145, 185, 0.25)',
              transition: 'transform 0.2s, filter 0.2s',
            }}
          >
            Mulai Kuis {provinceName} →
          </button>
        )}
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <button className="end-btn replay" onClick={onReplay} style={{ flex: 1 }}>Ulangi Cerita</button>
          <button className="end-btn explore" onClick={onExplore} style={{ flex: 1 }}>Kembali ke Peta</button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

