'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';
import { useProgress } from '@/contexts/Progress';
import { getCategoryIcon } from './PremiumIcons';
import { useSmoothScroll } from './SmoothScroll';
import { Mascot } from './Mascot';
import { usePassport } from '@/contexts/Passport';
import { useIsMobile } from '@/utils/useIsMobile';
import { fetchCulturesByProvince } from '@/utils/fetchCultures';

// ── Splits narrator text into sentence-sized caption chunks ──────────────────
function splitIntoCaptions(text: string): string[] {
  if (!text) return [];
  const raw = text.match(/[^.!?]+[.!?]*/g) || [text];
  const chunks: string[] = [];
  for (const sentence of raw) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;
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

// Helper to get a safe fallback map image for the province
const getProvinceFallbackImage = (provinceId: string) => {
  const map: Record<string, string> = {
    'diy': '/images/diy.webp',
    'kalimantan-barat': '/images/kalimantan-barat.webp',
    'papua': '/images/papua.webp',
    'jawa-tengah': '/images/diy.webp',
  };
  return map[provinceId] || '/images/grain.webp';
};

interface VTTCue {
  start: number;
  end: number;
  text: string;
}

function parseVTT(vttText: string): VTTCue[] {
  const cues: VTTCue[] = [];
  const lines = vttText.split(/\r?\n/);
  
  let i = 0;
  // Skip to first cue containing -->
  while (i < lines.length && !lines[i].includes('-->')) {
    i++;
  }
  
  function parseTimestamp(timeStr: string): number {
    const parts = timeStr.trim().split(':');
    let hrs = 0, mins = 0, secs = 0, ms = 0;
    
    if (parts.length === 3) {
      hrs = parseInt(parts[0], 10);
      mins = parseInt(parts[1], 10);
      const secParts = parts[2].split('.');
      secs = parseInt(secParts[0], 10);
      ms = parseInt(secParts[1] || '0', 10);
    } else if (parts.length === 2) {
      mins = parseInt(parts[0], 10);
      const secParts = parts[1].split('.');
      secs = parseInt(secParts[0], 10);
      ms = parseInt(secParts[1] || '0', 10);
    }
    
    return hrs * 3600 + mins * 60 + secs + ms / 1000;
  }
  
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line.includes('-->')) {
      const times = line.split('-->');
      const start = parseTimestamp(times[0]);
      const end = parseTimestamp(times[1]);
      
      let text = '';
      i++;
      while (i < lines.length && lines[i].trim() !== '' && !lines[i].includes('-->')) {
        text += (text ? ' ' : '') + lines[i].trim();
        i++;
      }
      
      cues.push({ start, end, text });
    } else {
      i++;
    }
  }
  
  return cues;
}

