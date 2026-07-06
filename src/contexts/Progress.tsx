'use client';
import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const ProgressContext = createContext<any>({});

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const [visitedByProvince, setVisitedByProvince] = useState<Record<string, string[]>>({});
  const [listenedByProvince, setListenedByProvince] = useState<Record<string, string[]>>({});

  const markCultureVisited = useCallback((id: string, provinceId: string) => {
    if (!id || !provinceId) return;
    setVisitedByProvince((prev) => {
      const list = prev[provinceId] || [];
      if (list.includes(id)) return prev;
      return {
        ...prev,
        [provinceId]: [...list, id],
      };
    });
  }, []);

  const markCultureListened = useCallback((id: string, provinceId: string) => {
    if (!id || !provinceId) return;
    setListenedByProvince((prev) => {
      const list = prev[provinceId] || [];
      if (list.includes(id)) return prev;
      return {
        ...prev,
        [provinceId]: [...list, id],
      };
    });
  }, []);

  const value = useMemo(() => ({
    visitedByProvince,
    listenedByProvince,
    markCultureVisited,
    markCultureListened,
  }), [visitedByProvince, listenedByProvince, markCultureVisited, markCultureListened]);

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
