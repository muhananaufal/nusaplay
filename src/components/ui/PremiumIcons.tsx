'use client';
/**
 * PremiumIcons.jsx â€” NusaPlay Premium Animated SVG Icon Library
 * All icons use framer-motion for hover/active state micro-animations.
 * Style: thin-stroke, editorial, Awwwards-quality â€” no fill gradients.
 */
import { motion } from 'framer-motion';

const SVG_BASE: any = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

/* â”€â”€â”€ TARIAN (Dancer silhouette) â”€â”€â”€ */
export const TarianIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover={{ rotate: [0, -8, 8, -4, 0], transition: { duration: 0.6 } }}
    whileTap={{ scale: 0.9 }}
  >
    {/* Head */}
    <motion.circle cx="13" cy="3.5" r="1.5" />
    {/* Body */}
    <motion.path
      d="M13 5.5 L11 10 L9 15"
      initial={{ pathLength: 1 }}
      whileHover={{ pathLength: [1, 0.7, 1], transition: { duration: 0.5 } }}
    />
    {/* Raised arm */}
    <motion.path
      d="M11 7.5 L8 5 L6 3"
      initial={{ rotate: 0, originX: '11px', originY: '7.5px' }}
      whileHover={{ rotate: 15, transition: { duration: 0.4, yoyo: Infinity } }}
    />
    {/* Other arm */}
    <motion.path d="M11 8.5 L14 11 L16 10" />
    {/* Skirt/legs */}
    <motion.path
      d="M11 12 L7 18 M11 12 L13 17 L11 21"
      initial={{ skewX: 0 }}
      whileHover={{ skewX: 4, transition: { duration: 0.3 } }}
    />
    {/* Scarf/ribbon */}
    <motion.path
      d="M8 5 C6 7 5 9 7 11"
      strokeDasharray="12"
      initial={{ strokeDashoffset: 0 }}
      whileHover={{ strokeDashoffset: [0, 12, 0], transition: { duration: 1, repeat: Infinity } }}
    />
  </motion.svg>
);

/* â”€â”€â”€ MUSIK (Music note) â”€â”€â”€ */
export const MusikIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover="hover"
    initial="idle"
  >
    {/* Note stem */}
    <motion.line x1="9" y1="17" x2="9" y2="7"
      variants={{ idle: { x2: 9 }, hover: { x2: [9, 10, 9], transition: { duration: 0.5 } } }}
    />
    <motion.line x1="9" y1="7" x2="17" y2="5"
      variants={{ idle: {}, hover: { rotate: [-2, 2, 0], transition: { duration: 0.4 } } }}
    />
    <motion.line x1="17" y1="5" x2="17" y2="15"
      variants={{ idle: {}, hover: {} }}
    />
    {/* Note heads */}
    <motion.ellipse cx="7" cy="17.5" rx="2.5" ry="1.8"
      variants={{ idle: { scale: 1 }, hover: { scale: [1, 1.15, 1], transition: { duration: 0.4 } } }}
    />
    <motion.ellipse cx="15" cy="15.5" rx="2.5" ry="1.8"
      variants={{ idle: { scale: 1 }, hover: { scale: [1, 1.15, 1], transition: { duration: 0.4, delay: 0.1 } } }}
    />
    {/* Sound waves */}
    <motion.path
      d="M20 9 C21.5 8 21.5 12 20 11"
      variants={{ idle: { opacity: 0, x: -2 }, hover: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}
    />
    <motion.path
      d="M21.5 7 C24 6 24 14 21.5 13"
      variants={{ idle: { opacity: 0, x: -2 }, hover: { opacity: 0.6, x: 0, transition: { duration: 0.3, delay: 0.1 } } }}
    />
  </motion.svg>
);

