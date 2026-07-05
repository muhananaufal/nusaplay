'use client';
import { useState, useEffect } from 'react';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';
import { usePlay } from '@/contexts/Play';
import { getStepFromPhase } from '@/utils/journey';
import { Mascot } from './Mascot';
import { useIsMobile } from '@/utils/useIsMobile';
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
    selector: '.province-center-badge.unlocked, .map-zoom-controls',
    title: 'Eksplorasi Peta',
    text: 'Langkah 2/4: Eksplorasi Peta! Klik salah satu provinsi aktif yang berwarna biru (seperti Jawa Tengah, Yogyakarta, atau Papua) untuk mendarat.',
    placement: 'above',
  },
  [PHASES.PROVINCE]: {
    selector: '.pd-hero-btn',
    title: 'Mulai Jelajah',
    text: 'Klik tombol ini untuk melihat dan mempelajari seluruh daftar kebudayaan khas dari provinsi ini!',
    placement: 'above',
  },
  [PHASES.LIST]: {
    selector: '.cl-list',
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
  const { journeyStep, journeyCompleted, setTourActive, setTourSelector } = usePlay();
  const isMobile = useIsMobile(768);
  const [rects, setRects] = useState<DOMRect[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const [isTourDisabled, setIsTourDisabled] = useState(false);
  const [dismissedSteps, setDismissedSteps] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [hasFinishedAudio, setHasFinishedAudio] = useState(false);
  const [activeSelector, setActiveSelector] = useState('.cd-audio-play-minimal');
  const [mapSubStep, setMapSubStep] = useState(1);
  const [listSubStep, setListSubStep] = useState(1);
  const [provinceSubStep, setProvinceSubStep] = useState(1);

  // Reset sub-steps on phase change
  useEffect(() => {
    setMapSubStep(1);
    setListSubStep(1);
    setProvinceSubStep(1);
  }, [phase]);

  // Sync state on client-side mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
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
    : (phase === PHASES.MAP
      ? (
          ((!isMobile && mapSubStep === 2) || (isMobile && mapSubStep === 3))
          ? {
              selector: '.map-achievement-btn',
              title: 'Pencapaian Nusantara',
              text: 'Ini adalah tombol Pencapaianmu! Klik tombol piala ini untuk melihat lencana dan progres pencapaian yang telah berhasil kamu selesaikan selama menjelajah.',
              placement: 'above' as const,
            }
          : (isMobile && mapSubStep === 2)
          ? {
              selector: '.map-zoom-controls',
              title: 'Perbesar Peta',
              text: 'Kamu juga bisa menggunakan tombol perbesaran (+/-) ini untuk memperbesar atau memperkecil tampilan peta di layar ponselmu.',
              placement: 'below' as const,
            }
          : {
              selector: '.province-center-badge.unlocked',
              title: 'Eksplorasi Peta',
              text: 'Langkah 2/4: Eksplorasi Peta! Klik salah satu provinsi aktif yang berwarna biru (seperti Jawa Tengah, Yogyakarta, atau Papua) untuk mendarat.',
              placement: 'above' as const,
            }
        )

      : (phase === PHASES.LIST
        ? (listSubStep === 3
          ? {
              selector: '.cl-search-wrapper',
              title: 'Cari Budaya',
              text: 'Kamu juga bisa mencari warisan budaya secara spesifik dengan mengetikkan namanya di kolom pencarian ini.',
              placement: 'below' as const,
            }
          : (listSubStep === 2
            ? {
                selector: '.cl-category-pills',
                title: 'Filter Kategori',
                text: 'Kamu bisa menggeser (scroll) bagian kategori ini untuk memfilter kebudayaan sesuai bidangnya.',
                placement: 'below' as const,
              }
            : {
                selector: '.cl-list',
                title: 'Pelajari Budaya',
                text: 'Klik salah satu baris kebudayaan ini untuk membaca narasi sejarah dan memutar videonya.',
                placement: 'below' as const,
               }))
         : (phase === PHASES.PROVINCE
            ? {
                selector: '.pd-hero-btn',
                title: 'Mulai Jelajah',
                text: 'Klik tombol ini untuk melihat dan mempelajari seluruh daftar kebudayaan khas dari provinsi ini!',
                placement: 'above' as const,
              }
           : (baseConfig ? { ...baseConfig, selector: activeSelector || baseConfig.selector } : null))));

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
        if ((isMobile && mapSubStep === 3) || (!isMobile && mapSubStep === 2)) {
          setActiveSelector('.map-achievement-btn');
        } else if (isMobile && mapSubStep === 2) {
          setActiveSelector('.map-zoom-controls');
        } else {
          const hasUnlockedProv = !!document.querySelector('.province-center-badge.unlocked');
          if (hasUnlockedProv) {
            setActiveSelector('.province-center-badge.unlocked');
          } else {
            setActiveSelector('.leaflet-container');
          }
        }
      } else if (phase === PHASES.LIST) {
        if (listSubStep === 3) {
          setActiveSelector('.cl-search-wrapper');
        } else if (listSubStep === 2) {
          setActiveSelector('.cl-category-pills');
        } else {
          setActiveSelector('.cl-list');
        }
      } else if (phase === PHASES.PROVINCE) {
        setActiveSelector('.pd-hero-btn');
      } else {
        setActiveSelector(SPOTLIGHT_CONFIGS[phase]?.selector || '');
      }
    };

    checkActiveElements();
    const interval = setInterval(checkActiveElements, 250);
    return () => clearInterval(interval);
  }, [mounted, isTourDisabled, phase, mapSubStep, listSubStep, provinceSubStep, isMobile]);

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
    if (shouldShow && config?.selector) {
      setTourSelector(config.selector);
    } else {
      setTourSelector('');
    }
    return () => {
      setTourActive(false);
      setTourSelector('');
    };
  }, [shouldShow, config?.selector, setTourActive, setTourSelector]);

  if (!shouldShow) return null;

  // Menghitung posisi absolut tooltip guide card agar tidak off-screen (menggunakan target pertama sebagai patokan)
  const rect = rects[0];
  const mascotSize = isMobile ? 160 : 200;
  const cardWidth = 280;
  const cardHeight = 150;
  const containerWidth = isMobile ? cardWidth : cardWidth + mascotSize + 12;
  const containerHeight = isMobile ? cardHeight + mascotSize + 12 : Math.max(cardHeight, mascotSize);

  let cardLeft = rect.left + rect.width / 2 - containerWidth / 2;
  let cardTop = rect.bottom + 16; // default: below

  if (config.placement === 'above' || cardTop + containerHeight > windowSize.height) {
    cardTop = rect.top - containerHeight - 16;
  }
  if (config.placement === 'center') {
    cardTop = windowSize.height / 2 - containerHeight / 2;
    cardLeft = windowSize.width / 2 - containerWidth / 2;
  }

  // Clamping koordinat
  cardLeft = Math.max(16, Math.min(cardLeft, windowSize.width - containerWidth - 16));
  cardTop = Math.max(70, Math.min(cardTop, windowSize.height - containerHeight - 16));

  const handleDismiss = () => {
    if (phase === PHASES.MAP) {
      if (mapSubStep < (isMobile ? 3 : 2)) {
        setMapSubStep(prev => prev + 1);
        return;
      }
    }
    if (phase === PHASES.PROVINCE) {
      if (provinceSubStep < 1) {
        setProvinceSubStep(prev => prev + 1);
        return;
      }
    }
    if (phase === PHASES.LIST && listSubStep < 3) {
      setListSubStep(prev => prev + 1);
      return;
    }
    const key = getDismissedKey(phase, hasFinishedAudio);
    const updated = { ...dismissedSteps, [key]: true };
    setDismissedSteps(updated);
  };

  const handleDisableTour = () => {
    setIsTourDisabled(true);
  };

  return (
    <div className="journey-spotlight-root" style={{ position: 'fixed', inset: 0, zIndex: 10005, pointerEvents: 'none' }}>
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

      {/* Floating Tutorial Wrapper (Card + Mascot) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        style={{
          position: 'absolute',
          top: cardTop,
          left: cardLeft,
          width: containerWidth,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          pointerEvents: 'auto',
          zIndex: 9999,
        }}
      >
        <Mascot pose="excited" size={mascotSize} />

        <div 
          className="journey-spotlight-card"
          style={{
            width: cardWidth,
            margin: 0,
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
        </div>
      </motion.div>
    </div>
  );
}
