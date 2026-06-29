'use client';
import { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface PassportCtx {
  visitedProvinces: Set<string>;
  completedQuizzes: Set<string>;
  stampProvince: (provinceId: string) => void;
  completeQuiz: (provinceId: string) => void;
  dismissStamp: () => void;
  visitCount: number;
  newStamp: string | null;
}

const PassportContext = createContext<PassportCtx>({
  visitedProvinces: new Set(),
  completedQuizzes: new Set(),
  stampProvince: () => {},
  completeQuiz: () => {},
  dismissStamp: () => {},
  visitCount: 0,
  newStamp: null,
});

export const usePassport = () => useContext(PassportContext);

export const PassportProvider = ({ children }: { children: React.ReactNode }) => {
  const [visitedProvinces, setVisitedProvinces] = useState<Set<string>>(new Set());
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<string>>(new Set());
  const [newStamp, setNewStamp] = useState<string | null>(null);

  const stampProvince = useCallback((provinceId: string) => {
    setVisitedProvinces(prev => {
      if (prev.has(provinceId)) return prev;
      const next = new Set(prev);
      next.add(provinceId);
      return next;
    });
    // Show full-page stamp celebration — dismissed manually
    setNewStamp(provinceId);
  }, []);

  const dismissStamp = useCallback(() => {
    setNewStamp(null);
  }, []);

  const completeQuiz = useCallback((provinceId: string) => {
    setCompletedQuizzes(prev => {
      if (prev.has(provinceId)) return prev;
      const next = new Set(prev);
      next.add(provinceId);
      return next;
    });
  }, []);

  const value = useMemo(() => ({
    visitedProvinces,
    completedQuizzes,
    stampProvince,
    completeQuiz,
    dismissStamp,
    visitCount: visitedProvinces.size,
    newStamp,
  }), [visitedProvinces, completedQuizzes, stampProvince, completeQuiz, dismissStamp, newStamp]);

  return (
    <PassportContext.Provider value={value as any}>
      {children}
    </PassportContext.Provider>
  );
};
