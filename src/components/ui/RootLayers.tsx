'use client';
import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { usePlay } from '@/contexts/Play';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';
import { preloadMapAssets } from '@/utils/mapAssetLoader';
import { isWebGLAvailable } from '@/utils/webgl';
import { useProvinceAudio } from '@/utils/useProvinceAudio';
import { useJourneyAudio } from '@/utils/useJourneyAudio';
import { SplashOverlay } from '@/components/ui/SplashOverlay';
import { HUDCockpit } from '@/components/3d/HUDCockpit';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

const CanvasContainer = dynamic(
  () => import('@/components/3d/CanvasContainer').then(m => m.CanvasContainer),
  { ssr: false }
);

const MapView = dynamic(
  () => import('@/components/map/MapView').then(m => m.MapView),
  { ssr: false }
);

export function RootLayers() {
  const { play, end, setEnd } = usePlay();
  const { phase, goTo } = useAppFlow();
  const [modelProgress, setModelProgress] = useState(0);

  // Track whether the map chunk has been requested yet, so we only mount
  // <MapView> after the user actually navigates to the map phase.
  const [mapEverActivated, setMapEverActivated] = useState(false);

  const isInJourney = phase === PHASES.SPLASH || phase === PHASES.JOURNEY;
  const isInMap = phase === PHASES.MAP;
  const isInProvince = phase === PHASES.PROVINCE;
  const mapVisible = isInMap || isInProvince;

  // ── Province BGM — all audio logic lives in this hook ─────────────────────
  useProvinceAudio();

  // ── Journey Intro Narration — plays narrator audio during flight ─────────
  useJourneyAudio();

  // ── Track map activation so we never unmount it once mounted (Leaflet hates remounts)
  useEffect(() => {
    if (mapVisible && !mapEverActivated) {
      setMapEverActivated(true);
    }
  }, [mapVisible, mapEverActivated]);

  // ── Load airplane.glb via XHR ONCE — the <link rel="prefetch"> in layout.tsx
  //    warms the HTTP cache. The XHR here reads FROM that cache to track progress.
  //    Three.js's own loader will also read from cache, so there is no extra download.
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/models/airplane.glb', true);
    xhr.responseType = 'blob';

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        setModelProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => setModelProgress(100);
    xhr.onerror = () => setModelProgress(100); // Fallback

    xhr.send();
  }, []);

  // ── Listen for journey end events from Experience.tsx ──────────────────────
  useEffect(() => {
    const handler = () => {
      setTimeout(() => goTo(PHASES.MAP), 900);
    };
    const immediateHandler = () => goTo(PHASES.MAP);

    window.addEventListener('nusaplay:journeyEnd', handler);
    window.addEventListener('nusaplay:journeyEndImmediate', immediateHandler);
    return () => {
      window.removeEventListener('nusaplay:journeyEnd', handler);
      window.removeEventListener('nusaplay:journeyEndImmediate', immediateHandler);
    };
  }, [goTo]);

  const handleSkipJourney = () => {
    window.dispatchEvent(new CustomEvent('nusaplay:journeyEndImmediate'));
    setEnd(true);
  };

  // ── Preload map assets ONLY when the user is about to need the map ─────────
  // ── Previously this fired 1s after every splash mount — wasteful.
  //    New behaviour:
  //    • Start loading when the user clicks "Mulai Perjalanan" (JOURNEY phase)
  //    • If WebGL is unavailable and we jump straight to MAP, load immediately
  useEffect(() => {
    if (phase === PHASES.JOURNEY || phase === PHASES.MAP || phase === PHASES.PROVINCE) {
      preloadMapAssets();
    }
  }, [phase]);

  // ── Redirect to MAP if WebGL is unavailable ────────────────────────────────
  useEffect(() => {
    if (!isWebGLAvailable() && (phase === PHASES.SPLASH || phase === PHASES.JOURNEY)) {
      console.warn('WebGL not supported. Skipping 3D flight intro.');
      goTo(PHASES.MAP);
    }
  }, [phase, goTo]);

  return (
    <>
      {/* ── 3D Canvas layer — only mounted during splash/journey phases ── */}
      <div
        className="canvas-layer"
        style={{ opacity: isInJourney ? 1 : 0, pointerEvents: isInJourney ? 'all' : 'none' }}
      >
        <ErrorBoundary name="CanvasContainer">
          <Suspense fallback={null}>
            {isInJourney && <CanvasContainer active={isInJourney} />}
          </Suspense>
        </ErrorBoundary>

        {isInJourney && play && !end && (
          <button className="skip-journey-btn" onClick={handleSkipJourney}>
            Lewati Intro →
          </button>
        )}

        <HUDCockpit play={play} end={end} />

        {/* Splash overlay sits on top of the 3D canvas */}
        {isInJourney && <SplashOverlay progress={modelProgress} />}
      </div>

      {/* ── Persistent Interactive Map Layer ─────────────────────────────────
          Only mount <MapView> after the user first navigates to the map.
          The old code always mounted it (hidden via opacity:0) which caused:
          • MapView chunk download during the splash screen
          • Leaflet + GeoJSON loaded 1s after every page load (even on splash)
          Once mounted, keep it in the DOM (Leaflet doesn't survive remounts). */}
      {mapEverActivated && (
        <div
          className="map-layer"
          style={{
            opacity: mapVisible ? 1 : 0,
            pointerEvents: mapVisible ? 'all' : 'none',
            position: 'absolute',
            inset: 0,
            transition: 'opacity 0.8s ease',
            zIndex: 5,
          }}
        >
          <ErrorBoundary name="MapView">
            <Suspense fallback={null}>
              <MapView visible={mapVisible} />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
    </>
  );
}
