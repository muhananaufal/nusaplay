'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Mascot } from './Mascot';

const ISLAND_NAMES = [
  'Jawa', 'Sumatra', 'Kalimantan', 'Sulawesi', 'Papua',
  'Bali', 'Lombok', 'Flores', 'Ambon', 'Ternate',
];

export const WayangLoader = ({ progress }: { progress: number }) => {
  const nameIndex = Math.floor((progress / 100) * ISLAND_NAMES.length);
  const currentIsland = ISLAND_NAMES[Math.min(nameIndex, ISLAND_NAMES.length - 1)];

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          className="wayang-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          style={{ gap: '16px' }}
        >
          {/* Animated Mascot */}
          <div className="wayang-scene" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0px' }}>
            <Mascot pose="excited" size={280} />
          </div>

          {/* Progress info */}
          <div className="wayang-info">
            <motion.div
              key={currentIsland}
              className="wayang-island-name"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              {currentIsland}
            </motion.div>
            <div className="wayang-progress-text">
              Memuat {Math.round(progress)}%
            </div>
            <div className="wayang-progress-bar">
              <motion.div
                className="wayang-progress-fill"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
