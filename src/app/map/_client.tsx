'use client';
import { useEffect } from 'react';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';

export function MapPageClient() {
  const { goTo } = useAppFlow();
  useEffect(() => { goTo(PHASES.MAP, true); }, [goTo]);
  return null;
}
