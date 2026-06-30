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

// Framer Motion variants for premium coordinated entrance:
const overlayVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:   { opacity: 0, transition: { duration: 0.4, ease: 'easeIn'  } },
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      damping: 18, 
      stiffness: 110 
    } 
  }
};

const dividerVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  show: { 
    opacity: 1, 
    scaleX: 1, 
    transition: { 
      type: 'spring', 
      damping: 15, 
      stiffness: 90,
      delay: 0.55 // sync with stagger sequence
    } 
  }
};

const sealVariants = {
  hidden: { scale: 0, rotate: -40, opacity: 0 },
  show: { 
    scale: 1, 
    rotate: 6, 
    opacity: 1,
    transition: { 
      type: 'spring', 
      damping: 12, 
      stiffness: 150, 
      delay: 0.35 // pops in bouncy early on
    } 
  }
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

          {/* Content container — Framer Motion staggered entrance */}
          <motion.div 
            className="stamp-fullscreen-content"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Step label */}
            <motion.p className="stamp-fs-label" variants={itemVariants}>
              Stempel Baru Diperoleh
            </motion.p>

            {/* Giant Gold Wax Seal: Spring Entrance + Continuous Float Loop + Hover/Tap Interactions */}
            <motion.div
              variants={sealVariants}
              initial="hidden"
              animate="show"
              style={{ display: 'flex', justifyContent: 'center', width: '100%', pointerEvents: 'none' }}
            >
              <motion.div
                className="stamp-fs-seal"
                style={{ pointerEvents: 'auto' }} // Allow mouse events on seal only
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: 4,
                    ease: 'easeInOut',
                  }
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 12,
                  filter: 'drop-shadow(0 15px 30px rgba(212, 175, 55, 0.65))',
                  transition: { type: 'spring', stiffness: 300, damping: 15 }
                }}
                whileTap={{
                  scale: 0.95,
                  rotate: -4,
                  transition: { type: 'spring', stiffness: 400, damping: 10 }
                }}
              >
                {stampChar}
                <div className="stamp-fs-seal-gloss" />
              </motion.div>
            </motion.div>

            {/* Province Name with hover effect */}
            <motion.h2 
              className="stamp-fs-province"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.04, 
                color: '#D4AF37',
                transition: { duration: 0.2 } 
              }}
            >
              {prov.name.toUpperCase()}
            </motion.h2>

            {/* Divider scale entrance */}
            <motion.div className="stamp-fs-divider" variants={dividerVariants} />

            {/* Description text */}
            <motion.p className="stamp-fs-desc" variants={itemVariants}>
              Kamu telah menyimak narasi budaya dan berhasil mengoleksi stempel{' '}
              <strong>{prov.name}</strong> ke dalam Paspor Perjalananmu.
            </motion.p>

            {/* Interactive button with custom spring hover/active curves */}
            <motion.button 
              className="stamp-fs-btn" 
              onClick={dismissStamp}
              variants={itemVariants}
              whileHover={{
                scale: 1.06,
                backgroundColor: '#F4E5A9',
                boxShadow: '0 12px 32px rgba(212, 175, 55, 0.6)',
                y: -2,
              }}
              whileTap={{
                scale: 0.96,
                y: 0
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 15
              }}
            >
              Lanjutkan Perjalanan →
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
