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

    console.log(`[JourneyAudio] Starting fade to ${targetVolume} over ${duration}ms`);
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
        console.log(`[JourneyAudio] Fade completed. Final volume: ${audio.volume}`);
        if (callback) callback();
      }
    }, stepTime);
  };

  useEffect(() => {
    console.log('[JourneyAudio] Registering event listeners');
    // ── Listen to ending events to fade out audio ─────────────────────────────
    const handleJourneyEnd = () => {
      console.log('[JourneyAudio] Received Event: nusaplay:journeyEnd');
      if (isFadingOutRef.current) return;
      isFadingOutRef.current = true;
      // Natural transition: slow fade-out over 1.5s
      fadeAudio(0, 1500, () => {
        if (audioRef.current) {
          console.log('[JourneyAudio] Event End callback: Pausing audio');
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      });
    };

    const handleJourneyEndImmediate = () => {
      console.log('[JourneyAudio] Received Event: nusaplay:journeyEndImmediate');
      if (isFadingOutRef.current) return;
      isFadingOutRef.current = true;
      // User skipped: fast fade-out over 500ms
      fadeAudio(0, 500, () => {
        if (audioRef.current) {
          console.log('[JourneyAudio] Event Skip callback: Pausing audio');
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      });
    };

    window.addEventListener('nusaplay:journeyEnd', handleJourneyEnd);
    window.addEventListener('nusaplay:journeyEndImmediate', handleJourneyEndImmediate);

    return () => {
      console.log('[JourneyAudio] Cleaning up event listeners');
      window.removeEventListener('nusaplay:journeyEnd', handleJourneyEnd);
      window.removeEventListener('nusaplay:journeyEndImmediate', handleJourneyEndImmediate);
    };
  }, []);

  const hasEndedRef = useRef(false);

  useEffect(() => {
    console.log(`[JourneyAudio] Phase changed: ${phase}`);
    if (phase === PHASES.JOURNEY) {
      hasEndedRef.current = false;
      isFadingOutRef.current = false;
      
      if (!audioRef.current) {
        audioRef.current = new Audio(AUDIO_PATH);
        audioRef.current.loop = false;
      }
      
      const audio = audioRef.current;
      audio.loop = false;
      audio.volume = 0;
      audio.currentTime = 0;

      const handleEnded = () => {
        console.log('[JourneyAudio] Event: audio ended naturally');
        hasEndedRef.current = true;
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };

      audio.addEventListener('ended', handleEnded);

      console.log('[JourneyAudio] Triggering play()');
      // Start playing and fade-in
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('[JourneyAudio] play() successful, starting fade-in');
            if (!hasEndedRef.current) {
              fadeAudio(0.8, 800); // Fade in to 0.8 volume over 800ms
            }
          })
          .catch(err => {
            console.warn('[JourneyAudio] play() failed/blocked:', err);
          });
      }

      return () => {
        console.log('[JourneyAudio] Cleaning up phase effect (ended listener)');
        audio.removeEventListener('ended', handleEnded);
      };
    }

    // Clean up if the phase changes and the audio is still playing
    return () => {
      console.log(`[JourneyAudio] Cleanup running. Current phase inside closure: ${phase}`);
      if (phase === PHASES.JOURNEY && audioRef.current && !audioRef.current.paused) {
        if (!isFadingOutRef.current) {
          isFadingOutRef.current = true;
          console.log('[JourneyAudio] Phase change cleanup: starting fade out');
          // Just in case we transition away without events (e.g. menu click)
          fadeAudio(0, 1000, () => {
            if (audioRef.current) {
              console.log('[JourneyAudio] Phase change cleanup callback: Pausing audio');
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
