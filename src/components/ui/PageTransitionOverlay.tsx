'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppFlow } from '@/contexts/AppFlow';

import { Mascot } from './Mascot';

export const PageTransitionOverlay = () => {
  const { isTransitioning, transitionProgress } = useAppFlow();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="global-transition-curtain"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--c-dark)', // Mascot White theme color
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'all', // block clicks during transition
          }}
        >
          {/* Animated Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="wayang-scene"
            style={{ color: 'var(--c-text)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <Mascot pose="excited" size={280} />
            
            {/* Branding Text lockup below wayang shadow */}
            <div className="transition-branding-text" style={{ marginTop: '8px' }}>
              NusaPlay
            </div>

            {/* Dynamic Progress Indicator */}
            <div className="wayang-progress-bar" style={{ marginTop: '16px', background: 'rgba(255, 255, 255, 0.08)', width: '200px', height: '2px', position: 'relative', overflow: 'hidden' }}>
              <motion.div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--c-accent), var(--c-gold))',
                }}
                animate={{
                  width: `${transitionProgress}%`
                }}
                transition={{
                  duration: transitionProgress === 100 ? 0.35 : 0.2,
                  ease: 'easeOut',
                }}
              />
            </div>
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.15em', color: 'rgba(255, 255, 255, 0.4)', marginTop: '8px', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
              Memuat Halaman...
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
