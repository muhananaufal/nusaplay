import type { Metadata } from 'next';
import { PROVINCES, UNLOCKED_PROVINCES } from '@/data/provinces';
import { QuizActiveClient } from './_client';

export async function generateStaticParams() {
  return UNLOCKED_PROVINCES.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const province = PROVINCES.find(p => p.id === id);
  if (!province) return { title: 'Kuis' };
  return {
    title: `Kuis ${province.name}`,
    description: `Uji pengetahuanmu tentang budaya ${province.name} dengan kuis interaktif NusaPlay.`,
    openGraph: {
      title: `Kuis ${province.name} | NusaPlay`,
      description: `Berapa banyak yang kamu tahu tentang budaya ${province.name}?`,
    },
  };
}

export default async function QuizActivePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <QuizActiveClient id={id} />;
}
