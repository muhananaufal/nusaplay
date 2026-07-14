// Server-compatible JSON-LD structured data components
// Do NOT add 'use client' — these render as plain <script> tags on the server.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nusaplay.vercel.app';

export function CultureJsonLd({
  culture,
  provinceName,
}: {
  culture: any;
  provinceName: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: culture.title,
    description: culture.description,
    about: {
      '@type': 'Place',
      name: provinceName,
      addressCountry: 'ID',
    },
    inLanguage: 'id',
    publisher: {
      '@type': 'Organization',
      name: 'NusaPlay',
      url: SITE_URL,
    },
    ...(culture.image ? { image: `${SITE_URL}${culture.image}` } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NusaPlay',
    url: SITE_URL,
    description:
      'Jelajahi kekayaan budaya Indonesia melalui peta interaktif, konten edukatif, dan kuis menyenangkan bersama NusaPlay.',
    inLanguage: 'id',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/map?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NusaPlay',
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
