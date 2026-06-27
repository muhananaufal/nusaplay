import type { Metadata } from 'next';
import { JourneyPageClient } from './_client';

export const metadata: Metadata = {
  title: 'Perjalanan 3D',
  description: 'Mulai perjalanan udara 3D interaktif melintasi kepulauan Nusantara menuju peta budaya Indonesia.',
};

export default function JourneyPage() {
  return <JourneyPageClient />;
}
