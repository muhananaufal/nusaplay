'use client';
import { usePassport } from '@/contexts/Passport';
import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProvinceById } from '@/data/provinces';

// ── Static constants — allocated once at module load, never recreated ────────
const STAMP_MAP: Record<string, string> = {
  'jawa-tengah': '✿',
  'diy': '✦',
  'kalimantan-barat': '❈',
  'papua': '✹',
};

// Pre-computed particle positions — zero runtime Math.random() cost
const PARTICLES = Array.from({ length: 14 }, (_, i) => {
  const angle    = (i / 14) * Math.PI * 2 + (i % 3) * 0.25;
  const distance = 80 + (i % 5) * 36;
  return {
    x:     Math.cos(angle) * distance,
    y:     Math.sin(angle) * distance,
    size:  4 + (i % 3) * 3,
    delay: 0.38 + (i % 7) * 0.04,
  };
});

// Framer Motion variants for the two elements that genuinely need JS animation:
//  1. Overlay — needs exit tracking (AnimatePresence)
//  2. Seal    — needs spring physics
// All other elements animate via pure CSS (see globals.css stampFadeUp / stampScaleX)
const overlayVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:   { opacity: 0, transition: { duration: 0.4, ease: 'easeIn'  } },
};

const sealVariants = {
  hidden: { scale: 0, rotate: -30, opacity: 0 },
  show:   { scale: 1, rotate: 6,   opacity: 1,
    transition: { type: 'spring', damping: 13, stiffness: 160, delay: 0.45 } },
};

// ── Component ────────────────────────────────────────────────────────────────
export const NewStampCelebration = () => {
  const { newStamp, dismissStamp } = usePassport();

  const prov      = useMemo(() => newStamp ? getProvinceById(newStamp) : null, [newStamp]);
  const stampChar = newStamp ? (STAMP_MAP[newStamp] ?? '✹') : '✹';

  return (
    <AnimatePresence>
      {newStamp && prov && (
        <motion.div
          className="stamp-fullscreen-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {/* Pure-CSS rings — zero JS */}
          <div className="stamp-bg-ring stamp-bg-ring--outer" />
          <div className="stamp-bg-ring stamp-bg-ring--inner" />

          {/* Pre-computed sparkle particles — Framer Motion only for trajectory */}
          <div className="celebration-particles" aria-hidden="true">
            {PARTICLES.map((p, i) => (
              <motion.div
                key={i}
                className="celebration-sparkle"
                style={{ width: p.size, height: p.size }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{ x: p.x, y: p.y, opacity: [0, 1, 1, 0], scale: 1 }}
                transition={{ duration: 2.2, ease: 'easeOut', delay: p.delay }}
              />
            ))}
          </div>

          {/* Content — plain HTML + CSS animations, no Framer Motion overhead */}
          <div className="stamp-fullscreen-content">
            {/* CSS: stampFadeUp delay 0.30s */}
            <p className="stamp-fs-label">Stempel Baru Diperoleh</p>

            {/* Spring bounce — kept in Framer Motion */}
            <motion.div
              className="stamp-fs-seal"
              variants={sealVariants}
              initial="hidden"
              animate="show"
            >
              {stampChar}
              <div className="stamp-fs-seal-gloss" />
            </motion.div>

            {/* CSS: stampFadeUp delay 0.72s */}
            <h2 className="stamp-fs-province">{prov.name.toUpperCase()}</h2>

            {/* CSS: stampScaleX delay 0.88s */}
            <div className="stamp-fs-divider" />

            {/* CSS: stampFadeUp delay 1.02s */}
            <p className="stamp-fs-desc">
              Kamu telah menyimak narasi budaya dan berhasil mengoleksi stempel{' '}
              <strong>{prov.name}</strong> ke dalam Paspor Perjalananmu.
            </p>

            {/* CSS: stampFadeUp delay 1.26s + CSS :hover/:active scale */}
            <button className="stamp-fs-btn" onClick={dismissStamp}>
              Lanjutkan Perjalanan →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
