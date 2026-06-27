'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';

const SHORTCUTS = [
  { key: 'H', label: 'Beranda' },
  { key: 'M', label: 'Peta' },
  { key: 'Q', label: 'Kuis' },
  { key: 'ESC', label: 'Kembali' },
];

export const KeyboardNav = () => {
  const { phase, goTo, backToMap } = useAppFlow();
  const [showHint, setShowHint] = useState(false);

  // Show keyboard hint briefly on map page
  useEffect(() => {
    if (phase === PHASES.MAP) {
      const t = setTimeout(() => setShowHint(true), 1500);
      const t2 = setTimeout(() => setShowHint(false), 6000);
      return () => { clearTimeout(t); clearTimeout(t2); };
    }
  }, [phase]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't hijack when typing in inputs
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      switch (e.key) {
        case 'Escape':
          if (phase === PHASES.LIST) goTo(PHASES.PROVINCE);
          else if (phase === PHASES.DETAIL) goTo(PHASES.LIST);
          else if (phase === PHASES.PROVINCE) backToMap();
          else if (phase === PHASES.QUIZ) backToMap();
          break;
        case 'h':
        case 'H':
          if (phase !== PHASES.SPLASH && phase !== PHASES.JOURNEY) {
            goTo(PHASES.SPLASH);
          }
          break;
        case 'm':
        case 'M':
          if (phase !== PHASES.MAP) {
            backToMap();
          }
          break;
        case 'q':
        case 'Q':
          if (phase !== PHASES.QUIZ) {
            goTo(PHASES.QUIZ);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [phase, goTo, backToMap]);

  // Don't show hint on splash/journey
  if (phase === PHASES.SPLASH || phase === PHASES.JOURNEY) return null;

  return (
    <AnimatePresence>
      {showHint && (
        <motion.div
          className="keyboard-hint"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
        >
          <span className="keyboard-hint-label">PINTASAN KEYBOARD</span>
          <div className="keyboard-hint-keys">
            {SHORTCUTS.map(s => (
              <span key={s.key} className="keyboard-hint-key">
                <kbd>{s.key}</kbd>
                <span>{s.label}</span>
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
