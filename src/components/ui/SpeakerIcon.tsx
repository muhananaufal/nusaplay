'use client';
import { motion } from 'framer-motion';

interface SpeakerIconProps {
  isMuted: boolean;
  dark?: boolean;
}

export const SpeakerIcon = ({ isMuted, dark = false }: SpeakerIconProps) => {
  const wave = { duration: 0.28, ease: 'easeInOut' as const };
  const baseColor = dark ? 'rgba(13, 27, 42, 0.82)' : 'rgba(255, 255, 255, 0.82)';
  const muteColor = dark ? 'rgba(13, 27, 42, 0.45)' : 'rgba(255, 255, 255, 0.45)';
  const strokeColor = dark ? 'rgba(13, 27, 42, 0.82)' : 'rgba(255, 255, 255, 0.82)';
  const waveColor = dark ? 'rgba(13, 27, 42, 0.35)' : 'rgba(255, 255, 255, 0.35)';
  const xColor = dark ? 'rgba(13, 27, 42, 0.6)' : 'rgba(255, 255, 255, 0.6)';

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
      <path
        d="M11 5L6 9H2v6h4l5 4V5z"
        fill={isMuted ? muteColor : baseColor}
        style={{ transition: 'fill 0.28s ease' }}
      />
      <motion.path
        d="M15.54 8.46a5 5 0 0 1 0 7.07"
        stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none"
        initial={false}
        animate={{ pathLength: isMuted ? 0 : 1, opacity: isMuted ? 0 : 1 }}
        transition={wave}
      />
      <motion.path
        d="M19.07 4.93a10 10 0 0 1 0 14.14"
        stroke={waveColor} strokeWidth="1.5" strokeLinecap="round" fill="none"
        initial={false}
        animate={{ pathLength: isMuted ? 0 : 1, opacity: isMuted ? 0 : 1 }}
        transition={{ ...wave, delay: isMuted ? 0 : 0.06 }}
      />
      <motion.path
        d="M17 9 L23 15"
        stroke={xColor} strokeWidth="1.75" strokeLinecap="round" fill="none"
        initial={false}
        animate={{ pathLength: isMuted ? 1 : 0, opacity: isMuted ? 1 : 0 }}
        transition={{ ...wave, delay: isMuted ? 0.06 : 0 }}
      />
      <motion.path
        d="M23 9 L17 15"
        stroke={xColor} strokeWidth="1.75" strokeLinecap="round" fill="none"
        initial={false}
        animate={{ pathLength: isMuted ? 1 : 0, opacity: isMuted ? 1 : 0 }}
        transition={wave}
      />
    </svg>
  );
};
