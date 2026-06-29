'use client';
import { usePassport } from '@/contexts/Passport';
import { motion, AnimatePresence } from 'framer-motion';
import { getProvinceById } from '@/data/provinces';

export const NewStampCelebration = () => {
  const { newStamp, dismissStamp } = usePassport();

  const stampMap: Record<string, string> = {
    'jawa-tengah': '✿',
    'diy': '✦',
    'kalimantan-barat': '❈',
    'papua': '✹',
  };

  const prov = newStamp ? getProvinceById(newStamp) : null;
  const stampChar = newStamp ? (stampMap[newStamp] || '✹') : '✹';

  return (
    <AnimatePresence>
      {newStamp && prov && (
        <motion.div
          className="stamp-fullscreen-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Background decorative rings */}
          <motion.div
            className="stamp-bg-ring stamp-bg-ring--outer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          />
          <motion.div
            className="stamp-bg-ring stamp-bg-ring--inner"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.8, ease: 'easeOut' }}
          />

          {/* Floating sparkle particles */}
          <div className="celebration-particles">
            {Array.from({ length: 32 }).map((_, i) => {
              const angle = (i / 32) * Math.PI * 2 + Math.random() * 0.5;
              const distance = Math.random() * 200 + 80;
              const targetX = Math.cos(angle) * distance;
              const targetY = Math.sin(angle) * distance;
              const size = Math.random() * 8 + 4;
              return (
                <motion.div
                  key={i}
                  className="celebration-sparkle"
                  style={{ width: size, height: size }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{ x: targetX, y: targetY, scale: 1, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2.5, ease: 'easeOut', delay: 0.4 + Math.random() * 0.3 }}
                />
              );
            })}
          </div>

          {/* Main content */}
          <div className="stamp-fullscreen-content">
            {/* Top label */}
            <motion.p
              className="stamp-fs-label"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Stempel Baru Diperoleh
            </motion.p>

            {/* Giant gold wax seal */}
            <motion.div
              className="stamp-fs-seal"
              initial={{ scale: 0, rotate: -30, opacity: 0 }}
              animate={{ scale: 1, rotate: 6, opacity: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 150, delay: 0.5 }}
            >
              {stampChar}

              {/* Inner gloss ring */}
              <div className="stamp-fs-seal-gloss" />
            </motion.div>

            {/* Province name */}
            <motion.h2
              className="stamp-fs-province"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
            >
              {prov.name.toUpperCase()}
            </motion.h2>

            {/* Divider line */}
            <motion.div
              className="stamp-fs-divider"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.5, ease: 'easeOut' }}
            />

            {/* Description */}
            <motion.p
              className="stamp-fs-desc"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
            >
              Kamu telah menyimak narasi budaya dan berhasil mengoleksi stempel <strong>{prov.name}</strong> ke dalam Paspor Perjalananmu.
            </motion.p>

            {/* Dismiss button */}
            <motion.button
              className="stamp-fs-btn"
              onClick={dismissStamp}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.45 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Lanjutkan Perjalanan →
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
