import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import { RootLayers } from "@/components/ui/RootLayers";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NavigationMenu } from "@/components/ui/NavigationMenu";
import { PageTransitionOverlay } from "@/components/ui/PageTransitionOverlay";
import { MascotAssistant } from "@/components/ui/MascotAssistant";
import { JourneyProgress } from "@/components/ui/JourneyProgress";
import { JourneySpotlight } from "@/components/ui/JourneySpotlight";
import { NewStampCelebration } from "@/components/ui/NewStampCelebration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NusaPlay — Jelajahi Warisan Budaya Nusantara",
    template: "%s | NusaPlay",
  },
  description:
    "Platform eksplorasi interaktif 3D untuk mengenal kekayaan budaya Nusantara — tari, musik, kuliner, dan lebih dari 34 provinsi Indonesia.",
  keywords: ["budaya Indonesia", "warisan budaya", "nusantara", "tari tradisional", "musik daerah", "NusaPlay"],
  authors: [{ name: "NusaPlay Team" }],
  metadataBase: new URL("https://nusaplay.vercel.app"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "NusaPlay",
    title: "NusaPlay — Jelajahi Warisan Budaya Nusantara",
    description: "Jelajahi kekayaan budaya Indonesia melalui pengalaman interaktif 3D. Dari Sabang sampai Merauke.",
    images: [{ url: "/img/menu_about.webp", width: 800, height: 600, alt: "NusaPlay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NusaPlay — Jelajahi Warisan Budaya Nusantara",
    description: "Platform eksplorasi interaktif budaya Nusantara.",
    images: ["/img/menu_about.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0b0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* ── Preconnect to third-party origins used at runtime ───────────── */}
        {/* YouTube embeds (SplashOverlay, CultureList, CultureDetail, Experience) */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        {/* Leaflet map tiles (MapView) */}
        <link rel="preconnect" href="https://basemaps.cartocdn.com" />
        {/* DNS-prefetch as fallback for older browsers */}
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://basemaps.cartocdn.com" />
        {/* Prefetch self-hosted Leaflet ONLY after user starts journey (handled in RootLayers) */}
        {/* Prefetch hints removed — they caused double-downloads with the on-demand loaders */}
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <RootLayers />
          <CustomCursor />
          <JourneyProgress />
          <JourneySpotlight />
          <NewStampCelebration />
          {children}
          <NavigationMenu />
          <PageTransitionOverlay />
        </Providers>
      </body>
    </html>
  );
}
