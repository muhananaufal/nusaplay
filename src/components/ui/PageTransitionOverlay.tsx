'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppFlow } from '@/contexts/AppFlow';

import { Mascot } from './Mascot';

export const PageTransitionOverlay = () => {
  const { isTransitioning } = useAppFlow();

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
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 0.8 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="wayang-scene"
            style={{ color: 'var(--c-text)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <Mascot pose="excited" size={140} />
            <div className="wayang-shadow" style={{ background: 'radial-gradient(ellipse, rgba(24, 23, 23, 0.2) 0%, transparent 70%)', marginBottom: '8px', width: '100px' }} />
            
            {/* Branding Text lockup below wayang shadow */}
            <div className="transition-branding-text">
              NusaPlay
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