/* â”€â”€â”€ GITAR / SAPE (String instrument) â”€â”€â”€ */
export const GitarIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover="hover"
    initial="idle"
  >
    {/* Body */}
    <motion.path
      d="M9 20 C5 20 3 17 4 14 C5 11 8 11 9 9 C9 7 8 5 9 4 C10 3 11 3 12 4 C13 5 12 7 13 9 C14 11 17 11 18 14 C19 17 17 20 13 20 Z"
      variants={{ idle: { scale: 1 }, hover: { scale: [1, 1.04, 1], transition: { duration: 0.5 } } }}
    />
    {/* Sound hole */}
    <motion.circle cx="11" cy="14" r="2.5"
      variants={{ idle: { opacity: 0.5 }, hover: { opacity: 1, transition: { duration: 0.3 } } }}
    />
    {/* Neck */}
    <motion.line x1="12" y1="4" x2="12" y2="1"
      variants={{ idle: {}, hover: { rotate: [0, 3, 0], transition: { duration: 0.4 } } }}
    />
    {/* Strings */}
    {[10, 11, 12].map((x, i) => (
      <motion.line key={i} x1={x} y1="4" x2={x + 0.5} y2="18"
        variants={{
          idle: { opacity: 0.4 },
          hover: { opacity: 1, pathLength: [1, 0.5, 1], transition: { duration: 0.3, delay: i * 0.05 } }
        }}
      />
    ))}
  </motion.svg>
);

/* â”€â”€â”€ CERITA RAKYAT (Book / scroll) â”€â”€â”€ */
export const CeritaRakyatIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover="hover"
    initial="idle"
  >
    {/* Book cover */}
    <motion.rect x="4" y="5" width="16" height="16" rx="1"
      variants={{ idle: { scaleY: 1 }, hover: { scaleY: [1, 0.97, 1], transition: { duration: 0.4 } } }}
    />
    {/* Page lines */}
    {[9, 12, 15].map((y, i) => (
      <motion.line key={i} x1="8" y1={y} x2="16" y2={y}
        variants={{
          idle: { opacity: 0.4, x: 0 },
          hover: { opacity: 1, x: [0, 2, 0], transition: { duration: 0.4, delay: i * 0.08 } }
        }}
      />
    ))}
    {/* Spine */}
    <motion.line x1="8" y1="5" x2="8" y2="21" />
    {/* Bookmark */}
    <motion.path d="M17 5 L17 8 L15.5 7 L14 8 L14 5"
      variants={{ idle: { y: 0 }, hover: { y: [-1, 0], transition: { duration: 0.3 } } }}
    />
  </motion.svg>
);

/* â”€â”€â”€ SENJATA (Crossed keris blades) â”€â”€â”€ */
export const SenjataIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover="hover"
    initial="idle"
  >
    {/* Blade 1 (wavy keris) */}
    <motion.path
      d="M5 19 L9 13 L10 11 L11 9 L10.5 7 L11.5 5 L12 3"
      variants={{ idle: { rotate: 0 }, hover: { rotate: [-5, 5, -3, 0], transition: { duration: 0.5 } } }}
      style={{ transformOrigin: '12px 12px' }}
    />
    {/* Blade 2 */}
    <motion.path
      d="M19 19 L15 13 L14 11 L13 9 L13.5 7 L12.5 5 L12 3"
      variants={{ idle: { rotate: 0 }, hover: { rotate: [5, -5, 3, 0], transition: { duration: 0.5 } } }}
      style={{ transformOrigin: '12px 12px' }}
    />
    {/* Handle/guard */}
    <motion.line x1="8" y1="17" x2="16" y2="17"
      variants={{ idle: { scaleX: 1 }, hover: { scaleX: [1, 1.15, 1], transition: { duration: 0.3 } } }}
      style={{ transformOrigin: '12px 17px' }}
    />
  </motion.svg>
);

