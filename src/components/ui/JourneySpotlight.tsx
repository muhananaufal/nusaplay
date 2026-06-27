'use client';
import { useState, useEffect } from 'react';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';
import { usePlay } from '@/contexts/Play';
import { getStepFromPhase } from './JourneyProgress';
import { motion, AnimatePresence } from 'framer-motion';

// Konfigurasi panduan sorot untuk setiap fase
const SPOTLIGHT_CONFIGS: Record<string, { selector: string; title: string; text: string; placement: 'above' | 'below' | 'center' }> = {
  [PHASES.SPLASH]: {
    selector: '.splash-join-btn, .splash-mobile-start-btn',
    title: 'Mulai Petualangan',
    text: 'Langkah 1/4: Pembukaan! Klik tombol ini untuk memulai perjalanan udaramu melintasi kepulauan Nusantara.',
    placement: 'below',
  },
  [PHASES.MAP]: {
    selector: '.province-center-badge.unlocked',
    title: 'Eksplorasi Peta',
    text: 'Langkah 2/4: Eksplorasi Peta! Klik salah satu provinsi aktif yang berwarna biru (seperti Jawa Tengah, Yogyakarta, atau Papua) untuk mendarat.',
    placement: 'above',
  },
  [PHASES.PROVINCE]: {
    selector: '.pd-thumbnails-row, .pd-thumbnail-item',
    title: 'Pilih Kebudayaan',
    text: 'Pilih salah satu item kebudayaan khas provinsi ini untuk mempelajari detail kisahnya.',
    placement: 'above',
  },
  [PHASES.LIST]: {
    selector: '.cl-row',
    title: 'Pelajari Budaya',
    text: 'Klik salah satu baris kebudayaan ini untuk membaca narasi sejarah dan memutar videonya.',
    placement: 'below',
  },
  [PHASES.DETAIL]: {
    selector: '.cd-quiz-cta-btn',
    title: 'Mulai Kuis',
    text: 'Setelah membaca cerita budaya di atas, klik tombol ini untuk langsung menguji ingatanmu lewat kuis!',
    placement: 'above',
  },
  [PHASES.QUIZ]: {
    selector: '.quiz-option',
    title: 'Pilih Jawaban',
    text: 'Langkah 4/4: Pilih Jawaban! Pilih salah satu opsi jawaban yang menurutmu benar sebelum waktu pada lingkaran habis.',
    placement: 'below',
  },
};

