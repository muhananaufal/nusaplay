import type { Metadata } from 'next';
import { getCultureById, getCultures } from '@/data/cultures';
import { PROVINCES } from '@/data/provinces';
import { CultureDetailClient } from './_client';

export async function generateStaticParams() {
  // Pre-render all known culture pages at build time
  return getCultures().map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const culture = getCultureById(id);
  if (!culture) return { title: 'Budaya' };
  const province = PROVINCES.find(p => p.id === culture.provinceId);
  return {
    title: culture.title,
    description: culture.description ||
      `Pelajari tentang ${culture.title}, warisan budaya dari ${province?.name ?? 'Indonesia'}.`,
    openGraph: {
      title: `${culture.title} | NusaPlay`,
      description: culture.description || `${culture.title} — warisan budaya ${province?.name}`,
      images: culture.image ? [{ url: culture.image, alt: culture.title }] : [],
    },
  };
}

export default async function CultureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CultureDetailClient id={id} />;
}