/* â”€â”€â”€ RUMAH ADAT (Joglo roof) â”€â”€â”€ */
export const RumahAdatIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover="hover"
    initial="idle"
  >
    {/* Main Joglo roof */}
    <motion.path
      d="M3 14 L12 4 L21 14"
      variants={{ idle: { y: 0 }, hover: { y: [-2, 0], transition: { duration: 0.4, ease: 'easeOut' } } }}
    />
    {/* Upper roof peak */}
    <motion.path
      d="M7 14 L12 8 L17 14"
      variants={{ idle: { y: 0 }, hover: { y: [-3, 0], transition: { duration: 0.35, ease: 'easeOut', delay: 0.05 } } }}
    />
    {/* Walls */}
    <motion.rect x="6" y="14" width="12" height="7" />
    {/* Door */}
    <motion.path d="M10 21 L10 17.5 Q12 16 14 17.5 L14 21" />
    {/* Ornament tip */}
    <motion.line x1="12" y1="4" x2="12" y2="2"
      variants={{ idle: { opacity: 0 }, hover: { opacity: 1, transition: { duration: 0.3 } } }}
    />
  </motion.svg>
);

/* â”€â”€â”€ PAKAIAN ADAT (Traditional dress / batik cloth) â”€â”€â”€ */
export const PakaianAdatIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover="hover"
    initial="idle"
  >
    {/* Dress silhouette */}
    <motion.path
      d="M9 4 L8 7 L5 8 L5 10 L7 10 L7 21 L17 21 L17 10 L19 10 L19 8 L16 7 L15 4 Z"
      variants={{ idle: { skewX: 0 }, hover: { skewX: [0, 2, -2, 0], transition: { duration: 0.5 } } }}
    />
    {/* Collar */}
    <motion.path d="M9 4 Q12 6 15 4" />
    {/* Batik pattern lines */}
    {[12, 15, 18].map((y, i) => (
      <motion.line key={i} x1="9" y1={y} x2="15" y2={y} strokeWidth="0.8"
        variants={{
          idle: { opacity: 0.3 },
          hover: { opacity: [0.3, 0.8, 0.3], transition: { duration: 0.6, delay: i * 0.1, repeat: Infinity } }
        }}
      />
    ))}
  </motion.svg>
);

/* â”€â”€â”€ KULINER (Bowl with steam) â”€â”€â”€ */
export const KulinerIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover="hover"
    initial="idle"
  >
    {/* Bowl */}
    <motion.path d="M4 12 Q4 19 12 19 Q20 19 20 12 Z" />
    {/* Rim */}
    <motion.line x1="3" y1="12" x2="21" y2="12" />
    {/* Plate/base */}
    <motion.line x1="7" y1="19" x2="17" y2="19" />
    {/* Steam lines */}
    {[9, 12, 15].map((x, i) => (
      <motion.path
        key={i}
        d={`M${x} 11 Q${x + 1} 8 ${x} 6 Q${x - 1} 4 ${x} 2`}
        strokeDasharray="10"
        variants={{
          idle: { y: 0, opacity: 0.4 },
          hover: {
            y: [-2, -5, -2],
            opacity: [0.4, 0.8, 0.4],
            transition: { duration: 1.2, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }
          }
        }}
      />
    ))}
  </motion.svg>
);

/* â”€â”€â”€ BAHASA DAERAH (Speech bubble) â”€â”€â”€ */
export const BahasaDaerahIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover="hover"
    initial="idle"
  >
    {/* Main bubble */}
    <motion.path
      d="M4 4 Q4 2 6 2 L18 2 Q20 2 20 4 L20 12 Q20 14 18 14 L13 14 L10 17 L10 14 L6 14 Q4 14 4 12 Z"
      variants={{
        idle: { scale: 1 },
        hover: { scale: [1, 1.05, 1], transition: { duration: 0.4 } }
      }}
    />
    {/* Typing dots */}
    {[8, 12, 16].map((x, i) => (
      <motion.circle key={i} cx={x} cy="8" r="1.2"
        variants={{
          idle: { opacity: 0.4, scale: 1 },
          hover: {
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.4, 1],
            transition: { duration: 0.8, delay: i * 0.2, repeat: Infinity }
          }
        }}
      />
    ))}
  </motion.svg>
);

