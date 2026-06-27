'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const PlayContext = createContext<any>({});

export const usePlay = () => useContext(PlayContext);

export const PlayProvider = ({ children }: { children: React.ReactNode }) => {
  const [play, setPlay] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const [end, setEnd] = useState(false);
  
  const [journeyStep, setJourneyStepState] = useState(1);
  const [journeyCompleted, setJourneyCompletedState] = useState(false);
  const [tourActive, setTourActive] = useState(false);

  // Sync state from localStorage on mount (client-side only to prevent SSR mismatch)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const step = localStorage.getItem('nusaplay:journey_step');
      if (step) {
        setJourneyStepState(parseInt(step, 10));
      }
      const completed = localStorage.getItem('nusaplay:journey_completed') === 'true';
      setJourneyCompletedState(completed);
    }
  }, []);

  const setJourneyStep = (step: number) => {
    setJourneyStepState(prev => {
      // Only allow forward progress
      if (step > prev) {
        localStorage.setItem('nusaplay:journey_step', String(step));
        return step;
      }
      return prev;
    });
  };

  const setJourneyCompleted = (completed: boolean) => {
    setJourneyCompletedState(completed);
    localStorage.setItem('nusaplay:journey_completed', String(completed));
  };

  return (
    <PlayContext.Provider value={{ 
      play, setPlay, 
      hasScroll, setHasScroll, 
      end, setEnd,
      journeyStep, setJourneyStep,
      journeyCompleted, setJourneyCompleted,
      tourActive, setTourActive
    }}>
      {children}
    </PlayContext.Provider>
  );
};