export function JourneySpotlight() {
  const { phase } = useAppFlow();
  const { journeyStep, journeyCompleted, setTourActive } = usePlay();
  const [rects, setRects] = useState<DOMRect[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const [isTourDisabled, setIsTourDisabled] = useState(false);
  const [dismissedSteps, setDismissedSteps] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [hasFinishedAudio, setHasFinishedAudio] = useState(false);
  const [activeSelector, setActiveSelector] = useState('.cd-audio-play-minimal');

  // Ambil data status tour dari localStorage saat client-side hydration selesai
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const disabled = localStorage.getItem('nusaplay:tour_disabled') === 'true';
      setIsTourDisabled(disabled);
      
      const dismissed = JSON.parse(localStorage.getItem('nusaplay:tour_dismissed_steps') || '{}');
      setDismissedSteps(dismissed);
      
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  const getDismissedKey = (phaseStr: string, hasFinishedAudioFlag: boolean) => {
    if (phaseStr === PHASES.DETAIL) {
      return hasFinishedAudioFlag ? 'detail-quiz' : 'detail-audio';
    }
    return phaseStr;
  };

  const dismissedKey = getDismissedKey(phase, hasFinishedAudio);
  const isDismissed = dismissedSteps[dismissedKey];

  const baseConfig = SPOTLIGHT_CONFIGS[phase];
  const config = phase === PHASES.DETAIL
    ? {
        selector: activeSelector,
        title: hasFinishedAudio ? 'Mulai Kuis' : 'Dengarkan Narasi',
        text: hasFinishedAudio 
          ? 'Narasi selesai! Sekarang, klik tombol ini untuk menguji wawasanmu tentang kebudayaan ini lewat kuis!' 
          : 'Langkah 3/4: Dengarkan Narasi! Klik tombol putar suara ini untuk mendengarkan cerita legenda kebudayaan ini dari Nusa hingga selesai.',
        placement: hasFinishedAudio ? 'above' as const : 'below' as const,
      }
    : (baseConfig ? { ...baseConfig, selector: activeSelector || baseConfig.selector } : null);

  // Scan DOM persistently to detect when active target elements appear (regardless of dismissal)
  useEffect(() => {
    if (!mounted || isTourDisabled) return;

    const checkActiveElements = () => {
      if (typeof document === 'undefined') return;
      const hasModalBtn = !!document.querySelector('.start-quiz');
      const hasInlineBtn = !!document.querySelector('.cd-quiz-cta-btn');
      
      setHasFinishedAudio(hasModalBtn || hasInlineBtn);

      if (phase === PHASES.DETAIL) {
        if (hasModalBtn) {
          setActiveSelector('.start-quiz');
        } else if (hasInlineBtn) {
          setActiveSelector('.cd-quiz-cta-btn');
        } else {
          setActiveSelector('.cd-audio-play-minimal');
        }
      } else if (phase === PHASES.MAP) {
        const hasUnlockedProv = !!document.querySelector('.province-center-badge.unlocked');
        if (hasUnlockedProv) {
          setActiveSelector('.province-center-badge.unlocked');
        } else {
          setActiveSelector('.leaflet-container');
        }
      } else {
        setActiveSelector(SPOTLIGHT_CONFIGS[phase]?.selector || '');
      }
    };

    checkActiveElements();
    const interval = setInterval(checkActiveElements, 250);
    return () => clearInterval(interval);
  }, [mounted, isTourDisabled, phase]);

  // Efek untuk melacak ukuran bounding rect elemen target secara responsif
  useEffect(() => {
    if (!mounted || isTourDisabled || isDismissed || !config) {
      setRects(prev => prev.length === 0 ? prev : []);
      return;
    }

    const updateRects = () => {
      const elements = document.querySelectorAll(config.selector);
      if (elements.length > 0) {
        const newRects: DOMRect[] = [];
        elements.forEach(element => {
          newRects.push(element.getBoundingClientRect());
        });
        
        // Update state only if values actually changed
        setRects(prev => {
          if (prev.length === newRects.length && 
              prev.every((r, idx) => 
                r.left === newRects[idx].left && 
                r.top === newRects[idx].top && 
                r.width === newRects[idx].width && 
                r.height === newRects[idx].height
              )) {
            return prev;
          }
          return newRects;
        });
      } else {
        setRects(prev => prev.length === 0 ? prev : []);
      }
    };

    updateRects();
    
    // Loop interval singkat untuk menangkap elemen yang dirender setelah delay/transisi
    const interval = setInterval(updateRects, 200);
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      updateRects();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updateRects, { capture: true, passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateRects, { capture: true });
    };
  }, [phase, activeSelector, hasFinishedAudio, isTourDisabled, isDismissed, mounted]);

  const currentPhaseStep = getStepFromPhase(phase);
  const shouldShow = !!(mounted && !isTourDisabled && !journeyCompleted && !isDismissed && config && rects.length > 0 && currentPhaseStep >= journeyStep);

  useEffect(() => {
    setTourActive(shouldShow);
    return () => setTourActive(false);
  }, [shouldShow, setTourActive]);

  if (!shouldShow) return null;

  // Menghitung posisi absolut tooltip guide card agar tidak off-screen (menggunakan target pertama sebagai patokan)
  const rect = rects[0];
  const cardWidth = 280;
  const cardHeight = 150;
  let cardLeft = rect.left + rect.width / 2 - cardWidth / 2;
  let cardTop = rect.bottom + 16; // default: below

  if (config.placement === 'above' || cardTop + cardHeight > windowSize.height) {
    cardTop = rect.top - cardHeight - 16;
  }
  if (config.placement === 'center') {
    cardTop = windowSize.height / 2 - cardHeight / 2;
    cardLeft = windowSize.width / 2 - cardWidth / 2;
  }

  // Clamping koordinat
  cardLeft = Math.max(16, Math.min(cardLeft, windowSize.width - cardWidth - 16));
  cardTop = Math.max(70, Math.min(cardTop, windowSize.height - cardHeight - 16));

  const handleDismiss = () => {
    const key = getDismissedKey(phase, hasFinishedAudio);
    const updated = { ...dismissedSteps, [key]: true };
    setDismissedSteps(updated);
    localStorage.setItem('nusaplay:tour_dismissed_steps', JSON.stringify(updated));
  };

  const handleDisableTour = () => {
    setIsTourDisabled(true);
    localStorage.setItem('nusaplay:tour_disabled', 'true');
  };

  return (
    <div className="journey-spotlight-root" style={{ position: 'fixed', inset: 0, zIndex: 998, pointerEvents: 'none' }}>
      {/* SVG Overlay Masking (Cut-out) */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <mask id="spotlight-mask-cutout">
            {/* Overlay gelap penuh */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* Lubang transparan pada setiap elemen target */}
            {rects.map((r, idx) => (
              <rect 
                key={idx}
                x={r.left - 6} 
                y={r.top - 6} 
                width={r.width + 12} 
                height={r.height + 12} 
                rx="12" 
                ry="12" 
                fill="black" 
              />
            ))}
          </mask>
        </defs>
        {/* Render overlay semi transparan */}
        <rect 
          x="0" 
          y="0" 
          width="100%" 
          height="100%" 
          fill="rgba(11, 10, 10, 0.85)" 
          mask="url(#spotlight-mask-cutout)" 
          style={{ pointerEvents: 'auto' }} // Biarkan background gelap menghalangi klik luar sorotan
        />
      </svg>

      {/* Pulsing Highlight Borders di sekeliling semua target */}
      {rects.map((r, idx) => (
        <div 
          key={idx}
          className="journey-spotlight-border"
          style={{
            position: 'absolute',
            left: r.left - 6,
            top: r.top - 6,
            width: r.width + 12,
            height: r.height + 12,
            borderRadius: '12px',
            border: '2.5px solid #ffad30',
            boxShadow: '0 0 15px rgba(255, 173, 48, 0.6)',
            animation: 'spotlightPulse 1.8s infinite',
          }}
        />
      ))}

      {/* Floating Tutorial Card */}
      <motion.div 
        className="journey-spotlight-card"
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        style={{
          position: 'absolute',
          top: cardTop,
          left: cardLeft,
          width: cardWidth,
          pointerEvents: 'auto',
          zIndex: 9999,
        }}
      >
        <div className="spotlight-card-header">
          {/* Miniature Nusa Avatar */}
          <div className="spotlight-avatar">Nusa</div>
          <span className="spotlight-card-title">{config.title}</span>
        </div>
        <p className="spotlight-card-text">{config.text}</p>
        <div className="spotlight-card-actions">
          <button className="spotlight-btn-skip" onClick={handleDisableTour}>
            Lewati Panduan
          </button>
          <button className="spotlight-btn-ok" onClick={handleDismiss}>
            Paham!
          </button>
        </div>
      </motion.div>
    </div>
  );
}