export const CultureDetail = ({ visible }) => {
  const { selectedCulture, selectedProvince, goTo, startQuiz, selectCulture } = useAppFlow();
  const { markCultureListened } = useProgress();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [narrationFinished, setNarrationFinished] = useState(false);
  const progressInterval = useRef(null);
  const startTime = useRef(null);
  const estimatedDuration = useRef(15000);
  const infoPanelRef = useRef(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMobile = useIsMobile(768);
  const pausedCaptionIndex = useRef(0);

  const [vttCues, setVttCues] = useState<VTTCue[] | null>(null);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);

  useSmoothScroll(infoPanelRef, visible);

  const { stampProvince } = usePassport();

  // Full-screen cinematic mode — desktop only
  const isCinematic = !isMobile && isSpeaking && !isPaused;
  // Mobile sticky highlight — mobile only
  const isMobileNarrating = isMobile && isSpeaking;

  // Pre-compute caption chunks and their progress thresholds based on character length
  const captionsData = useMemo(() => {
    const list = splitIntoCaptions(selectedCulture?.narrator || '');
    if (!list.length) return { captions: [], thresholds: [] };

    const lengths = list.map(c => c.length);
    const totalLength = lengths.reduce((sum, len) => sum + len, 0);

    let cumulative = 0;
    const thresholds = lengths.map(len => {
      cumulative += (len / totalLength) * 100;
      return cumulative;
    });

    return { captions: list, thresholds };
  }, [selectedCulture]);

  const captions = captionsData.captions;

  // Derive which caption to show from progress (0–100)
  const activeCaptionIndex = useMemo(() => {
    const { thresholds } = captionsData;
    if (!thresholds.length) return 0;
    
    // Find the first sentence threshold that is greater than or equal to the current progress
    const idx = thresholds.findIndex(th => progress <= th);
    if (idx === -1) return thresholds.length - 1;
    return idx;
  }, [progress, captionsData]);

  // Load and parse VTT subtitles if available
  useEffect(() => {
    setVttCues(null);
    setAudioCurrentTime(0);

    if (selectedCulture?.audio) {
      const vttUrl = selectedCulture.audio.replace('.mp3', '.vtt');
      fetch(vttUrl)
        .then((res) => {
          if (!res.ok) throw new Error('VTT not found');
          return res.text();
        })
        .then((text) => {
          setVttCues(parseVTT(text));
        })
        .catch(() => {
          setVttCues(null);
        });
    }
  }, [selectedCulture?.id]);

  const activeCueText = useMemo(() => {
    if (!vttCues) return '';
    const cue = vttCues.find(c => audioCurrentTime >= c.start && audioCurrentTime <= c.end);
    return cue ? cue.text : '';
  }, [vttCues, audioCurrentTime]);

  // Find next culture in the province (sorted with audio first)
  const [provincecultures, setProvinceCultures] = useState<any[]>([]);
  useEffect(() => {
    if (!selectedProvince?.id) { setProvinceCultures([]); return; }
    fetchCulturesByProvince(selectedProvince.id).then(setProvinceCultures);
  }, [selectedProvince?.id]);

  const nextCulture = useMemo(() => {
    if (!selectedProvince || !provincecultures.length) return null;
    const sortedList = [...provincecultures].sort((a, b) => {
      const hasAudioA = !!a.audio;
      const hasAudioB = !!b.audio;
      if (hasAudioA && !hasAudioB) return -1;
      if (!hasAudioA && hasAudioB) return 1;
      return 0;
    });
    const currentIndex = sortedList.findIndex(c => c.id === selectedCulture?.id);
    if (currentIndex !== -1 && currentIndex < sortedList.length - 1) {
      return sortedList[currentIndex + 1];
    }
    return null;
  }, [selectedProvince, provincecultures, selectedCulture?.id]);

  const stopAll = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    clearInterval(progressInterval.current);
  };

  useEffect(() => {
    if (narrationFinished && selectedProvince?.id) {
      stampProvince(selectedProvince.id);
    }
  }, [narrationFinished, selectedProvince?.id, stampProvince]);

  useEffect(() => {
    setIsSpeaking(false);
    setIsPaused(false);
    setProgress(0);
    setNarrationFinished(false);
    stopAll();
    window.dispatchEvent(new CustomEvent('nusaplay:narrationEnd'));
  }, [selectedCulture]);

  useEffect(() => {
    return () => {
      stopAll();
      window.dispatchEvent(new CustomEvent('nusaplay:narrationEnd'));
    };
  }, []);

  const startNarration = () => {
    if (!selectedCulture || !selectedCulture.audio) return;
    stopAll();
    setProgress(0);
    setNarrationFinished(false);
    pausedCaptionIndex.current = 0;

    // ── Audio file mode ──────────────────────────────────────────────────
    const audio = new Audio(selectedCulture.audio);
    audioRef.current = audio;

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
      setAudioCurrentTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
      setIsSpeaking(false);
      setProgress(100);
      setNarrationFinished(true);
      audioRef.current = null;
      window.dispatchEvent(new CustomEvent('nusaplay:narrationEnd'));
      if (selectedCulture?.id && selectedCulture?.provinceId) {
        markCultureListened(selectedCulture.id, selectedCulture.provinceId);
      }
    });

    audio.addEventListener('pause', () => setIsPaused(true));
    audio.addEventListener('play', () => {
      setIsSpeaking(true);
      setIsPaused(false);
    });

    audio.play().catch(err => console.error('Audio play failed:', err));
    setIsSpeaking(true);
    setIsPaused(false);
    window.dispatchEvent(new CustomEvent('nusaplay:narrationStart'));
  };

  const togglePause = () => {
    if (selectedCulture?.audio && audioRef.current) {
      if (isPaused) {
        audioRef.current.play().catch(err => console.error(err));
        setIsPaused(false);
        window.dispatchEvent(new CustomEvent('nusaplay:narrationStart'));
      } else {
        audioRef.current.pause();
        setIsPaused(true);
        window.dispatchEvent(new CustomEvent('nusaplay:narrationPause'));
      }
    }
  };

  const stopNarration = () => {
    stopAll();
    setIsSpeaking(false);
    setIsPaused(false);
    setProgress(0);
    window.dispatchEvent(new CustomEvent('nusaplay:narrationEnd'));
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
        {isMobileNarrating && !isPaused && (
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
          className={`cd-video-panel${(isMobileNarrating && !isPaused) ? ' is-sticky' : ''}`}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'relative' }}
        >
          <div 
            className="cd-video-wrapper" 
            style={{ 
              position: 'relative', 
              width: '100%', 
              height: (isMobileNarrating && !isPaused) ? 'auto' : '100%' 
            }}
          >
            {!selectedCulture.audio ? (
              // Locked details placeholder (No audio)
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                height: '100%', 
                background: '#1F2D3D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={selectedCulture.image || getProvinceFallbackImage(selectedCulture.provinceId)}
                  alt=""
                  onError={(e) => {
                    const fallback = getProvinceFallbackImage(selectedCulture.provinceId);
                    (e.target as HTMLImageElement).src = fallback;
                  }}
                  style={{ 
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%', 
                    objectFit: 'cover', 
                    filter: 'grayscale(0.3) blur(2px)', 
                    opacity: 0.15 
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(13, 27, 42, 0.4)',
                  zIndex: 2
                }}>
                  {/* Big Padlock SVG */}
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))', opacity: 0.8 }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
            ) : (
              // Normal video player (local video if available, otherwise clean dark image overlay)
              <>
                {selectedCulture.video ? (
                  <video
                    src={selectedCulture.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="cd-iframe"
                    style={isMobile ? { 
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                      transform: 'none',
                      top: 0,
                      left: 0
                    } : {
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '100%', 
                    background: '#0D1B2A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={selectedCulture.image || getProvinceFallbackImage(selectedCulture.provinceId)}
                      alt={selectedCulture.title}
                      style={{ 
                        position: 'absolute',
                        top: 0, left: 0, width: '100%', height: '100%', 
                        objectFit: 'cover', 
                        opacity: 0.35,
                        filter: 'grayscale(0.15)',
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(13, 27, 42, 0.9), rgba(13, 27, 42, 0.4))',
                      zIndex: 1
                    }} />
                    <span style={{ 
                      zIndex: 2, 
                      color: 'rgba(255, 255, 255, 0.25)', 
                      fontSize: '11px', 
                      letterSpacing: '0.25em',
                      fontWeight: 600
                    }}>
                      NUSAPLAY EXPLORATION
                    </span>
                  </div>
                )}
                {/* Video overlay — darker in cinematic mode for caption legibility */}
                <div className={`cd-video-overlay${isCinematic ? ' cinematic' : ''}`} />
              </>
            )}
          </div>

            {/* ── FLOATING CONTROLS (visible when speaking) ── */}
            <AnimatePresence>
              {isSpeaking && (
                <motion.div
                  className="cd-floating-controls"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button className="cd-float-btn pause" onClick={togglePause}>
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
                  <button className="cd-float-btn stop" onClick={stopNarration}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 6h12v12H6z" />
                    </svg>
                    Selesai
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── LIVE CAPTIONS (visible when speaking and not paused) ── */}
            <AnimatePresence mode="wait">
              {isSpeaking && !isPaused && (vttCues ? activeCueText : (captions.length > 0 && captions[activeCaptionIndex])) && (
                <motion.div
                  key={vttCues ? activeCueText : activeCaptionIndex}
                  className="cd-captions-container"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="cd-caption-text">
                    {vttCues ? activeCueText : captions[activeCaptionIndex]}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
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
                  disabled={!selectedCulture.audio}
                  onClick={!isSpeaking ? startNarration : togglePause}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: selectedCulture.audio ? '1px solid var(--c-accent)' : '1px solid var(--c-border-dark, #ccc)',
                    background: !selectedCulture.audio ? 'var(--c-bg-light, #f5f5f5)' : (isSpeaking && !isPaused ? 'var(--c-accent)' : 'transparent'),
                    color: !selectedCulture.audio ? '#999' : (isSpeaking && !isPaused ? '#fff' : 'var(--c-accent)'),
                    cursor: selectedCulture.audio ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    transition: 'all 0.25s ease',
                    flexShrink: 0,
                    opacity: selectedCulture.audio ? 1 : 0.6,
                  }}
                  title={selectedCulture.audio ? (!isSpeaking ? 'Dengarkan Narasi' : isPaused ? 'Lanjutkan' : 'Jeda') : 'Audio Belum Tersedia'}
                >
                  {!selectedCulture.audio ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  ) : (!isSpeaking || isPaused ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'translateX(1px)' }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ))}
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
            {selectedProvince && narrationFinished && (
              <div className="cd-quiz-cta">
                <div className="cd-quiz-cta-content">
                  <h4>Siap Menguji Pengetahuanmu?</h4>
                  <p>Ayo uji pemahamanmu tentang kebudayaan {selectedProvince.name} lewat kuis interaktif!</p>
                </div>
                <button
                  className="cd-quiz-cta-btn"
                  onClick={() => {
                    stopAll();
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
        {narrationFinished && (
          <StorytellingEndSheet
            cultureName={selectedCulture.title}
            provinceName={selectedProvince?.name || ''}
            onReplay={startNarration}
            onExplore={() => { stopAll(); goTo('province'); }}
            onStartQuiz={() => { stopAll(); startQuiz(selectedProvince); }}
            nextCulture={nextCulture}
            onNextCulture={() => {
              if (nextCulture) {
                stopAll();
                selectCulture(nextCulture);
              }
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const StorytellingEndSheet = ({ cultureName, provinceName, onReplay, onExplore, onStartQuiz, nextCulture, onNextCulture }) => (
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
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '90px', 
        margin: '16px 0', 
        position: 'relative' 
      }}>
        <div style={{ position: 'absolute', zIndex: 10 }}>
          <Mascot pose="excited" size={200} />
        </div>
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
            style={{ 
              flex: 1, 
              transition: 'none',
              background: '#0D1B2A',
              border: '1px solid #0D1B2A',
              color: '#ffffff'
            }}
            whileHover={{
              scale: 1.02,
              background: '#0D1B2A',
              borderColor: '#0D1B2A',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            Kembali ke Provinsi
          </motion.button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);
