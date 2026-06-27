'use client';
import { motion, AnimatePresence } from 'framer-motion';

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
        >
          {/* Animated wayang silhouette */}
          <div className="wayang-scene">
            <svg
              className="wayang-svg"
              viewBox="0 0 200 320"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Head / Mahkota */}
              <ellipse cx="100" cy="55" rx="28" ry="32" fill="currentColor" />
              {/* Crown points */}
              <polygon points="72,35 100,10 128,35" fill="currentColor" />
              <polygon points="82,28 100,5 118,28" fill="currentColor" />
              <rect x="88" y="4" width="24" height="10" rx="4" fill="currentColor" />
              {/* Face mask details */}
              <ellipse cx="90" cy="52" rx="5" ry="4" fill="#0b0a0a" opacity="0.5" />
              <ellipse cx="110" cy="52" rx="5" ry="4" fill="#0b0a0a" opacity="0.5" />
              {/* Ornate nose */}
              <path d="M98 63 Q100 70 102 63" stroke="#0b0a0a" strokeWidth="1.5" fill="none" opacity="0.4" />
              {/* Body / Torso */}
              <path d="M76 85 Q100 80 124 85 L130 160 Q100 170 70 160 Z" fill="currentColor" />
              {/* Batik chest pattern */}
              <path d="M88 100 L112 100 L108 135 L92 135 Z" fill="#0b0a0a" opacity="0.12" />
              <line x1="100" y1="100" x2="100" y2="135" stroke="#0b0a0a" strokeWidth="0.8" opacity="0.2" />
              {/* Left arm — animated */}
              <path
                className="wayang-arm wayang-arm--left"
                d="M76 90 Q40 115 15 145 Q25 155 35 148 Q60 125 82 105 Z"
                fill="currentColor"
              />
              {/* Left hand detail */}
              <path d="M15 145 Q8 155 5 165 Q15 168 22 160 Q25 155 35 148 Z" fill="currentColor" />
              {/* Right arm — animated opposite */}
              <path
                className="wayang-arm wayang-arm--right"
                d="M124 90 Q160 115 185 145 Q175 155 165 148 Q140 125 118 105 Z"
                fill="currentColor"
              />
              {/* Right hand detail */}
              <path d="M185 145 Q192 155 195 165 Q185 168 178 160 Q175 155 165 148 Z" fill="currentColor" />
              {/* Sarong / Lower body */}
              <path d="M70 155 Q100 162 130 155 L136 250 L120 255 L100 240 L80 255 L64 250 Z" fill="currentColor" />
              {/* Batik sarong pattern */}
              <path d="M78 180 Q100 185 122 180 Q120 200 100 205 Q80 200 78 180 Z" fill="#0b0a0a" opacity="0.08" />
              <path d="M76 210 Q100 215 124 210 Q122 230 100 235 Q78 230 76 210 Z" fill="#0b0a0a" opacity="0.08" />
              {/* Legs */}
              <rect x="80" y="248" width="16" height="50" rx="8" fill="currentColor" />
              <rect x="104" y="248" width="16" height="50" rx="8" fill="currentColor" />
              {/* Feet */}
              <ellipse cx="88" cy="300" rx="12" ry="6" fill="currentColor" />
              <ellipse cx="112" cy="300" rx="12" ry="6" fill="currentColor" />
            </svg>

            {/* Shadow beneath wayang */}
            <div className="wayang-shadow" />
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
