import type { Metadata } from 'next';
import { PROVINCES } from '@/data/provinces';
import { ProvincePageClient } from './_client';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const province = PROVINCES.find(p => p.id === id);
  if (!province) return { title: 'Provinsi' };
  return {
    title: province.name,
    description: province.description ||
      `Jelajahi kekayaan budaya ${province.name} — temukan tarian, musik, kuliner, dan warisan budaya khasnya.`,
    openGraph: {
      title: `${province.name} | NusaPlay`,
      description: province.description || `Eksplorasi budaya ${province.name}`,
    },
  };
}

export default async function ProvincePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProvincePageClient id={id} />;
}
