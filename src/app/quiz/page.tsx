import type { Metadata } from 'next';
import { QuizPageClient } from './_client';

export const metadata: Metadata = {
  title: 'Kuis Budaya',
  description: 'Uji pengetahuanmu tentang budaya Nusantara dengan kuis interaktif dari berbagai provinsi Indonesia.',
  openGraph: {
    title: 'Kuis Budaya | NusaPlay',
    description: 'Uji pengetahuan budaya Nusantara-mu!',
  },
};

export default function QuizPage() {
  return <QuizPageClient />;
}
