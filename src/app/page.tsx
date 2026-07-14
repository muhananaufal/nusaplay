'use client';
import { useEffect } from 'react';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';

export default function SplashPage() {
  const { goTo } = useAppFlow();
  
  useEffect(() => {
    // Sync the context state with the current page's route
    goTo(PHASES.SPLASH, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
