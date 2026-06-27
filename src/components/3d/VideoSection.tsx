'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MusikIcon, TarianIcon, GitarIcon } from '@/components/ui/PremiumIcons';

// 3 stops matching the 3 unlocked provinces: DIY, Papua, Kalimantan Barat
// Designed for a snappier 9-second flight journey
const JOURNEY_STOPS = [
  {
    id: 1,
    startAt: 1.0,
    endAt: 3.5,
    youtubeId: 'UEWCCkSZIY8',
    title: 'Gamelan Jawa',
    region: 'D.I. Yogyakarta',
    color: '#6f35cc',
    iconType: 'music',
  },
  {
    id: 2,
    startAt: 3.8,
    endAt: 6.3,
    youtubeId: 'TzKo3i7YZBA',
    title: 'Tari Yospan',
    region: 'Papua',
    color: '#ffad30',
    iconType: 'dance',
  },
  {
    id: 3,
    startAt: 6.6,
    endAt: 8.8,
    youtubeId: 'JxR3GAzm7h4',
    title: 'Musik Sape',
    region: 'Kalimantan Barat',
    color: '#55ab8f',
    iconType: 'guitar',
  },
];

export const VideoSection = ({ journeyStartTime }) => {
  const [activeStop, setActiveStop] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!journeyStartTime) return;

    const interval = setInterval(() => {
      const now = (Date.now() - journeyStartTime) / 1000;
      setElapsed(now);

      const active = JOURNEY_STOPS.find(s => now >= s.startAt && now <= s.endAt);
      setActiveStop(active || null);
    }, 100);

    return () => clearInterval(interval);
  }, [journeyStartTime]);

  return (
    <div className="video-section-overlay">
      <AnimatePresence mode="wait">
        {activeStop && (
          <motion.div
            key={activeStop.id}
            className="video-section-card"
            style={{ borderTop: `4px solid ${activeStop.color}` }}
            initial={{ opacity: 0, scale: 0.9, x: 50, y: 0 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 50 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Small YouTube Preview Frame inside card */}
            <div className="video-section-card-video">
              <iframe
                key={activeStop.youtubeId}
                src={`https://www.youtube.com/embed/${activeStop.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${activeStop.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                allow="autoplay; encrypted-media"
                title={activeStop.title}
              />
            </div>

            {/* Culture Info */}
            <div className="video-section-info">
              <span className="video-section-icon">
                {activeStop.iconType === 'music' && <MusikIcon size={22} />}
                {activeStop.iconType === 'dance' && <TarianIcon size={22} />}
                {activeStop.iconType === 'guitar' && <GitarIcon size={22} />}
              </span>
              <div>
                <p className="video-section-region">{activeStop.region}</p>
                <h3 className="video-section-title">{activeStop.title}</h3>
              </div>
            </div>

            {/* Tiny Progress Indicator */}
            <div className="video-section-dots">
              {JOURNEY_STOPS.map(stop => (
                <div
                  key={stop.id}
                  className={`video-section-dot ${stop.id === activeStop.id ? 'active' : ''}`}
                  style={stop.id === activeStop.id ? { background: activeStop.color } : {}}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

