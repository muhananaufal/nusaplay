'use client';
import { useEffect } from 'react';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';

export function JourneyPageClient() {
  const { goTo } = useAppFlow();
  useEffect(() => {
    goTo(PHASES.JOURNEY, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