/* â”€â”€â”€ KERAJINAN (Palette and brush) â”€â”€â”€ */
export const KerajinanIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover="hover"
    initial="idle"
  >
    {/* Palette circle */}
    <motion.circle cx="10" cy="12" r="7"
      variants={{ idle: { scale: 1 }, hover: { scale: [1, 1.05, 1], transition: { duration: 0.4 } } }}
    />
    {/* Paint dabs */}
    {[[8, 9], [12, 8], [14, 12], [11, 15], [7, 14]].map(([cx, cy], i) => (
      <motion.circle key={i} cx={cx} cy={cy} r="1.5" strokeWidth="0"
        style={{ fill: 'currentColor', opacity: 0.25 }}
        variants={{
          idle: { opacity: 0.25 },
          hover: { opacity: [0.25, 0.7, 0.25], transition: { duration: 0.6, delay: i * 0.1, repeat: Infinity } }
        }}
      />
    ))}
    {/* Brush handle */}
    <motion.line x1="15" y1="9" x2="22" y2="3"
      variants={{ idle: { rotate: 0 }, hover: { rotate: [-10, 10, 0], transition: { duration: 0.5, ease: 'easeInOut' } } }}
      style={{ transformOrigin: '15px 9px' }}
    />
    {/* Brush tip */}
    <motion.path d="M13 11 L15 9 L17 10 L15 12 Z"
      variants={{ idle: { scale: 1 }, hover: { scale: 1.2, transition: { duration: 0.3 } } }}
      style={{ transformOrigin: '15px 10.5px' }}
    />
  </motion.svg>
);

/* â”€â”€â”€ UPACARA ADAT (Temple pillars) â”€â”€â”€ */
export const UpacaraAdatIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover="hover"
    initial="idle"
  >
    {/* Roof */}
    <motion.path
      d="M2 9 L12 3 L22 9 L20 9 L12 5 L4 9 Z"
      variants={{ idle: { y: 0 }, hover: { y: -1, transition: { duration: 0.3 } } }}
    />
    {/* Top frieze */}
    <motion.rect x="3" y="9" width="18" height="2" />
    {/* Pillars */}
    {[5, 9, 13, 17].map((x, i) => (
      <motion.rect key={i} x={x} y="11" width="2" height="10"
        variants={{
          idle: { scaleY: 1 },
          hover: { scaleY: [1, 1.03, 1], transition: { duration: 0.4, delay: i * 0.06 } }
        }}
        style={{ transformOrigin: `${x + 1}px 21px` }}
      />
    ))}
    {/* Base */}
    <motion.rect x="2" y="21" width="20" height="1.5" />
    {/* Glow ring */}
    <motion.circle cx="12" cy="6" r="2"
      variants={{ idle: { opacity: 0 }, hover: { opacity: [0, 0.4, 0], transition: { duration: 1, repeat: Infinity } } }}
      strokeDasharray="12"
    />
  </motion.svg>
);

/* â”€â”€â”€ BATIK (Geometric pattern) â”€â”€â”€ */
export const BatikIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover="hover"
    initial="idle"
  >
    {/* Center flower */}
    <motion.circle cx="12" cy="12" r="3"
      variants={{ idle: { rotate: 0 }, hover: { rotate: 360, transition: { duration: 1.5, ease: 'linear' } } }}
      style={{ transformOrigin: '12px 12px' }}
    />
    {/* Petals */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x2 = 12 + 6 * Math.sin(rad);
      const y2 = 12 - 6 * Math.cos(rad);
      return (
        <motion.line key={i} x1="12" y1="12" x2={x2} y2={y2}
          variants={{
            idle: { opacity: 0.5 },
            hover: { opacity: 1, pathLength: [1, 0.3, 1], transition: { duration: 0.8, delay: i * 0.08 } }
          }}
        />
      );
    })}
    {/* Outer ring */}
    <motion.circle cx="12" cy="12" r="9"
      strokeDasharray="4 2"
      variants={{ idle: { rotate: 0 }, hover: { rotate: -180, transition: { duration: 2, ease: 'linear' } } }}
      style={{ transformOrigin: '12px 12px' }}
    />
  </motion.svg>
);

