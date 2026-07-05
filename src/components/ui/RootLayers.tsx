'use client';
import { useMemo, useEffect, useState, Suspense, useRef } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { usePlay } from '@/contexts/Play';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';
import { preloadMapAssets } from '@/utils/mapAssetLoader';
import { isWebGLAvailable } from '@/utils/webgl';
import { SplashOverlay } from '@/components/ui/SplashOverlay';
import { HUDCockpit } from '@/components/3d/HUDCockpit';

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
  const { phase, goTo, selectedProvince } = useAppFlow();
  const [modelProgress, setModelProgress] = useState(0);
  const pathname = usePathname();

  // BGM allowed on all pages except the main splash page (/)
  const isBgmAllowed = useMemo(() => {
    if (!pathname) return false;
    return pathname !== '/';
  }, [pathname]);

  // Track whether the map chunk has been requested yet, so we only mount
  // <MapView> after the user actually navigates to the map phase.
  const [mapEverActivated, setMapEverActivated] = useState(false);

  const isInJourney = phase === PHASES.SPLASH || phase === PHASES.JOURNEY;
  const isInMap = phase === PHASES.MAP;
  const isInProvince = phase === PHASES.PROVINCE;
  const mapVisible = isInMap || isInProvince;

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

  // ── Backsound player for provinces ─────────────────────────────────────────
  const PROVINCE_BACKSOUNDS: Record<string, string> = {
    diy: '/music/backsound/backsound-diy.m4a',
    'jawa-tengah': '/music/backsound/backsound-jateng.m4a',
    'kalimantan-barat': '/music/backsound/backsound-kalbar.m4a',
    papua: '/music/backsound/backsound-papua.m4a',
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<string | null>(null);
  // Remember the last visited province so BGM persists after returning to /map
  const lastProvinceIdRef = useRef<string>('jawa-tengah');
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [isNarrationPlaying, setIsNarrationPlaying] = useState(false);

  // Listen to narration events to control volume ducking
  useEffect(() => {
    const handleStart = () => setIsNarrationPlaying(true);
    const handleEnd = () => setIsNarrationPlaying(false);

    window.addEventListener('nusaplay:narrationStart', handleStart);
    window.addEventListener('nusaplay:narrationPause', handleEnd);
    window.addEventListener('nusaplay:narrationEnd', handleEnd);

    return () => {
      window.removeEventListener('nusaplay:narrationStart', handleStart);
      window.removeEventListener('nusaplay:narrationPause', handleEnd);
      window.removeEventListener('nusaplay:narrationEnd', handleEnd);
    };
  }, []);

  // Update volume when narration state changes
  useEffect(() => {
    if (audioRef.current) {
      const isCulturePage = pathname?.startsWith('/culture/');
      // Lower volume during narration (0.02 on culture pages, 0.08 on other pages), restore to 0.3 otherwise
      audioRef.current.volume = isNarrationPlaying
        ? (isCulturePage ? 0.02 : 0.08)
        : 0.3;
    }
  }, [isNarrationPlaying, pathname]);

  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    // Remember the last chosen province; fall back to it when selectedProvince is cleared
    if (selectedProvince?.id) {
      lastProvinceIdRef.current = selectedProvince.id;
    }
    const activeProvinceId = lastProvinceIdRef.current;
    const targetTrack = isBgmAllowed ? (PROVINCE_BACKSOUNDS[activeProvinceId] || null) : null;

    if (targetTrack) {
      // If a different track is already playing, stop it first
      if (audioRef.current && currentTrackRef.current !== targetTrack) {
        const audioToPause = audioRef.current;
        if (playPromiseRef.current) {
          playPromiseRef.current
            .then(() => {
              audioToPause.pause();
            })
            .catch(() => {});
        } else {
          audioToPause.pause();
        }
        audioRef.current = null;
      }

      if (!audioRef.current) {
        audioRef.current = new Audio(targetTrack);
        audioRef.current.loop = true;
        const isCulturePage = pathname?.startsWith('/culture/');
        audioRef.current.volume = isNarrationPlaying
          ? (isCulturePage ? 0.02 : 0.08)
          : 0.3;
        currentTrackRef.current = targetTrack;
      }

      const playPromise = audioRef.current.play();
      playPromiseRef.current = playPromise;

      playPromise
        .then(() => {
          if (playPromiseRef.current === playPromise) {
            setAutoplayFailed(false);
          }
        })
        .catch((err) => {
          // Ignore AbortError as it is a natural lifecycle event when swapping tracks quickly
          if (err.name !== 'AbortError') {
            console.warn('Failed to play backsound audio, will retry on interaction:', err);
          }
          setAutoplayFailed(true);
        });
    } else {
      // No backsound for this province or not on an allowed route, stop playback
      if (audioRef.current) {
        const audioToPause = audioRef.current;
        if (playPromiseRef.current) {
          playPromiseRef.current
            .then(() => {
              audioToPause.pause();
            })
            .catch(() => {});
        } else {
          audioToPause.pause();
        }
        audioRef.current = null;
        currentTrackRef.current = null;
      }
      setAutoplayFailed(false);
    }
  }, [selectedProvince?.id, isBgmAllowed, isNarrationPlaying, pathname]);

  // Retry playing on user interaction if autoplay failed
  useEffect(() => {
    if (!autoplayFailed) return;

    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setAutoplayFailed(false);
          })
          .catch((err) => {
            console.warn('Retry backsound play failed:', err);
          });
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [autoplayFailed]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <>
      {/* ── 3D Canvas layer — only mounted during splash/journey phases ── */}
      <div
        className="canvas-layer"
        style={{ opacity: isInJourney ? 1 : 0, pointerEvents: isInJourney ? 'all' : 'none' }}
      >
        <Suspense fallback={null}>
          {isInJourney && <CanvasContainer active={isInJourney} />}
        </Suspense>

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
          <Suspense fallback={null}>
            <MapView visible={mapVisible} />
          </Suspense>
        </div>
      )}
    </>
  );
}
