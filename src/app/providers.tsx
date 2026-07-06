'use client';
import { AppFlowProvider } from '@/contexts/AppFlow';
import { PlayProvider } from '@/contexts/Play';
import { PassportProvider } from '@/contexts/Passport';
import { TransitionProvider } from '@/contexts/Transition';
import { ProgressProvider } from '@/contexts/Progress';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider>
      <TransitionProvider>
        <PlayProvider>
          <AppFlowProvider>
            <PassportProvider>
              {children}
            </PassportProvider>
          </AppFlowProvider>
        </PlayProvider>
      </TransitionProvider>
    </ProgressProvider>
  );
}