/* â”€â”€â”€ WAYANG (Shadow puppet) â”€â”€â”€ */
export const WayangIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover="hover"
    initial="idle"
  >
    {/* Head */}
    <motion.circle cx="12" cy="4" r="2.5" />
    {/* Nose */}
    <motion.path d="M12 3 L15 5" />
    {/* Crown */}
    <motion.path d="M9.5 2 L12 0.5 L14.5 2"
      variants={{ idle: { y: 0 }, hover: { y: -1, transition: { duration: 0.3 } } }}
    />
    {/* Body */}
    <motion.path
      d="M12 6.5 L10 12 L8 16 M12 6.5 L14 12 L16 16"
      variants={{ idle: { skewX: 0 }, hover: { skewX: [0, 4, -4, 0], transition: { duration: 0.7 } } }}
      style={{ transformOrigin: '12px 12px' }}
    />
    {/* Arm 1 */}
    <motion.path
      d="M10 9 L5 7 L3 8"
      variants={{ idle: { rotate: 0 }, hover: { rotate: [0, -20, 0], transition: { duration: 0.6 } } }}
      style={{ transformOrigin: '10px 9px' }}
    />
    {/* Arm 2 */}
    <motion.path
      d="M14 9 L19 7 L21 8"
      variants={{ idle: { rotate: 0 }, hover: { rotate: [0, 20, 0], transition: { duration: 0.6, delay: 0.1 } } }}
      style={{ transformOrigin: '14px 9px' }}
    />
    {/* Puppet stick */}
    <motion.line x1="12" y1="16" x2="12" y2="22"
      strokeWidth="2"
      variants={{ idle: { opacity: 0.5 }, hover: { opacity: 1, transition: { duration: 0.2 } } }}
    />
  </motion.svg>
);

/* â”€â”€â”€ LOCK (Padlock) â”€â”€â”€ */
export const LockIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover="hover"
    initial="idle"
  >
    {/* Shackle */}
    <motion.path
      d="M8 11 L8 8 Q8 4 12 4 Q16 4 16 8 L16 11"
      variants={{
        idle: { y: 0 },
        hover: { y: -2, transition: { duration: 0.3, ease: 'easeOut' } }
      }}
    />
    {/* Body */}
    <motion.rect x="5" y="11" width="14" height="10" rx="2"
      variants={{ idle: { scale: 1 }, hover: { scale: [1, 1.04, 1], transition: { duration: 0.4 } } }}
    />
    {/* Keyhole */}
    <motion.circle cx="12" cy="16" r="1.5" />
    <motion.line x1="12" y1="17.5" x2="12" y2="19" />
  </motion.svg>
);

/* â”€â”€â”€ SEARCH (Magnifier) â”€â”€â”€ */
export const SearchIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover="hover"
    initial="idle"
  >
    {/* Lens */}
    <motion.circle cx="10" cy="10" r="7"
      variants={{ idle: { scale: 1 }, hover: { scale: [1, 1.08, 1], transition: { duration: 0.4 } } }}
    />
    {/* Handle */}
    <motion.line x1="15.5" y1="15.5" x2="21" y2="21"
      variants={{ idle: { x2: 21, y2: 21 }, hover: { x2: [21, 22.5, 21], y2: [21, 22.5, 21], transition: { duration: 0.4 } } }}
    />
  </motion.svg>
);

/* â”€â”€â”€ SEMUA (All categories â€” abstract mandala) â”€â”€â”€ */
export const SemuaIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover="hover"
    initial="idle"
  >
    <motion.circle cx="12" cy="12" r="9"
      variants={{ idle: { rotate: 0 }, hover: { rotate: 90, transition: { duration: 0.8, ease: 'easeInOut' } } }}
      style={{ transformOrigin: '12px 12px' }}
    />
    {/* Compass cross */}
    <motion.line x1="12" y1="3" x2="12" y2="21" />
    <motion.line x1="3" y1="12" x2="21" y2="12" />
    {/* Diagonals */}
    <motion.line x1="5.5" y1="5.5" x2="18.5" y2="18.5"
      variants={{ idle: { opacity: 0.3 }, hover: { opacity: 1, transition: { duration: 0.3 } } }}
    />
    <motion.line x1="18.5" y1="5.5" x2="5.5" y2="18.5"
      variants={{ idle: { opacity: 0.3 }, hover: { opacity: 1, transition: { duration: 0.3, delay: 0.05 } } }}
    />
    {/* Center */}
    <motion.circle cx="12" cy="12" r="2"
      variants={{ idle: { scale: 1 }, hover: { scale: 1.5, transition: { duration: 0.3 } } }}
    />
  </motion.svg>
);

