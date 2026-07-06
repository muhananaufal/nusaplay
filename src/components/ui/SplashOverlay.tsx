'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlay } from '@/contexts/Play';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';
import { WayangLoader } from './WayangLoader';
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

// ── Morphing Speaker Icon ─────────────────────────────────────────────────────
// pathLength 0→1 draw/erase: sound waves dissolve while mute-X draws itself.
const SpeakerIcon = ({ isMuted }: { isMuted: boolean }) => {
  const wave = { duration: 0.28, ease: 'easeInOut' as const };
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
      <path
        d="M11 5L6 9H2v6h4l5 4V5z"
        fill={isMuted ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.82)'}
        style={{ transition: 'fill 0.28s ease' }}
      />
      <motion.path
        d="M15.54 8.46a5 5 0 0 1 0 7.07"
        stroke="rgba(255,255,255,0.82)" strokeWidth="1.5" strokeLinecap="round" fill="none"
        initial={false}
        animate={{ pathLength: isMuted ? 0 : 1, opacity: isMuted ? 0 : 1 }}
        transition={wave}
      />
      <motion.path
        d="M19.07 4.93a10 10 0 0 1 0 14.14"
        stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" fill="none"
        initial={false}
        animate={{ pathLength: isMuted ? 0 : 1, opacity: isMuted ? 0 : 1 }}
        transition={{ ...wave, delay: isMuted ? 0 : 0.06 }}
      />
      <motion.path
        d="M17 9 L23 15"
        stroke="rgba(255,255,255,0.6)" strokeWidth="1.75" strokeLinecap="round" fill="none"
        initial={false}
        animate={{ pathLength: isMuted ? 1 : 0, opacity: isMuted ? 1 : 0 }}
        transition={{ ...wave, delay: isMuted ? 0.06 : 0 }}
      />
      <motion.path
        d="M23 9 L17 15"
        stroke="rgba(255,255,255,0.6)" strokeWidth="1.75" strokeLinecap="round" fill="none"
        initial={false}
        animate={{ pathLength: isMuted ? 1 : 0, opacity: isMuted ? 1 : 0 }}
        transition={wave}
      />
    </svg>
  );
};

// ── Video Background ───────────────────────────────────────────────────────────
// Renders the local splash-screen.mp4 video.
// Mobile browsers require a user gesture to play audio — we handle this with
// a stylish "tap to enter" gate that unlocks audio on first tap.
const VideoBackground = ({ audioUnlocked, isMuted }: { audioUnlocked: boolean; isMuted: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFading, setIsFading] = useState(false);
  const { play } = usePlay();
  const { phase } = useAppFlow();

  const playRef = useRef(play);
  const phaseRef = useRef(phase);

  useEffect(() => {
    playRef.current = play;
  }, [play]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start muted — required for autoplay on iOS/Android
    video.muted = true;
    video.volume = 0;

    // Try to autoplay immediately (works on all platforms when muted)
    video.play().catch(err => console.log("Play failed:", err));


    // Precise time tracking using requestAnimationFrame to prevent low-frequency update jumps
    let rafId: number;
    const checkTime = () => {
      // 1. If we are in the journey phase or others, ensure video is paused and volume is 0
      if (phaseRef.current !== PHASES.SPLASH) {
        video.pause();
        video.volume = 0;
        return;
      }

      // 2. If user clicked start (playRef.current is true), smoothly fade out volume
      if (playRef.current) {
        if (video.volume > 0.02) {
          video.volume = Math.max(0, video.volume - 0.02);
        } else {
          video.volume = 0;
          video.pause();
          return;
        }
      }

      const duration = video.duration;
      const currentTime = video.currentTime;

      if (duration) {
        // Start fading out 2.5s before the end. With a 1.8s transition,
        // it will be completely dark (opacity 0) 0.7s before the video loops.
        if (duration - currentTime < 2.5) {
          setIsFading(true);
        } else if (currentTime < 2.5) {
          // Fade back in at the beginning of the video loop
          setIsFading(false);
        }
      }
      rafId = requestAnimationFrame(checkTime);
    };

    const onLoadedMetadata = () => {
      rafId = requestAnimationFrame(checkTime);
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    if (video.readyState >= 1) {
      rafId = requestAnimationFrame(checkTime);
    }

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, []);

  // Unlock audio when prop changes
  const audioUnlockedRef = useRef(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || audioUnlockedRef.current || !audioUnlocked) return;
    audioUnlockedRef.current = true;
    video.muted = false;
    video.volume = 0;
    const fadeIn = setInterval(() => {
      if (!videoRef.current) { clearInterval(fadeIn); return; }
      if (videoRef.current.volume < 0.97) {
        videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.04);
      } else {
        videoRef.current.volume = 1;
        clearInterval(fadeIn);
      }
    }, 40);
    return () => clearInterval(fadeIn);
  }, [audioUnlocked]);

  // Sync mute toggle from parent
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !audioUnlocked) return;
    video.muted = isMuted;
  }, [isMuted, audioUnlocked]);

  return (
    <div className="splash-video-bg">
      <video
        ref={videoRef}
        src="/video/splash-screen.mp4"
        poster="/images/grain.webp"
        autoPlay
        loop
        muted
        playsInline
        className="splash-bg-image"
        style={{
          opacity: isFading ? 0 : 0.9,
          transition: 'opacity 1.8s ease-in-out',
        }}
      />
      <div className="splash-video-shield" />
    </div>
  );
};


