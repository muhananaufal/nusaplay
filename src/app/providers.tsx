'use client';
import { AppFlowProvider } from '@/contexts/AppFlow';
import { PlayProvider } from '@/contexts/Play';
import { PassportProvider } from '@/contexts/Passport';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PlayProvider>
      <AppFlowProvider>
        <PassportProvider>
          {children}
        </PassportProvider>
      </AppFlowProvider>
    </PlayProvider>
  );
}
