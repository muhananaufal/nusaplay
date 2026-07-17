import type { MetadataRoute } from 'next';
import { getCultures } from '@/data/cultures';
import { UNLOCKED_PROVINCES } from '@/data/provinces';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nusaplay.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const cultures = getCultures();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      priority: 1.0,
      changeFrequency: 'monthly',
    },
    {
      url: `${BASE_URL}/map`,
      priority: 0.9,
      changeFrequency: 'monthly',
    },
    {
      url: `${BASE_URL}/achievement`,
      priority: 0.5,
      changeFrequency: 'monthly',
    },
  ];

  const provinceRoutes: MetadataRoute.Sitemap = UNLOCKED_PROVINCES.flatMap((province) => [
    {
      url: `${BASE_URL}/province/${province.id}`,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      url: `${BASE_URL}/province/${province.id}/list`,
      priority: 0.7,
      changeFrequency: 'weekly' as const,
    },
  ]);

  const cultureRoutes: MetadataRoute.Sitemap = cultures.map((c) => ({
    url: `${BASE_URL}/culture/${c.id}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  const quizRoutes: MetadataRoute.Sitemap = UNLOCKED_PROVINCES.map((province) => ({
    url: `${BASE_URL}/quiz/${province.id}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticRoutes, ...provinceRoutes, ...cultureRoutes, ...quizRoutes];
}
