'use client';
import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const PlayContext = createContext<any>({});

export const usePlay = () => useContext(PlayContext);

export const PlayProvider = ({ children }: { children: React.ReactNode }) => {
  const [play, setPlay] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const [end, setEnd] = useState(false);
  
  const [journeyStep, setJourneyStepState] = useState(1);
  const [journeyCompleted, setJourneyCompletedState] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const [tourSelector, setTourSelector] = useState('');

  const setJourneyStep = useCallback((step: number) => {
    setJourneyStepState(prev => {
      // Only allow forward progress
      if (step > prev) {
        return step;
      }
      return prev;
    });
  }, []);

  const setJourneyCompleted = useCallback((completed: boolean) => {
    setJourneyCompletedState(completed);
  }, []);

  const value = useMemo(() => ({
    play, setPlay, 
    hasScroll, setHasScroll, 
    end, setEnd,
    journeyStep, setJourneyStep,
    journeyCompleted, setJourneyCompleted,
    tourActive, setTourActive,
    tourSelector, setTourSelector
  }), [play, hasScroll, end, journeyStep, journeyCompleted, tourActive, tourSelector, setJourneyStep, setJourneyCompleted]);

  return (
    <PlayContext.Provider value={value}>
      {children}
    </PlayContext.Provider>
  );
}
