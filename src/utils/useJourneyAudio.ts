'use client';
import { useEffect, useRef } from 'react';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';

export function useJourneyAudio() {
  const { phase } = useAppFlow();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isFadingOutRef = useRef(false);

  const AUDIO_PATH = '/music/journey.mp3';

  const fadeAudio = (targetVolume: number, duration: number, callback?: () => void) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const audio = audioRef.current;
    const startVolume = audio.volume;
    const volumeDiff = targetVolume - startVolume;
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      audio.volume = Math.max(0, Math.min(1, startVolume + volumeDiff * progress));

      if (currentStep >= steps) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        audio.volume = targetVolume;
        if (callback) callback();
      }
    }, stepTime);
  };

  useEffect(() => {
    // ── Listen to ending events to fade out audio ─────────────────────────────
    const handleJourneyEnd = () => {
      if (isFadingOutRef.current) return;
      isFadingOutRef.current = true;
      // Natural transition: slow fade-out over 1.5s
      fadeAudio(0, 1500, () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      });
    };

    const handleJourneyEndImmediate = () => {
      if (isFadingOutRef.current) return;
      isFadingOutRef.current = true;
      // User skipped: fast fade-out over 500ms
      fadeAudio(0, 500, () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      });
    };

    window.addEventListener('nusaplay:journeyEnd', handleJourneyEnd);
    window.addEventListener('nusaplay:journeyEndImmediate', handleJourneyEndImmediate);

    return () => {
      window.removeEventListener('nusaplay:journeyEnd', handleJourneyEnd);
      window.removeEventListener('nusaplay:journeyEndImmediate', handleJourneyEndImmediate);
    };
  }, []);

  useEffect(() => {
    if (phase === PHASES.JOURNEY) {
      isFadingOutRef.current = false;
      
      if (!audioRef.current) {
        audioRef.current = new Audio(AUDIO_PATH);
      }
      
      const audio = audioRef.current;
      audio.volume = 0;
      audio.currentTime = 0;

      // Start playing and fade-in
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            fadeAudio(0.8, 800); // Fade in to 0.8 volume over 800ms
          })
          .catch(err => {
            console.warn('Autoplay blocked or narrator audio file missing at ' + AUDIO_PATH, err);
          });
      }
    }

    // Clean up if the phase changes and the audio is still playing
    return () => {
      if (phase === PHASES.JOURNEY && audioRef.current && !audioRef.current.paused) {
        if (!isFadingOutRef.current) {
          isFadingOutRef.current = true;
          // Just in case we transition away without events (e.g. menu click)
          fadeAudio(0, 1000, () => {
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
          });
        }
      }
    };
  }, [phase]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
}
