'use client';
import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppFlow } from '@/contexts/AppFlow';
import { getCulturesByProvince } from '@/data/cultures';
import { useIsMobile } from '@/utils/useIsMobile';

import { usePassport } from '@/contexts/Passport';

const STAMP_SYMBOLS: Record<string, string> = {
  'jawa-tengah': '✿',
  'diy': '✦',
  'kalimantan-barat': '❈',
  'papua': '✹',
};

export const ProvinceDestinations = ({ visible }) => {
  const { selectedProvince, selectCategory, backToMap } = useAppFlow();
  const { visitedProvinces } = usePassport();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSelecting, setIsSelecting] = useState<string | null>(null);

  const isVisited = selectedProvince ? visitedProvinces.has(selectedProvince.id) : false;

  const handleSelectCategory = useCallback((catName: string) => {
    if (isSelecting) return;
    setIsSelecting(catName);
    setTimeout(() => {
      selectCategory(catName);
    }, 450); // Match globals.css transition duration
  }, [isSelecting, selectCategory]);
  // progressBarRef: direct DOM style writes replace setProgress(0..100) which
  // was calling React setState 60 times per second via requestAnimationFrame,
  // causing the entire component tree to re-render at 60fps.
  const progressBarRef = useRef<any>(null);
  const sliderRef = useRef<any>(null);

  const slideDuration = 5000; // 5 seconds per category slide

  // matchMedia-based â€” fires only when threshold is crossed, not every pixel
  const isMobile = useIsMobile(1024);

  // Reset activeIndex and progress bar when the province changes
  useEffect(() => {
    setActiveIndex(0);
    if (progressBarRef.current) progressBarRef.current.style.width = '0%';
  }, [selectedProvince?.id]);

  // Retrieve cultures for the selected province
  const cultures = useMemo(() => {
    if (!selectedProvince) return [];
    return getCulturesByProvince(selectedProvince.id);
  }, [selectedProvince]);

  // Generate category data with corresponding first youtubeId as its video source
  const categoryData = useMemo(() => {
    if (!selectedProvince || cultures.length === 0) return [];
    
    // Use categories declared in province or dynamically fallback to unique categories in culture items
    const categories = selectedProvince.categories || [...new Set(cultures.map(c => c.category))];
    
    const mapped = categories.map(cat => {
      const match = cultures.find(c => c.category === cat);
      return {
        name: cat,
        youtubeId: match ? match.youtubeId : 'cyJ9fpoYh_M', // Fallback YouTube video ID
        title: match ? match.title : '',
      };
    });

    const allItem = {
      name: 'Semua',
      youtubeId: cultures[0]?.youtubeId || 'cyJ9fpoYh_M',
      title: 'Semua Warisan Budaya',
    };

    return [allItem, ...mapped];
  }, [selectedProvince, cultures]);

  // Smooth auto-slide timer using requestAnimationFrame.
  // Progress is written directly to the DOM ref (no React state updates),
  // keeping the 60fps animation loop out of React's reconciler entirely.
  useEffect(() => {
    if (!visible || categoryData.length <= 1) return;

    let start = null;
    let animationFrameId = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min((elapsed / slideDuration) * 100, 100);

      // Direct DOM write â€” no setState, no re-render
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${pct}%`;
      }

      if (elapsed < slideDuration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Reset bar before switching category
        if (progressBarRef.current) progressBarRef.current.style.width = '0%';
        setActiveIndex((prev) => (prev + 1) % categoryData.length);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [activeIndex, categoryData.length, visible]);

  // Check if screen is mobile to adapt layout styles dynamically
  // (handled by useIsMobile hook above)

  if (!visible || !selectedProvince || categoryData.length === 0) return null;

  const currentCategory = categoryData[activeIndex];

  // Helper to handle manual click (resets progress bar directly via DOM)
  const handleCardClick = (index) => {
    setActiveIndex(index);
    if (progressBarRef.current) progressBarRef.current.style.width = '0%';
  };

  return (
    <div className="pd-container">
      {/* â”€â”€ BACKGROUND VIDEO LAYER â”€â”€ */}
      <div className="pd-bg-video-container">
        <AnimatePresence mode="wait">
          {/* Keyed by category name to force re-mount and replay video from the start */}
          <motion.div
            key={currentCategory.name}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
          >
            <iframe
              className="pd-bg-video-iframe"
              src={`https://www.youtube.com/embed/${currentCategory.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${currentCategory.youtubeId}&controls=0&rel=0&playsinline=1&enablejsapi=1&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0`}
              title={currentCategory.name}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>
        <div className="pd-bg-overlay" />
      </div>

      {/* Background click area for custom cursor explore transition */}
      <div 
        className="pd-bg-click-area"
        onClick={() => handleSelectCategory(currentCategory.name)}
      />

      {/* ── TOP HEADER (Logo and Back button) ── */}
      <div className={`pd-header ${isSelecting ? 'transition-fade-out' : ''}`}>
        <div className="pd-logo">{isMobile ? 'PROVINSI' : 'NUSAPLAY — PROVINSI'}</div>
        <button className="pd-back-btn" onClick={backToMap}>
          <span>{isMobile ? '← KEMBALI' : '← KEMBALI KE PETA'}</span>
        </button>
      </div>

      {/* ── MAIN CONTENT (Bottom aligned as per mockup) ── */}
      <div className="pd-main-content">
        {/* Province Big Title */}
        <motion.h1 
          className={`pd-province-title ${isSelecting ? 'transition-fade-out' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {selectedProvince.name}
          {isVisited && (
            <motion.span 
              className="pd-stamp-seal"
              title="Stempel paspor provinsi ini telah dikoleksi!"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 10 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 12 }}
            >
              {STAMP_SYMBOLS[selectedProvince.id] || '❈'}
            </motion.span>
          )}
        </motion.h1>

        {/* Fullwidth Divider Line with Meta Information */}
        <motion.div 
          className={`pd-divider-line ${isSelecting ? 'transition-fade-out' : ''}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <button 
            className="pd-divider-left"
            onClick={() => handleSelectCategory(currentCategory.name)}
          >
            <span className="pd-menu-icon">☰</span>
            <span>Explore {currentCategory.name}</span>
          </button>

        </motion.div>

        {/* Bottom Panel containing Description and Slider */}
        <div className="pd-bottom-row">
          {/* Description on Left */}
          <motion.div 
            className={`pd-desc-block ${isSelecting ? 'transition-fade-out' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>{selectedProvince.description}</p>
          </motion.div>

          <motion.div 
            className="pd-slider-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`pd-slider-header ${isSelecting ? 'transition-fade-out' : ''}`}>
              <span className="pd-slider-title">Kategori Budaya</span>
              <span className="pd-slider-instruction">Pilih video untuk menjelajah →</span>
            </div>

            <div ref={sliderRef} className="pd-thumbnails-row">
              {categoryData.map((cat, index) => {
                const isActive = index === activeIndex;
                const thumbUrl = `https://img.youtube.com/vi/${cat.youtubeId}/mqdefault.jpg`;
                
                return (
                  <div
                    key={cat.name}
                    className={`pd-thumbnail-item ${isActive ? 'active' : ''} ${isSelecting === cat.name ? 'transition-zoom-in' : (isSelecting ? 'transition-fade-out' : '')}`}
                    onMouseEnter={() => handleCardClick(index)}
                    onClick={() => handleSelectCategory(cat.name)}
                  >
                    <span className="pd-thumb-label">{String(index).padStart(2, '0')}.</span>
                    <div className="pd-thumb-card">
                      <img 
                        className="pd-thumb-img" 
                        src={thumbUrl} 
                        alt={cat.name} 
                        loading="lazy" 
                      />
                      <div className="pd-card-overlay">
                        <span className="pd-card-hover-text">MASUK</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Progress Bar */}
            <div className={`pd-progress-track ${isSelecting ? 'transition-fade-out' : ''}`}>
              <div 
                ref={progressBarRef}
                className="pd-progress-fill" 
                style={{
                  left: '0%',
                  width: '0%'
                }} 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

