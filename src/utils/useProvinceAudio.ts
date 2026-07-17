'use client';
import { useRef, useState, useEffect } from 'react';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';
import { usePathname } from 'next/navigation';

const PROVINCE_BACKSOUNDS: Record<string, string> = {
  diy: '/music/backsound/backsound-diy.m4a',
  'jawa-tengah': '/music/backsound/backsound-jateng.m4a',
  'kalimantan-barat': '/music/backsound/backsound-kalbar.m4a',
  papua: '/music/backsound/backsound-papua.m4a',
};

/**
 * useProvinceAudio — manages province background music lifecycle.
 *
 * Extracted from RootLayers.tsx to keep that component focused on layout only.
 * Responsibilities:
 * - Play the correct backsound track based on selectedProvince
 * - Duck volume during narration
 * - Retry on autoplay failure (browser policy)
 * - Clean up on unmount
 */
export function useProvinceAudio() {
  const { selectedProvince, phase, isAudioMuted } = useAppFlow();
  const pathname = usePathname();

  // BGM is allowed on all pages except the main splash page (/) and during the journey flight
  const isBgmAllowed = pathname !== '/' && phase !== PHASES.JOURNEY && phase !== PHASES.SPLASH;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<string | null>(null);
  // Remember the last visited province so BGM persists after returning to /map
  const lastProvinceIdRef = useRef<string>('jawa-tengah');
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [isNarrationPlaying, setIsNarrationPlaying] = useState(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  // ── Listen to narration events to control volume ducking ──────────────────
  useEffect(() => {
    const handleStart = () => setIsNarrationPlaying(true);
    const handleEnd = () => setIsNarrationPlaying(false);

    window.addEventListener('nusaplay:narrationStart', handleStart);
    window.addEventListener('nusaplay:narrationPause', handleEnd);
    window.addEventListener('nusaplay:narrationEnd', handleEnd);

    return () => {
      window.removeEventListener('nusaplay:narrationStart', handleStart);
      window.removeEventListener('nusaplay:narrationPause', handleEnd);
      window.removeEventListener('nusaplay:narrationEnd', handleEnd);
    };
  }, []);

  // ── Update volume when narration state or mute state changes ────────────────────────────
  useEffect(() => {
    if (audioRef.current) {
      if (isAudioMuted) {
        audioRef.current.volume = 0;
      } else {
        const isCulturePage = pathname?.startsWith('/culture/');
        audioRef.current.volume = isNarrationPlaying
          ? (isCulturePage ? 0.02 : 0.08)
          : 0.3;
      }
    }
  }, [isNarrationPlaying, pathname, isAudioMuted]);

  // ── Track selection & playback ────────────────────────────────────────────
  useEffect(() => {
    if (selectedProvince?.id) {
      lastProvinceIdRef.current = selectedProvince.id;
    }
    const activeProvinceId = lastProvinceIdRef.current;
    const targetTrack = isBgmAllowed ? (PROVINCE_BACKSOUNDS[activeProvinceId] || null) : null;

    if (targetTrack) {
      if (audioRef.current && currentTrackRef.current !== targetTrack) {
        const audioToPause = audioRef.current;
        if (playPromiseRef.current) {
          playPromiseRef.current.then(() => audioToPause.pause()).catch(() => {});
        } else {
          audioToPause.pause();
        }
        audioRef.current = null;
      }

      if (!audioRef.current) {
        audioRef.current = new Audio(targetTrack);
        audioRef.current.loop = true;
        if (isAudioMuted) {
          audioRef.current.volume = 0;
        } else {
          const isCulturePage = pathname?.startsWith('/culture/');
          audioRef.current.volume = isNarrationPlaying
            ? (isCulturePage ? 0.02 : 0.08)
            : 0.3;
        }
        currentTrackRef.current = targetTrack;
      }

      if (audioRef.current.paused) {
        const playPromise = audioRef.current.play();
        playPromiseRef.current = playPromise;

        playPromise
          .then(() => {
            if (playPromiseRef.current === playPromise) setAutoplayFailed(false);
          })
          .catch((err) => {
            if (err.name !== 'AbortError') {
              console.warn('Failed to play backsound, will retry on interaction:', err);
            }
            setAutoplayFailed(true);
          });
      }
    } else {
      if (audioRef.current) {
        const audioToPause = audioRef.current;
        if (playPromiseRef.current) {
          playPromiseRef.current.then(() => audioToPause.pause()).catch(() => {});
        } else {
          audioToPause.pause();
        }
        audioRef.current = null;
        currentTrackRef.current = null;
      }
      setAutoplayFailed(false);
    }
  }, [selectedProvince?.id, isBgmAllowed, isNarrationPlaying, pathname, isAudioMuted]);

  // ── Retry on user interaction if autoplay failed ──────────────────────────
  useEffect(() => {
    if (!autoplayFailed) return;

    const handleInteraction = () => {
      if (audioRef.current?.paused) {
        audioRef.current.play()
          .then(() => setAutoplayFailed(false))
          .catch((err) => console.warn('Retry backsound play failed:', err));
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [autoplayFailed]);

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);
}
