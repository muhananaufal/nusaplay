'use client';
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';

const TransitionContext = createContext<any>({});

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [startPathname, setStartPathname] = useState<string | null>(null);

  // Turn off loading transition curtain when the route pathname actually changes
  useEffect(() => {
    if (isTransitioning && startPathname !== null && pathname !== startPathname) {
      setTransitionProgress(100);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setStartPathname(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, isTransitioning, startPathname]);

  // Trickle load simulation
  useEffect(() => {
    if (!isTransitioning) {
      setTransitionProgress(0);
      return;
    }

    setTransitionProgress(5); // initial jump

    const interval = setInterval(() => {
      setTransitionProgress((prev) => {
        if (prev >= 90) {
          return Math.min(prev + 0.1, 95);
        }
        if (prev >= 70) {
          return prev + 1.2;
        }
        return prev + 4;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  // Fallback safety timer to auto-dismiss loading overlay after 4s (e.g. if navigation fails or stays on same page)
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setStartPathname(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Popstate history listener to trigger transition curtain
  useEffect(() => {
    const handlePopState = () => {
      setStartPathname(pathname);
      setIsTransitioning(true);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pathname]);

  // Delay actual route navigation by 550ms so the transition curtain fully covers screen first
  const triggerNavigation = useCallback((navAction: () => void) => {
    setStartPathname(pathname);
    setIsTransitioning(true);
    setTimeout(() => {
      navAction();
    }, 550);
  }, [pathname]);

  const value = useMemo(() => ({
    isTransitioning,
    transitionProgress,
    setIsTransitioning,
    triggerNavigation,
  }), [isTransitioning, transitionProgress, triggerNavigation]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
};
