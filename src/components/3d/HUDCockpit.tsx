'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── RAF-based typewriter — writes directly to the DOM, zero React re-renders ──
const TypewriterSpan = ({ text, speed = 40, startDelay = 0 }: { text: string; speed?: number; startDelay?: number }) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const span = spanRef.current;
    if (!span) return;
    span.textContent = '';

    let charIndex = 0;
    let startTime: number | null = null;
    let rafId: number;
    let delayTimer: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const targetIndex = Math.min(Math.floor(elapsed / speed), text.length);

      if (targetIndex > charIndex) {
        charIndex = targetIndex;
        span.textContent = text.slice(0, charIndex);
      }

      if (charIndex < text.length) {
        rafId = requestAnimationFrame(tick);
      }
    };

    delayTimer = setTimeout(() => {
      rafId = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(rafId);
    };
  }, [text, speed, startDelay]);

  return <span ref={spanRef} />;
};

const coords = [
  { lat: '-6.200°S', lon: '106.816°E', alt: '9.250 FT', spd: '485 KN', region: 'JAKARTA' },
  { lat: '-7.795°S', lon: '110.369°E', alt: '8.900 FT', spd: '470 KN', region: 'YOGYAKARTA' },
  { lat: '-4.543°S', lon: '136.903°E', alt: '9.450 FT', spd: '490 KN', region: 'PAPUA' },
];

export const HUDCockpit = ({ play, end }: { play: boolean; end: boolean }) => {
  const [coordIdx, setCoordIdx] = useState(0);
  const coord = coords[coordIdx];

  // Cycle coordinates every 5 seconds
  useEffect(() => {
    if (!play || end) return;
    const interval = setInterval(() => {
      setCoordIdx(i => (i + 1) % coords.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [play, end]);

  // Blinking cursor — pure CSS animation instead of setInterval + setState
  if (!play || end) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="hud-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        {/* Top-left: GPS coordinates */}
        <motion.div
          className="hud-panel hud-top-left"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="hud-label">POSISI GPS</div>
          <div className="hud-value"><TypewriterSpan text={coord.lat} speed={35} startDelay={200} /><span className="hud-cursor" style={{ animation: 'hudBlink 1s step-end infinite' }}>_</span></div>
          <div className="hud-value"><TypewriterSpan text={coord.lon} speed={35} startDelay={400} /></div>
          <div className="hud-sublabel hud-region">{coord.region}</div>
        </motion.div>

        {/* Mid-left: Altitude & Speed */}
        <motion.div
          className="hud-panel hud-mid-left"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="hud-label">ALTITUDO</div>
          <div className="hud-value"><TypewriterSpan text={coord.alt} speed={30} startDelay={600} /></div>
          <div className="hud-label" style={{ marginTop: '8px' }}>KECEPATAN</div>
          <div className="hud-value"><TypewriterSpan text={coord.spd} speed={30} startDelay={800} /></div>
        </motion.div>



        {/* Crosshair center (subtle) */}
        <div className="hud-crosshair">
          <div className="hud-ch-h" />
          <div className="hud-ch-v" />
          <div className="hud-ch-ring" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