// ── Ambient floating particles (pure CSS — zero JS animation overhead) ───────
// Each particle's position, size, colour, and timing are baked into CSS custom
// properties so the browser handles them on the compositor thread entirely.
const PARTICLES = Array.from({ length: 38 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 5,
  color: i % 3 === 0 ? 'rgba(200, 169, 110, 0.55)' : i % 3 === 1 ? 'rgba(156, 213, 243, 0.4)' : 'rgba(255, 255, 255, 0.25)',
  driftX: (Math.random() - 0.5) * 60,
  driftY: -(Math.random() * 80 + 30),
}));

// ── Haiku easter egg ──────────────────────────────────────────────────────────
const HAIKUS = [
  { lines: ['Ombak memecah', 'di pantai Nusantara', 'budaya bertahan'] },
  { lines: ['Wayang bergerak', 'bayangan menceritakan', 'jiwa Indonesia'] },
  { lines: ['Batik berkembang', 'corak panjang nusantara', 'tak lekang waktu'] },
];

const HaikuModal = ({ onClose }: { onClose: () => void }) => {
  const [haiku] = useState(() => {
    // eslint-disable-next-line react-hooks/purity
    return HAIKUS[Math.floor(Math.random() * HAIKUS.length)];
  });
  return (
    <motion.div
      className="haiku-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="haiku-card"
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="haiku-ornament">✦</div>
        <p className="haiku-label">HAIKU NUSANTARA</p>
        <div className="haiku-lines">
          {haiku.lines.map((line, i) => (
            <motion.p
              key={i}
              className="haiku-line"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.25 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
        <button className="haiku-close" onClick={onClose}>Tutup</button>
      </motion.div>
    </motion.div>
  );
};

// ── Character reveal animation (pure CSS stagger — no per-char Framer instances) ──
// We render each character as a <span> with a CSS custom property --i for delay.
// The @keyframes `charReveal` is defined in globals.css.
// This cuts Framer Motion JS overhead from O(n_chars) to 0 for this element.
const CharReveal = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => (
  <span className={className} aria-label={text} style={{ display: 'inline-flex' }}>
    {text.split('').map((char, i) => (
      <span
        key={i}
        className="char-reveal-span"
        style={{
          display: 'inline-block',
          whiteSpace: char === ' ' ? 'pre' : 'normal',
          // CSS custom properties baked at render time — the animation itself
          // runs fully on the GPU/compositor without JS involvement.
          '--char-delay': `${delay + i * 0.04}s`,
        } as React.CSSProperties}
      >
        {char}
      </span>
    ))}
  </span>
);

// ── Magnetic button ───────────────────────────────────────────────────────────
const MagneticButton = ({ children, onClick, className }: { children: React.ReactNode; onClick: () => void; className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const { tourActive } = usePlay();

  useEffect(() => {
    if (tourActive) {
      setPos({ x: 0, y: 0 });
    }
  }, [tourActive]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (tourActive) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = 80;
    if (dist < radius) {
      setPos({ x: dx * 0.35, y: dy * 0.35 });
    }
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    >
      {children}
    </motion.button>
  );
};

export const SplashOverlay = ({ progress = 100 }: { progress?: number }) => {
  const { play, setPlay, end, tourActive } = usePlay();
  const { goTo } = useAppFlow();
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showHaiku, setShowHaiku] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const startTimeoutRef = useRef<any>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleToggleMute = () => setIsMuted(m => !m);

  // Auto-unlock audio on first user interaction (tap/click anywhere)
  useEffect(() => {
    if (audioUnlocked) return;
    const unlock = () => setAudioUnlocked(true);
    window.addEventListener('pointerdown', unlock, { once: true, capture: true });
    return () => window.removeEventListener('pointerdown', unlock, { capture: true });
  }, [audioUnlocked]);

  // Reset GSAP tilt when tour becomes active
  useEffect(() => {
    if (tourActive && heroRef.current) {
      gsap.to(heroRef.current, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.4, ease: 'power2.out' });
    }
  }, [tourActive]);

  // ── GSAP 3D Tilt / Parallax Effect ──────────────────────────────────────────
  useEffect(() => {
    if (play || progress !== 100 || tourActive) return;

    const hero = heroRef.current;
    if (!hero) return;

    gsap.set(hero, { transformPerspective: 1000, transformStyle: 'preserve-3d' });

    const rotateXTo = gsap.quickTo(hero, 'rotateX', { duration: 0.5, ease: 'power2.out' });
    const rotateYTo = gsap.quickTo(hero, 'rotateY', { duration: 0.5, ease: 'power2.out' });
    const xTo = gsap.quickTo(hero, 'x', { duration: 0.5, ease: 'power2.out' });
    const yTo = gsap.quickTo(hero, 'y', { duration: 0.5, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xVal = (e.clientX / innerWidth) - 0.5;
      const yVal = (e.clientY / innerHeight) - 0.5;

      rotateXTo(-yVal * 16); // Up to 8 degrees tilt
      rotateYTo(xVal * 16);  // Up to 8 degrees tilt
      xTo(xVal * 24);        // Up to 12px horizontal parallax translation
      yTo(yVal * 24);        // Up to 12px vertical parallax translation
    };

    const handleMouseLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [play, progress, tourActive]);

  const handleStart = () => {
    setPlay(true);
    startTimeoutRef.current = setTimeout(() => {
      goTo(PHASES.JOURNEY);
    }, 2000);
  };

  // Clear timeout on unmount to prevent race conditions
  useEffect(() => {
    return () => {
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
      }
    };
  }, []);

  // Clear timeout if skip button is clicked
  useEffect(() => {
    if (end && startTimeoutRef.current) {
      clearTimeout(startTimeoutRef.current);
    }
  }, [end]);

  const handlePetaNusantara = () => goTo(PHASES.MAP);
  const handleKuisNusantara = () => goTo(PHASES.QUIZ);
  const handleTentang = () => {
    (document.querySelector('.floating-menu-btn') as HTMLElement)?.click();
  };

  // Easter egg: click logo 5 times
  const handleLogoClick = useCallback(() => {
    setLogoClickCount(c => {
      const next = c + 1;
      if (next >= 5) {
        setShowHaiku(true);
        return 0;
      }
      return next;
    });
  }, []);

  return (
    <div className={`splash-overlay ${play ? 'splash-overlay--dismiss' : ''}`}>
      {/* ── Grain noise overlay (pre-baked PNG — zero CPU cost vs. feTurbulence) ── */}
      <div className="splash-grain" aria-hidden="true" />

      {/* ── Background video facade ───────────────────────────────────────────
          Show a static dark gradient during load. Only mount the YouTube
          iframe (which triggers 10+ network requests + video streaming) after:
          • model is fully loaded (progress === 100), AND
          • user has made their first pointer interaction OR 3s have passed idle.
          This keeps page load network budget focused on the 3D model. */}
      {progress === 100 && (
        <VideoBackground audioUnlocked={audioUnlocked} isMuted={isMuted} />
      )}


      <div className="editorial-grid">
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
      </div>

      {/* ── Ambient particles — pure CSS animation, zero JS overhead ── */}
      {progress === 100 && (
        <div className="splash-particles" aria-hidden="true">
          {PARTICLES.map(p => (
            <span
              key={p.id}
              className="splash-particle splash-particle--css"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: p.color,
                '--drift-x': `${p.driftX}px`,
                '--drift-y': `${p.driftY}px`,
                '--p-duration': `${p.duration}s`,
                '--p-delay': `${p.delay}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* Wayang Loader — shown while loading */}
      <WayangLoader progress={progress} />

      {progress === 100 && (
        <motion.div
          className={`splash-intro ${play ? 'splash-intro--dismiss' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="splash-header">
            <span
              className="splash-logo-text"
              onClick={handleLogoClick}
              style={{ cursor: 'default', userSelect: 'none' }}
              title={logoClickCount > 0 ? `${5 - logoClickCount} klik lagi...` : undefined}
            >
              <CharReveal text="NusaPlay" delay={0.1} />
            </span>
            <div className="splash-header-right">
              <div className="splash-nav-links">
                <button className="splash-nav-link" onClick={handlePetaNusantara}>Peta Nusantara</button>
                <button className="splash-nav-link" onClick={handleKuisNusantara}>Kuis Nusantara</button>
                <button className="splash-nav-link" onClick={handleTentang}>Tentang</button>
              </div>
            </div>
          </div>

          {/* Middle: Big Hero Text */}
          <div className="splash-hero-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="splash-hero-content"
            >
              {/* Inner wrapper for 3D Tilt & Parallax using GSAP */}
              <div 
                ref={heroRef} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* <span className="splash-hero-overline">EKSPLORASI INTERAKTIF</span> */}
                <h1 className="splash-hero-title">
                  MENERBANGI <br />
                  <em>Keindahan</em> NUSANTARA
                </h1>
                <div className="splash-hero-line" />
                
                {/* Start Button — below gold line on all screen sizes */}
                <MagneticButton className="splash-mobile-start-btn" onClick={handleStart}>
                  Mulai Perjalanan
                  <span className="btn-arrow">→</span>
                </MagneticButton>
              </div>
            </motion.div>
          </div>



          <div className="splash-bottom-bar">
            <motion.p
              className="splash-desc-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Platform eksplorasi interaktif melestarikan kekayaan budaya Nusantara
            </motion.p>
          </div>
        </motion.div>
      )}

      <div className={`splash-outro ${end ? 'splash-outro--appear' : ''}`}>
        <p className="splash-outro-text">Semoga perjalananmu menyenangkan.</p>
      </div>

      {/* Haiku Easter Egg Modal */}
      <AnimatePresence>
        {showHaiku && <HaikuModal onClose={() => setShowHaiku(false)} />}
      </AnimatePresence>
      {/* Mute button — fixed position next to hamburger menu */}
      <AnimatePresence>
        {audioUnlocked && progress === 100 && !play && (
          <motion.button
            className="splash-mute-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            onClick={handleToggleMute}
            aria-label={isMuted ? 'Aktifkan suara' : 'Matikan suara'}
            title={isMuted ? 'Aktifkan suara' : 'Matikan suara'}
          >
            <SpeakerIcon isMuted={isMuted} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
