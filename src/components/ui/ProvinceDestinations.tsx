'use client';
import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAppFlow } from '@/contexts/AppFlow';
import { useProgress } from '@/contexts/Progress';
import { fetchCulturesByProvince } from '@/utils/fetchCultures';
import { useIsMobile } from '@/utils/useIsMobile';
import { usePassport } from '@/contexts/Passport';
import { usePlay } from '@/contexts/Play';

const STAMP_SYMBOLS: Record<string, string> = {
  'jawa-tengah': '✿',
  'diy': '✦',
  'kalimantan-barat': '❈',
  'papua': '✹',
};

export const ProvinceDestinations = ({ visible }) => {
  const { selectedProvince, selectCategory, backToMap } = useAppFlow();
  const { visitedByProvince, listenedByProvince } = useProgress();
  const { visitedProvinces } = usePassport();
  const { tourActive } = usePlay();

  const isMobile = useIsMobile(768);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (tourActive) {
      setMagneticPos({ x: 0, y: 0 });
    }
  }, [tourActive]);

  // Track cursor position to simulate a magnetic pull on the explore button
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (tourActive) return;
      const btn = buttonRef.current;
      if (btn) {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < 160) {
          // Attract towards cursor (28% strength)
          setMagneticPos({ x: distanceX * 0.28, y: distanceY * 0.28 });
        } else {
          setMagneticPos({ x: 0, y: 0 });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile, tourActive]);

  const isVisited = selectedProvince ? visitedProvinces.has(selectedProvince.id) : false;

  // Retrieve cultures for the selected province
  const [cultures, setCultures] = useState<any[]>([]);
  useEffect(() => {
    if (!selectedProvince?.id) { setCultures([]); return; }
    fetchCulturesByProvince(selectedProvince.id).then(setCultures);
  }, [selectedProvince?.id]);

  const totalCultures = cultures.length;

  const visitedCount = useMemo(() => {
    if (!selectedProvince) return 0;
    return (visitedByProvince[selectedProvince.id] || []).length;
  }, [visitedByProvince, selectedProvince?.id]);

  const listenedCount = useMemo(() => {
    if (!selectedProvince) return 0;
    return (listenedByProvince[selectedProvince.id] || []).length;
  }, [listenedByProvince, selectedProvince?.id]);

  // Main background video Youtube ID placeholder fallback
  const videoUrl = useMemo(() => {
    return cultures[0]?.youtubeId || 'cyJ9fpoYh_M';
  }, [cultures]);

  const localVideoUrl = useMemo(() => {
    if (!selectedProvince) return null;
    const PROVINCE_VIDEOS: Record<string, string> = {
      'diy': '/video/di-yogyakarta.mp4',
      'jawa-tengah': '/video/jawa-tengah.mp4',
      'kalimantan-barat': '/video/kalimantan-barat.mp4',
      'papua': '/video/papua.mp4',
    };
    return PROVINCE_VIDEOS[selectedProvince.id] || null;
  }, [selectedProvince]);

  if (!visible || !selectedProvince) return null;

  const handleExplore = () => {
    // Navigates to the clean list view without query filters
    selectCategory('Semua');
  };

  return (
    <div className="pd-container">
      {/* ── BACKGROUND VIDEO PLAYER LAYER ── */}
      <div className="pd-bg-video-container">
        {localVideoUrl ? (
          <video
            className="pd-bg-video-iframe"
            src={localVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: '#0D1B2A',
            overflow: 'hidden'
          }}>
            <img
              src={selectedProvince.heroImage || '/images/grain.webp'}
              alt={selectedProvince.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.3,
                filter: 'grayscale(0.2)'
              }}
            />
          </div>
        )}
        <div className="pd-bg-overlay" />
      </div>

      {/* ── TOP HEADER (Logo and Back button) ── */}
      <div className="pd-header">
        <div className="pd-logo">{isMobile ? 'PROVINSI' : 'NUSAPLAY — PROVINSI'}</div>
        <button className="pd-back-btn" onClick={backToMap}>
          <span>{isMobile ? '← KEMBALI' : '← KEMBALI KE PETA'}</span>
        </button>
      </div>

      {/* ── MAIN CENTER HERO ── */}
      <div className="pd-hero-content">
        <motion.h1
          className="pd-hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {selectedProvince.name}
          {isVisited && (
            <motion.span
              className="pd-stamp-seal"
              title="Stempel paspor provinsi ini telah dikoleksi!"
              style={{
                display: 'inline-block',
                marginLeft: '15px',
                fontSize: '0.6em',
                lineHeight: 1,
              }}
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 10 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 12 }}
            >
              {STAMP_SYMBOLS[selectedProvince.id] || '❈'}
            </motion.span>
          )}
        </motion.h1>

        <motion.p
          className="pd-hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {selectedProvince.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}
        >
          <motion.button
            ref={buttonRef}
            className="pd-hero-btn"
            onClick={handleExplore}
            animate={{
              x: magneticPos.x,
              y: magneticPos.y,
            }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 15,
              mass: 0.1,
            }}
          >
            Jelajahi Sekarang →
          </motion.button>

          {/* Progress Rings for the Province */}
          {totalCultures > 0 && (
            <motion.div
              className="pd-progress-container"
              onClick={handleExplore}
              whileHover={{ scale: 1.025, y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
              style={{ cursor: 'pointer' }}
            >
              <div className="pd-progress-item">
                {(() => {
                  const r = 26;
                  const circ = 2 * Math.PI * r;
                  const progress = visitedCount / totalCultures;
                  const dash = circ * progress;
                  return (
                    <svg width="68" height="68" viewBox="0 0 68 68" className="pd-progress-svg">
                      <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="4" />
                      <circle
                        cx="34" cy="34" r={r} fill="none"
                        stroke="#5591b9"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${dash} ${circ}`}
                        strokeDashoffset={0}
                        transform="rotate(-90 34 34)"
                        style={{ transition: 'stroke-dasharray 0.6s cubic-bezier(0.16,1,0.3,1)' }}
                      />
                      <text x="34" y="31" textAnchor="middle" className="pd-progress-num" style={{ fill: '#5591b9', fontSize: '12px', fontWeight: 300, fontFamily: "'Inter', sans-serif" }}>{visitedCount}</text>
                      <text x="34" y="44" textAnchor="middle" className="pd-progress-slash" style={{ fill: 'rgba(255, 255, 255, 0.35)', fontSize: '8px', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>/ {totalCultures}</text>
                    </svg>
                  );
                })()}
                <span className="pd-progress-label">Dikunjungi</span>
              </div>

              <div className="pd-progress-item">
                {(() => {
                  const r = 26;
                  const circ = 2 * Math.PI * r;
                  const progress = listenedCount / totalCultures;
                  const dash = circ * progress;
                  return (
                    <svg width="68" height="68" viewBox="0 0 68 68" className="pd-progress-svg">
                      <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="4" />
                      <circle
                        cx="34" cy="34" r={r} fill="none"
                        stroke="#c8a96e"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${dash} ${circ}`}
                        strokeDashoffset={0}
                        transform="rotate(-90 34 34)"
                        style={{ transition: 'stroke-dasharray 0.6s cubic-bezier(0.16,1,0.3,1)' }}
                      />
                      <text x="34" y="31" textAnchor="middle" className="pd-progress-num" style={{ fill: '#c8a96e', fontSize: '12px', fontWeight: 300, fontFamily: "'Inter', sans-serif" }}>{listenedCount}</text>
                      <text x="34" y="44" textAnchor="middle" className="pd-progress-slash" style={{ fill: 'rgba(255, 255, 255, 0.35)', fontSize: '8px', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>/ {totalCultures}</text>
                    </svg>
                  );
                })()}
                <span className="pd-progress-label">Didengar</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Spacer for Flex alignment */}
      <div style={{ height: '40px' }} />
    </div>
  );
};
