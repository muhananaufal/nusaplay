import type { Metadata } from 'next';
import { MapPageClient } from './_client';

export const metadata: Metadata = {
  title: 'Peta Budaya Indonesia',
  description: 'Jelajahi peta interaktif 34 provinsi Indonesia dan temukan kekayaan budaya Nusantara di setiap daerah.',
  openGraph: {
    title: 'Peta Budaya | NusaPlay',
    description: 'Peta interaktif warisan budaya Indonesia dari Sabang sampai Merauke.',
  },
};

export default function MapPage() {
  return <MapPageClient />;
}
