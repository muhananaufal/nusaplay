// ── Map Asset Loader ──────────────────────────────────────────────────────────
// Loads Leaflet and the Indonesia GeoJSON lazily, only once.
//
// Performance notes:
// • Leaflet JS + CSS are now self-hosted under /public/js/leaflet/ so they
//   are served from the same origin, benefit from long-lived Cache-Control
//   headers (set in next.config.ts), and avoid CDN cold-start latency from
//   unpkg.com on first load.
// • A single Promise is cached so concurrent callers share the same load.
// • Link/script elements are reused if already injected (idempotent).

let loadPromise: Promise<void> | null = null;

export const preloadMapAssets = (): Promise<void> => {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    // ── 1. Self-hosted Leaflet CSS (no CDN round-trip) ────────────────────
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      // Served from /public/js/leaflet/leaflet.css — cached 1 year by next.config.ts
      link.href = '/js/leaflet/leaflet.css';
      document.head.appendChild(link);
    }

    // ── 2. Self-hosted Leaflet JS ─────────────────────────────────────────
    const loadLeafletJS = (): Promise<void> => {
      if ((window as any).L) return Promise.resolve();
      return new Promise<void>((res, rej) => {
        const script = document.createElement('script');
        // Served from /public/js/leaflet/leaflet.js — cached 1 year by next.config.ts
        script.src = '/js/leaflet/leaflet.js';
        script.async = true;
        script.onload = () => res();
        script.onerror = rej;
        document.head.appendChild(script);
      });
    };

    // ── 3. Indonesia GeoJSON (local, unchanged) ───────────────────────────
    const loadGeoJSON = (): Promise<void> => {
      const w = window as any;
      w.DevExpress = w.DevExpress || {};
      w.DevExpress.viz = w.DevExpress.viz || {};
      w.DevExpress.viz.map = w.DevExpress.viz.map || {};
      w.DevExpress.viz.map.sources = w.DevExpress.viz.map.sources || {};

      if (w.DevExpress.viz.map.sources.indonesia) return Promise.resolve();

      return new Promise<void>((res, rej) => {
        const script = document.createElement('script');
        script.src = '/js/devexpress/indonesia.js';
        script.async = true;
        script.onload = () => res();
        script.onerror = rej;
        document.head.appendChild(script);
      });
    };

    Promise.all([loadLeafletJS(), loadGeoJSON()])
      .then(() => resolve())
      .catch((err) => {
        console.error('Failed to preload map assets:', err);
        reject(err);
      });
  });

  return loadPromise;
};

export const getMapAssetsReady = (): Promise<void> => {
  return loadPromise || preloadMapAssets();
};