/* â”€â”€â”€ BANGUNAN BERSEJARAH (Monument / Temple columns) â”€â”€â”€ */
export const BangunanBersejarahIcon = ({ size = 20, className = '' }) => (
  <motion.svg
    {...SVG_BASE}
    width={size}
    height={size}
    className={className}
    whileHover="hover"
    initial="idle"
  >
    {/* Pediment (roof triangle) */}
    <motion.path
      d="M3 7 L12 2 L21 7 Z"
      variants={{ idle: { y: 0 }, hover: { y: [-1, 0], transition: { duration: 0.3 } } }}
    />
    {/* Architrave (base under roof) */}
    <motion.line x1="4" y1="9" x2="20" y2="9" />
    {/* Columns */}
    <motion.line x1="6" y1="9" x2="6" y2="18"
      variants={{ idle: { scaleY: 1 }, hover: { scaleY: [1, 0.95, 1], transition: { duration: 0.4 } } }}
      style={{ transformOrigin: 'top' }}
    />
    <motion.line x1="10" y1="9" x2="10" y2="18"
      variants={{ idle: { scaleY: 1 }, hover: { scaleY: [1, 0.95, 1], transition: { duration: 0.4, delay: 0.05 } } }}
      style={{ transformOrigin: 'top' }}
    />
    <motion.line x1="14" y1="9" x2="14" y2="18"
      variants={{ idle: { scaleY: 1 }, hover: { scaleY: [1, 0.95, 1], transition: { duration: 0.4, delay: 0.1 } } }}
      style={{ transformOrigin: 'top' }}
    />
    <motion.line x1="18" y1="9" x2="18" y2="18"
      variants={{ idle: { scaleY: 1 }, hover: { scaleY: [1, 0.95, 1], transition: { duration: 0.4, delay: 0.15 } } }}
      style={{ transformOrigin: 'top' }}
    />
    {/* Stylobate (base steps) */}
    <motion.rect x="3" y="18" width="18" height="3" rx="0.5" />
  </motion.svg>
);

/* â”€â”€â”€ MAP for category â†’ icon component â”€â”€â”€ */
export const CATEGORY_ICON_MAP = {
  'Tarian':         TarianIcon,
  'Musik':          MusikIcon,
  'Cerita Rakyat':  CeritaRakyatIcon,
  'Senjata':        SenjataIcon,
  'Rumah Adat':     RumahAdatIcon,
  'Pakaian Adat':   PakaianAdatIcon,
  'Kuliner':        KulinerIcon,
  'Bahasa Daerah':  BahasaDaerahIcon,
  'Kerajinan':      KerajinanIcon,
  'Upacara Adat':   UpacaraAdatIcon,
  'Batik':          BatikIcon,
  'Wayang':         WayangIcon,
  'Bangunan Bersejarah': BangunanBersejarahIcon,
  'Semua':          SemuaIcon,
};

/**
 * getCategoryIcon(category) â†’ returns the animated icon component
 * Use as: const Icon = getCategoryIcon(cat); return <Icon size={20} />
 */
export const getCategoryIcon = (category) => CATEGORY_ICON_MAP[category] || SemuaIcon;

/* â”€â”€â”€ Journey stop icons â”€â”€â”€ */
export const JOURNEY_ICON_MAP = {
  music: MusikIcon,
  dance: TarianIcon,
  guitar: GitarIcon,
};

