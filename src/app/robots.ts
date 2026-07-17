import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nusaplay.vercel.app';
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/map', '/quiz', '/journey', '/province/', '/culture/'],
      disallow: ['/_next/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
