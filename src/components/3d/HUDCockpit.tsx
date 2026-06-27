'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const useTypewriter = (text: string, speed = 40, startDelay = 0) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    const t = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, startDelay]);
  return displayed;
};

const coords = [
  { lat: '-6.200°S', lon: '106.816°E', alt: '9.250 FT', spd: '485 KN', region: 'JAKARTA' },
  { lat: '-7.795°S', lon: '110.369°E', alt: '8.900 FT', spd: '470 KN', region: 'YOGYAKARTA' },
  { lat: '-4.543°S', lon: '136.903°E', alt: '9.450 FT', spd: '490 KN', region: 'PAPUA' },
];

export const HUDCockpit = ({ play, end }: { play: boolean; end: boolean }) => {
  const [coordIdx, setCoordIdx] = useState(0);
  const [tick, setTick] = useState(true);
  const coord = coords[coordIdx];

  const latText = useTypewriter(coord.lat, 35, 200);
  const lonText = useTypewriter(coord.lon, 35, 400);
  const altText = useTypewriter(coord.alt, 30, 600);
  const spdText = useTypewriter(coord.spd, 30, 800);

  // Cycle coordinates every 5 seconds
  useEffect(() => {
    if (!play || end) return;
    const interval = setInterval(() => {
      setCoordIdx(i => (i + 1) % coords.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [play, end]);

  // Blinking colon tick
  useEffect(() => {
    if (!play || end) return;
    const interval = setInterval(() => setTick(t => !t), 500);
    return () => clearInterval(interval);
  }, [play, end]);

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
          <div className="hud-value">{latText}<span className="hud-cursor">_</span></div>
          <div className="hud-value">{lonText}</div>
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
          <div className="hud-value">{altText}</div>
          <div className="hud-label" style={{ marginTop: '8px' }}>KECEPATAN</div>
          <div className="hud-value">{spdText}</div>
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
