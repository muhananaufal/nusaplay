'use client';
import { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface PassportCtx {
  visitedProvinces: Set<string>;
  stampProvince: (provinceId: string) => void;
  visitCount: number;
}

const PassportContext = createContext<PassportCtx>({
  visitedProvinces: new Set(),
  stampProvince: () => {},
  visitCount: 0,
});

export const usePassport = () => useContext(PassportContext);

export const PassportProvider = ({ children }: { children: React.ReactNode }) => {
  const [visitedProvinces, setVisitedProvinces] = useState<Set<string>>(new Set());
  const [newStamp, setNewStamp] = useState<string | null>(null);

  const stampProvince = useCallback((provinceId: string) => {
    setVisitedProvinces(prev => {
      if (prev.has(provinceId)) return prev;
      const next = new Set(prev);
      next.add(provinceId);
      return next;
    });
    // Flash new stamp notification
    setNewStamp(provinceId);
    setTimeout(() => setNewStamp(null), 2500);
  }, []);

  const value = useMemo(() => ({
    visitedProvinces,
    stampProvince,
    visitCount: visitedProvinces.size,
    newStamp,
  }), [visitedProvinces, stampProvince, newStamp]);

  return (
    <PassportContext.Provider value={value as any}>
      {children}
    </PassportContext.Provider>
  );
};
