'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';
import { usePlay } from '@/contexts/Play';
import { UNLOCKED_PROVINCES } from '@/data/provinces';
import tts from '@/utils/tts';
import { useIsMobile } from '@/utils/useIsMobile';
import { usePassport } from '@/contexts/Passport';

// Pure CSS animated Hamburger and Close (X) icon — works in all browsers with 0 FPS overhead
const MenuButtonIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className={`menu-hamburger-icon ${isOpen ? 'open' : ''}`}>
      <span className="hamburger-line line-top" />
      <span className="hamburger-line line-middle" />
      <span className="hamburger-line line-bottom" />
    </div>
  );
};

// Social media SVG icons
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.37z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTitle, setHoveredTitle] = useState(null);
  const [hoveredImage, setHoveredImage] = useState('/img/menu_welcome.webp');
  const [showAbout, setShowAbout] = useState(false);

  const {
    phase,
    goTo,
    backToMap,
    startQuiz,
    quizProvince,
    selectProvince
  } = useAppFlow();
  
  const { play, setPlay, setEnd, end } = usePlay();
  const { visitedProvinces, visitCount } = usePassport();

  // matchMedia-based â€” fires only when threshold is crossed, not every pixel
  const isMobile = useIsMobile(1024);

  // Close menu and modals when phase changes
  useEffect(() => {
    setIsOpen(false);
    setShowAbout(false);
  }, [phase]);

  // Memoized so the 4 action closures aren't recreated on every render.
  // All deps (goTo, backToMap, startQuiz, setPlay, setEnd) are stable
  // references: useCallback from context + useState setters from PlayContext.
  // IMPORTANT: must be before any early return to satisfy Rules of Hooks.
  const mainMenuItems = useMemo(() => [
    {
      title: 'Beranda',
      action: () => {
        setIsOpen(false);
        setPlay(false);
        setEnd(false);
        goTo(PHASES.SPLASH);
      },
      image: '/img/menu_welcome.webp'
    },
    {
      title: 'Peta Nusantara',
      action: () => {
        setIsOpen(false);
        const shouldTransition = phase !== PHASES.MAP && phase !== PHASES.PROVINCE;
        backToMap(false, shouldTransition);
      },
      image: '/img/menu_map.webp'
    },
    {
      title: 'Kuis Nusantara',
      action: () => {
        setIsOpen(false);
        startQuiz(null);
      },
      image: '/img/menu_quiz.webp'
    },
    {
      title: 'Tentang NusaPlay',
      action: () => {
        setShowAbout(true);
      },
      image: '/img/menu_about.webp'
    }
  ], [goTo, backToMap, startQuiz, setPlay, setEnd]);

  // Do not render navigation on Journey intro phase
  if (phase === PHASES.JOURNEY) return null;


  const isSplitPill = [PHASES.LIST, PHASES.DETAIL, PHASES.QUIZ].includes(phase);

  const handleBack = () => {
    if (phase === PHASES.LIST) {
      goTo(PHASES.PROVINCE);
    } else if (phase === PHASES.DETAIL) {
      tts.stop();
      goTo(PHASES.LIST);
    } else if (phase === PHASES.QUIZ) {
      if (quizProvince) {
        startQuiz(null);
      } else {
        backToMap(false, true);
      }
    }
  };

  const getBackBtnText = () => {
    if (isMobile) return 'Kembali';
    
    if (phase === PHASES.LIST) {
      return 'Kembali ke Peta';
    } else if (phase === PHASES.DETAIL) {
      return 'Kembali ke Daftar';
    } else if (phase === PHASES.QUIZ) {
      return quizProvince ? 'Kembali ke Pilihan' : 'Kembali ke Peta';
    }
    return 'Kembali';
  };

  return (
    <>
      {/* â”€â”€ Contextual Top-Right Back Button â”€â”€ */}
      <AnimatePresence>
        {isSplitPill && !isOpen && (
          <motion.button
            className="floating-back-btn"
            onClick={handleBack}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.35, ease: [0.24, 0.43, 0.15, 0.97] }}
          >
            <span>&larr;</span>
            <span>{getBackBtnText()}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Floating Top-Right Hamburger Menu Button ── */}
      <button
        className={`floating-menu-btn ${(isOpen || showAbout) ? 'menu-open' : ''} ${(phase === PHASES.JOURNEY || (play && !end)) && !isOpen && !showAbout ? 'menu-hidden' : ''}`}
        onClick={() => {
          if (showAbout) {
            setShowAbout(false);
          } else {
            setIsOpen(!isOpen);
          }
        }}
        aria-label={isOpen ? 'Tutup Menu' : 'Buka Menu'}
      >
        <MenuButtonIcon isOpen={isOpen || showAbout} />
      </button>

      {/* â”€â”€ Elementis-styled Split Screen Fullscreen Overlay â”€â”€ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Left Panel: Dynamic cinematic image peek (Desktop Only) */}
            <motion.div
              className="nav-menu-left"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={hoveredImage}
                    src={hoveredImage}
                    alt="Menu Preview"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="nav-menu-left-img"
                  />
                </AnimatePresence>
                <div className="nav-menu-left-overlay" />
              </div>
            </motion.div>

            {/* Right Panel: Sand-beige solid menu block */}
            <motion.div
              className="nav-menu-right"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Discover Pages Section */}
              <div>
                <div className="nav-section-title">Jelajahi Halaman</div>
                
                <div className="nav-links-list-single">
                  {mainMenuItems.map((item, index) => {
                    const isHovered = hoveredTitle === item.title;
                    const isDimmed = hoveredTitle !== null && hoveredTitle !== item.title;
                    
                    return (
                      <div
                        key={item.title}
                        className={`nav-lux-link ${isHovered ? 'hovered' : ''} ${isDimmed ? 'dimmed' : ''}`}
                        onMouseEnter={() => {
                          setHoveredTitle(item.title);
                          setHoveredImage(item.image);
                        }}
                        onMouseLeave={() => setHoveredTitle(null)}
                        onClick={item.action}
                      >
                        <div className="lux-link-text-wrap">
                          <span className="lux-link-text-primary">{item.title}</span>
                          <span className="lux-link-text-secondary">{item.title}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom: Contact Us & Connected Socials */}
              <div className="nav-details-row">
                <div className="nav-contact-block">
                  <span className="nav-contact-label">Hubungi Kami</span>
                  <span className="nav-contact-value">hello@nusaplay.id</span>
                  <span className="nav-contact-value">+62 821 3178 796</span>
                </div>

                <div className="nav-socials-block">
                  <span className="nav-contact-label">Tetap Terhubung</span>
                  <div className="nav-socials-icons">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="nav-social-icon-link">
                      <InstagramIcon />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="nav-social-icon-link">
                      <FacebookIcon />
                    </a>
                    <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="nav-social-icon-link">
                      <WhatsAppIcon />
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="nav-social-icon-link">
                      <TikTokIcon />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="nav-social-icon-link">
                      <YouTubeIcon />
                    </a>
                  </div>
                </div>
              </div>

              {/* Policies and Terms Footer */}
              <div className="nav-policies-row">
                <span>NusaPlay &copy; 2026</span>
                <div className="nav-policies-links">
                  <a href="#terms" className="nav-policies-link">Syarat & Ketentuan</a>
                  <a href="#privacy" className="nav-policies-link">Kebijakan Privasi</a>
                </div>
              </div>

              {/* â”€â”€ Inline Slide-in About Sheet (covers the menu columns) â”€â”€ */}
              <AnimatePresence>
                {showAbout && (
                  <motion.div
                    className="nav-about-sheet"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <div className="about-sheet-content">
                      <span className="about-tag">TENTANG PROJEK</span>
                      <h2 className="about-title">NusaPlay</h2>
                      <p className="about-desc">
                        NusaPlay adalah platform interaktif yang memadukan eksplorasi visual 3D, pemetaan GIS digital, dan penceritaan multimedia untuk merayakan serta melestarikan warisan budaya Indonesia.
                      </p>
                      <p className="about-desc">
                        Didesain dengan tema editorial gelap yang premium dan aksen nusantara yang khas, NusaPlay mengajak generasi muda untuk menyelami kekayaan tradisi, musik daerah, kuis edukatif, serta arsitektur adat kepulauan Nusantara.
                      </p>
                      
                      <div className="about-stats-grid">
                        <div className="about-stat-item">
                          <span className="stat-num">34</span>
                          <span className="stat-label">Provinsi</span>
                        </div>
                        <div className="about-stat-item">
                          <span className="stat-num">300+</span>
                          <span className="stat-label">Suku Bangsa</span>
                        </div>
                        <div className="about-stat-item">
                          <span className="stat-num">700+</span>
                          <span className="stat-label">Bahasa Daerah</span>
                        </div>
                      </div>

                      <div className="about-tech-stack">
                        <span className="tech-stack-title">TEKNOLOGI YANG DIGUNAKAN</span>
                        <div className="tech-tags">
                          <span>Next.js 16</span>
                          <span>React 19</span>
                          <span>Three.js / Fiber</span>
                          <span>Leaflet.js</span>
                          <span>Framer Motion</span>
                          <span>GSAP</span>
                          <span>Vanilla CSS</span>
                          <span>Web Speech API</span>
                        </div>
                      </div>



                      {/* Creators Section */}
                      <div className="about-creators-section">
                        <span className="tech-stack-title">TIM PENGEMBANG</span>
                        <div className="about-creators-list">
                          <a href="https://github.com/muhananaufal" target="_blank" rel="noopener noreferrer" className="creator-link">
                            Muhana Naufal
                          </a>
                          <a href="https://github.com/wahyuanang" target="_blank" rel="noopener noreferrer" className="creator-link">
                            Wahyu Anang
                          </a>
                          <a href="https://github.com/linarahmawti" target="_blank" rel="noopener noreferrer" className="creator-link">
                            Lina Rahmati
                          </a>
                        </div>
                      </div>

                      <button 
                        className="about-back-btn"
                        onClick={() => setShowAbout(false)}
                      >
                        ← Kembali ke Menu
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

