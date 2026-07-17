'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROVINCES } from '@/data/provinces';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';
import { getMapAssetsReady } from '@/utils/mapAssetLoader';
import { useIsMobile } from '@/utils/useIsMobile';
import { usePassport } from '@/contexts/Passport';
import gsap from 'gsap';

declare const L: any;

// Province name matching from GeoJSON properties
const PROVINCE_NAME_MAP = {
  'Daerah Istimewa Yogyakarta': 'diy',
  'DI Yogyakarta': 'diy',
  'Yogyakarta': 'diy',
  'Kalimantan Barat': 'kalimantan-barat',
  'Papua': 'papua',
};

const getProvinceColor = (count) => {
  if (count < 12) {
    // Level 1: Biru Muda (Light Blue - very soft pastel ice-blue)
    return 'hsl(216, 45%, 85%)';
  } else if (count < 22) {
    // Level 2: Biru (Medium Blue - made darker and more saturated for maximum separation)
    return 'hsl(216, 80%, 44%)';
  } else {
    // Level 3: Biru Tua (Dark Blue - deep midnight navy)
    return 'hsl(216, 95%, 20%)';
  }
};

// Helper to calculate the true visual center of a GeoJSON feature (mainland centroid)
const getFeatureCenter = (feature, layer) => {
  try {
    if (feature.geometry.type === 'Polygon') {
      const coords = feature.geometry.coordinates[0];
      let latSum = 0, lngSum = 0;
      coords.forEach(c => {
        lngSum += c[0];
        latSum += c[1];
      });
      return [latSum / coords.length, lngSum / coords.length];
    } else if (feature.geometry.type === 'MultiPolygon') {
      // Find the polygon with the largest number of coordinates (the mainland)
      let maxCoords = [];
      feature.geometry.coordinates.forEach(poly => {
        const ring = poly[0];
        if (ring.length > maxCoords.length) {
          maxCoords = ring;
        }
      });
      if (maxCoords.length > 0) {
        let latSum = 0, lngSum = 0;
        maxCoords.forEach(c => {
          lngSum += c[0];
          latSum += c[1];
        });
        return [latSum / maxCoords.length, lngSum / maxCoords.length];
      }
    }
  } catch (e) {
    console.error("Error calculating centroid:", e);
  }
  
  // Fallback to Leaflet's bounding box center
  try {
    const center = layer.getBounds().getCenter();
    return [center.lat, center.lng];
  } catch {
    return null;
  }
};

// ── Optimised CountUp ──────────────────────────────────────────────────────
// Uses requestAnimationFrame + a DOM ref to write counter values directly,
// completely bypassing React's reconciler during the animation. The old
// setInterval + useState approach caused ~40 setState calls per counter,
// each triggering a React re-render of the whole MapView subtree.
const CountUp = ({ end, duration = 1.8, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const span = spanRef.current;
    if (!span) return;

    const startTime = performance.now();
    const durationMs = duration * 1000;
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = Math.min(now - startTime, durationMs);
      // ease-out quad
      const t = elapsed / durationMs;
      const eased = 1 - (1 - t) * (1 - t);
      const current = Math.floor(eased * end);
      span.textContent = current.toLocaleString('id-ID') + suffix;
      if (elapsed < durationMs) {
        rafId = requestAnimationFrame(tick);
      } else {
        span.textContent = end.toLocaleString('id-ID') + suffix;
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration, suffix]);

  return <span ref={spanRef}>0{suffix}</span>;
};


const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease' }}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a6 6 0 0 1 6 6v3.5a6 6 0 0 1-12 0V8a6 6 0 0 1 6-6z" />
  </svg>
);

export const MapView = ({ visible }) => {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const geoLayerRef = useRef(null);
  const layersMapRef = useRef({});
  const selectedProvinceRef = useRef(null);
  const markersGroupRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [deepZoomActive, setDeepZoomActive] = useState(false);
  const [isTilted, setIsTilted] = useState(false);
  const isMobile = useIsMobile(1024);
  const { selectProvince, selectedProvince, backToMap, selectCulture, goTo, phase } = useAppFlow();
  const { visitedProvinces } = usePassport();
  const achievementBtnRef = useRef<HTMLButtonElement>(null);
  const achievementXTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const achievementYTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useEffect(() => {
    const btn = achievementBtnRef.current;
    if (!btn) return;
    achievementXTo.current = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power2.out' });
    achievementYTo.current = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power2.out' });
  }, []);

  const handleAchievementMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = achievementBtnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    achievementXTo.current?.(x * 0.35);
    achievementYTo.current?.(y * 0.35);
  };

  const handleAchievementMouseLeave = () => {
    achievementXTo.current?.(0);
    achievementYTo.current?.(0);
  };

  const selectProvinceRef = useRef(selectProvince);
  const backToMapRef = useRef(backToMap);

  // Sync selectedProvince ref and control delayed tilt state
  useEffect(() => {
    selectedProvinceRef.current = selectedProvince;
    if (selectedProvince) {
      setDeepZoomActive(true);
      // Delay tilt until zoom is mostly done (1100ms)
      const timer = setTimeout(() => {
        setIsTilted(true);
      }, 1100);
      return () => clearTimeout(timer);
    } else {
      setDeepZoomActive(false);
      // Untilt immediately when deselected
      setIsTilted(false);
    }
  }, [selectedProvince]);

  useEffect(() => {
    selectProvinceRef.current = selectProvince;
    backToMapRef.current = backToMap;
  }, [selectProvince, backToMap]);

  // When the map becomes visible again (e.g. browser back button from a province page),
  // clear selectedProvince so the popup doesn't linger.
  useEffect(() => {
    if (visible && selectedProvinceRef.current && phase === PHASES.MAP) {
      backToMapRef.current(true); // skipPush=true: already on /map
    }
  }, [visible, phase]);

  useEffect(() => {
    (window as any).selectProvince = selectProvince;
    (window as any).selectCulture = selectCulture;
    (window as any).backToMap = backToMap;
    (window as any).goTo = goTo;
  }, [selectProvince, selectCulture, backToMap, goTo]);

  useEffect(() => {
    if (!visible) return;

    const container = document.getElementById('nusaplay-leaflet-map');
    if (!container || leafletMapRef.current) return;

    // Wait for Leaflet to be available
    const init = () => {
      if (typeof L === 'undefined') {
        setTimeout(init, 200);
        return;
      }

      // Initialize Leaflet map
      const map = L.map('nusaplay-leaflet-map', {
        center: [-2.5, 118],
        zoom: 5,
        zoomControl: false,
        scrollWheelZoom: true,
        attributionControl: false,
        minZoom: 4,
        maxZoom: 8,
        preferCanvas: true,
      });

      leafletMapRef.current = map;
      markersGroupRef.current = L.layerGroup().addTo(map);

      // Light ocean background tile (CartoDB Positron, no labels)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 10,
      }).addTo(map);

      // Load the Indonesia GeoJSON from the DevExpress stub
      const geoData = (window as any).DevExpress?.viz?.map?.sources?.indonesia;
      if (!geoData) {
        setMapReady(true);
        return;
      }

      // Per-feature match cache: matchProvince() does string normalization + regex +
      // Array.find on every call. By caching results keyed by feature name, each
      // feature is processed at most once instead of twice (style + onEachFeature).
      const featureMatchCache = {};
      const getMatchedProvince = (properties) => {
        const key = properties?.PROVINSI || properties?.name || '';
        if (key in featureMatchCache) return featureMatchCache[key];
        const result = matchProvince(properties);
        featureMatchCache[key] = result;
        return result;
      };

      // Style function
      const style = (feature) => {
        const prov = getMatchedProvince(feature.properties);
        if (prov) {
          const isUnlocked = prov.status === 'unlocked';
          return {
            fillColor: getProvinceColor(prov.cultureCount),
            fillOpacity: isUnlocked ? 0.85 : 0.7,
            color: isUnlocked ? '#ffffff' : '#B0C2D9',
            weight: isUnlocked ? 2.5 : 1.5,
            className: isUnlocked 
              ? `leaflet-province-unlocked province-unlocked-${prov.id}` 
              : `leaflet-province-locked province-locked-${prov.id}`,
          };
        }
        return {
          fillColor: '#0D1B2A', // Mascot Dark Navy
          fillOpacity: 0.12,    // Slightly darker for contrast
          color: '#CFD8E1',     // Cool slate blue border
          weight: 1.5,
        };
      };

      // Hover handlers
      const onEachFeature = (feature, layer) => {
        const prov = getMatchedProvince(feature.properties);
        if (prov) {
          layer._matchedProvince = prov; // cache for fast O(1) rendering lookups
          layersMapRef.current[prov.id] = layer;
        } else {
          layer._matchedProvince = null;
        }

        // Add class name to the SVG path element dynamically on mount
        const addPathClasses = () => {
          if (layer._path) {
            const isUnlocked = prov && prov.status === 'unlocked';
            layer._path.classList.add(isUnlocked ? 'leaflet-province-unlocked' : 'leaflet-province-locked');
            if (prov) {
              layer._path.classList.add(`province-${isUnlocked ? 'unlocked' : 'locked'}-${prov.id}`);
            }
          }
        };

        if (layer._path) {
          addPathClasses();
        } else {
          layer.on('add', addPathClasses);
        }

        layer.on({
          mouseover: (e) => {
            // Do not apply hover styles if a province is already selected
            if (selectedProvinceRef.current) return;

            const l = e.target;
            const tooltip = l._centerTooltip;
            if (tooltip) {
              const el = tooltip.getElement();
              if (el) el.classList.add('layer-hovered');
            }

            if (prov && prov.status === 'unlocked') {
              l.setStyle({
                fillOpacity: 0.95,
                color: '#0D1B2A',
                weight: 2.5,
              });
            } else {
              l.setStyle({ 
                fillOpacity: 0.85, // Highlight for locked provinces
                color: '#1B4F9C',   // Mascot Medium Blue border
                weight: 1.5,
              });
            }
          },
          mouseout: (e) => {
            // Do not reset styles to hover state if a province is already selected
            if (selectedProvinceRef.current) return;

            const l = e.target;
            const tooltip = l._centerTooltip;
            if (tooltip) {
              const el = tooltip.getElement();
              if (el) el.classList.remove('layer-hovered');
            }

            geoLayer.resetStyle(l);
          },
          click: (e) => {
            L.DomEvent.stopPropagation(e); // Stop leaflet click event from bubbling up to map
            if (prov && prov.status === 'unlocked') {
              selectProvinceRef.current(prov);
            }
          },
        });

        // Permanent center badge tooltip at the calculated visual mainland centroid
        const name = feature.properties?.PROVINSI || feature.properties?.name || '';
        const centerLatLng = getFeatureCenter(feature, layer);
        if (centerLatLng) {
          if (prov) {
            const isVisited = visitedProvinces.has(prov.id);
            const tooltip = L.tooltip({
              permanent: true,
              direction: 'center',
              className: 'leaflet-tooltip-province-badge'
            })
            .setLatLng(centerLatLng)
            .setContent(
              `<div class="province-center-badge ${prov.status} ${isVisited ? 'visited' : ''}" data-province-id="${prov.id}">
                <span class="badge-count">${prov.cultureCount}</span>
                ${isVisited ? '<span class="badge-star">★</span>' : ''}
                <div class="badge-hover-info">
                  <div class="hover-info-header">
                    <span class="province-title">${prov.name}</span>
                  </div>
                  <div class="hover-info-body">
                    <span class="culture-stat"><strong>${prov.cultureCount}</strong> Budaya Tersedia</span>
                  </div>
                  <span class="status-tag">${prov.status === 'unlocked' ? (isVisited ? 'Sudah Dikunjungi' : 'Jelajahi') : 'Segera Hadir'}</span>
                </div>
               </div>`
            );
            tooltip.addTo(map);
            layer._centerTooltip = tooltip;
          } else if (name) {
            const tooltip = L.tooltip({
              permanent: true,
              direction: 'center',
              className: 'leaflet-tooltip-province-badge'
            })
            .setLatLng(centerLatLng)
            .setContent(
              `<div class="province-center-badge locked">
                <span class="badge-count">0</span>
                <div class="badge-hover-info">
                  <div class="hover-info-header">
                    <span class="province-title">${name}</span>
                  </div>
                  <div class="hover-info-body">
                    <span class="culture-stat">Segera Hadir</span>
                  </div>
                  <span class="status-tag">SEGERA HADIR</span>
                </div>
               </div>`
            );
            tooltip.addTo(map);
            layer._centerTooltip = tooltip;
          }
        }
      };

      const geoLayer = L.geoJSON(geoData, {
        style,
        onEachFeature,
      }).addTo(map);

      geoLayerRef.current = geoLayer;

      // Fit to Indonesia bounds
      try {
        map.fitBounds(geoLayer.getBounds(), { padding: [20, 20] });
      } catch {}

      // Add map background click listener to close sidebar
      map.on('click', () => {
        if (selectedProvinceRef.current) {
          backToMapRef.current();
        }
      });

      setMapReady(true);
      setTimeout(() => {
        if (leafletMapRef.current) {
          leafletMapRef.current.invalidateSize();
        }
      }, 200);
    };

    let active = true;

    getMapAssetsReady().then(() => {
      if (active) {
        init();
      }
    });

    return () => {
      active = false;
      if (leafletMapRef.current) {
        try {
          leafletMapRef.current.stop(); // Stop any running panning/zooming animations
          leafletMapRef.current.remove();
        } catch (e) {
          console.warn('Error during map cleanup:', e);
        }
        leafletMapRef.current = null;
      }
      markersGroupRef.current = null;
    };
  }, [visible]);

  // Dynamically update map badges when visitedProvinces changes in the current session
  useEffect(() => {
    if (!mapReady) return;

    visitedProvinces.forEach(id => {
      const badgeEl = document.querySelector(`.province-center-badge[data-province-id="${id}"]`);
      if (badgeEl && !badgeEl.classList.contains('visited')) {
        badgeEl.classList.add('visited');
        
        const statusTag = badgeEl.querySelector('.status-tag');
        if (statusTag) {
          statusTag.textContent = 'Sudah Dikunjungi';
        }
        
        if (!badgeEl.querySelector('.badge-star')) {
          const starEl = document.createElement('span');
          starEl.className = 'badge-star';
          starEl.textContent = '★';
          const hoverInfo = badgeEl.querySelector('.badge-hover-info');
          if (hoverInfo) {
            badgeEl.insertBefore(starEl, hoverInfo);
          } else {
            badgeEl.appendChild(starEl);
          }
        }
      }
    });
  }, [visitedProvinces, mapReady]);

  // Effect to handle zooming and highlighting when selectedProvince changes
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map || !mapReady || !visible) return;

    try {
      map.stop(); // Stop any active zooming/flyTo before running new one
    } catch {}

    // Force size update to handle sidebar panel layout change
    map.invalidateSize();

    // Clear existing markers first
    if (markersGroupRef.current) {
      markersGroupRef.current.clearLayers();
    }

    let styleTimeoutId = null;

    if (selectedProvince) {
      // Disable interactions
      map.scrollWheelZoom.disable();
      map.doubleClickZoom.disable();
      map.dragging.disable();
      if (map.tap) map.tap.disable();
      if (map.touchZoom) map.touchZoom.disable();
      if (map.boxZoom) map.boxZoom.disable();
      if (map.keyboard) map.keyboard.disable();

      // 1. Zoom and fly to target center, centered for immersive transition
      const targetLayer = layersMapRef.current[selectedProvince.id];
      if (targetLayer) {
        const center = targetLayer.getBounds().getCenter();
        
        let targetZoom = 7;
        if (selectedProvince.id === 'diy') targetZoom = 9;
        if (selectedProvince.id === 'papua') targetZoom = 6;

        try {
          map.flyTo(center, targetZoom, {
            duration: 1.6,
            easeLinearity: 0.2
          });
        } catch {}
      }

      // 2. Dim all other provinces and highlight the active one
      styleTimeoutId = setTimeout(() => {
        if (geoLayerRef.current) {
          geoLayerRef.current.eachLayer((layer) => {
            const prov = layer._matchedProvince;
            if (prov && prov.id === selectedProvince.id) {
              layer.setStyle({
                fillColor: getProvinceColor(prov.cultureCount),
                fillOpacity: 0.9,
                color: '#ffffff',
                weight: 2.5,
              });
            } else {
              layer.setStyle({
                fillColor: '#0D1B2A',
                fillOpacity: 0.02,
                color: 'transparent',
                weight: 0,
              });
            }
          });
        }
      }, 1400);

    } else {
      // Enable interactions
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
      map.dragging.enable();
      if (map.tap) map.tap.disable();
      if (map.touchZoom) map.touchZoom.disable();
      if (map.boxZoom) map.boxZoom.disable();
      if (map.keyboard) map.keyboard.disable();

      // 4. Reset zoom and highlight styles
      if (geoLayerRef.current) {
        styleTimeoutId = setTimeout(() => {
          if (geoLayerRef.current) {
            geoLayerRef.current.resetStyle();
          }
        }, 1500);

        // Delay zoom-out flyTo until map has flattened (600ms)
        const zoomOutTimer = setTimeout(() => {
          if (leafletMapRef.current && geoLayerRef.current) {
            try {
              leafletMapRef.current.stop();
              leafletMapRef.current.flyToBounds(geoLayerRef.current.getBounds(), {
                padding: [30, 30],
                duration: 1.2
              });
            } catch {}
          }
        }, 600);

        return () => {
          clearTimeout(zoomOutTimer);
          if (styleTimeoutId) {
            clearTimeout(styleTimeoutId);
          }
        };
      }
    }

    return () => {
      if (styleTimeoutId) {
        clearTimeout(styleTimeoutId);
      }
    };
  }, [selectedProvince, mapReady, visible]);

  // Invalidate map size when visibility changes (avoids rendering shifts)
  useEffect(() => {
    const map = leafletMapRef.current;
    if (visible && map && mapReady) {
      const timer = setTimeout(() => {
        map.invalidateSize();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [visible, mapReady]);

  return (
    <motion.div
      className={`map-view-container ${isTilted ? 'tilted-view' : ''} ${deepZoomActive ? 'zoom-deep-view' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.0 }}
      style={{ display: visible ? 'flex' : 'none' }}
    >
      {/* Header */}
      <motion.div
        className="map-header"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: selectedProvince ? -120 : 0, opacity: selectedProvince ? 0 : 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className="map-header-left">
          <span className="map-logo">NusaPlay</span>
          <span className="map-tagline">Pilih provinsi untuk mulai menjelajah</span>
        </div>
        {/* Map legend (temporarily hidden)
        <div className="map-legend">
          <span className="legend-dot unlocked" />
          <span className="legend-label">Tersedia</span>
          <span className="legend-dot locked" />
          <span className="legend-label">Segera Hadir</span>
        </div>
        */}
      </motion.div>

      {/* Leaflet map */}
      <div id="nusaplay-leaflet-map" className="dx-map-container" />

      {/* Province quick-select chips (temporarily hidden)
      <motion.div
        className="map-province-hints"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: selectedProvince ? 120 : 0, opacity: selectedProvince ? 0 : 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {PROVINCES.filter(p => p.status === 'unlocked').map(p => (
          <button
            key={p.id}
            className="province-hint-chip"
            onClick={() => selectProvince(p)}
            style={{ borderColor: p.color }}
          >
            <span className="province-hint-dot" style={{ background: p.color }} />
            {p.name}
            <span className="province-hint-count">{p.cultureCount} budaya</span>
          </button>
        ))}
      </motion.div>
      */}

      {/* Floating title */}
      <motion.div
        className="map-floating-title"
        initial={{ y: 40, opacity: 0 }}
        animate={{ x: selectedProvince ? -400 : 0, opacity: selectedProvince ? 0 : 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <span className="editorial-num">THE ARCHIPELAGO</span>
        <h1>Peta <em>Budaya</em><br /><span>Nusantara</span></h1>
        {/* <p>38 Provinsi — 300+ Suku — 700+ Bahasa — 2000+ Warisan</p> */}

        {/* Animated Statistics Counters */}
        <div className="map-stats-dashboard">
          <div className="map-stat-item">
            <span className="map-stat-num"><CountUp end={38} /></span>
            <span className="map-stat-label">PROVINSI</span>
          </div>
          <div className="map-stat-item">
            <span className="map-stat-num"><CountUp end={300} suffix="+" /></span>
            <span className="map-stat-label">SUKU</span>
          </div>
          <div className="map-stat-item">
            <span className="map-stat-num"><CountUp end={700} suffix="+" /></span>
            <span className="map-stat-label">BAHASA</span>
          </div>
          <div className="map-stat-item">
            <span className="map-stat-num"><CountUp end={2000} suffix="+" /></span>
            <span className="map-stat-label">WARISAN</span>
          </div>
        </div>
      </motion.div>

      {/* Loading state */}
      {!mapReady && (
        <div className="map-loading">
          <div className="map-loading-spinner" />
          <span>Memuat peta Indonesia...</span>
        </div>
      )}

      {/* Floating Travel Achievement Trigger Button */}
      {!selectedProvince && mapReady && (
        <motion.button
          ref={achievementBtnRef}
          className="map-achievement-btn"
          onClick={() => goTo('achievement')}
          onMouseMove={handleAchievementMouseMove}
          onMouseLeave={handleAchievementMouseLeave}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
          aria-label="Buka Pencapaian"
        >
          <TrophyIcon />
        </motion.button>
      )}

      {/* Zoom controls for mobile view */}
      {isMobile && !selectedProvince && (
        <div className="map-zoom-controls">
          <button 
            className="map-zoom-btn zoom-in" 
            onClick={() => {
              if (leafletMapRef.current) leafletMapRef.current.zoomIn();
            }}
            aria-label="Zoom In"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button 
            className="map-zoom-btn zoom-out" 
            onClick={() => {
              if (leafletMapRef.current) leafletMapRef.current.zoomOut();
            }}
            aria-label="Zoom Out"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      )}
    </motion.div>
  );
};

// Match GeoJSON feature properties to our province data
function matchProvince(properties) {
  if (!properties) return null;
  
  // Standardize the name from GeoJSON
  let name = (properties.PROVINSI || properties.name || '').trim().toLowerCase();
  
  // Clean common variations
  name = name.replace(/\./g, ''); // remove dots, e.g. d.i. -> di
  name = name.replace(/\s+/g, ' '); // normalize spaces

  // Direct lookup map (case-insensitive keys)
  const LOCAL_PROVINCE_MAP = {
    'daerah istimewa yogyakarta': 'diy',
    'di yogyakarta': 'diy',
    'yogyakarta': 'diy',
    'kalimantan barat': 'kalimantan-barat',
    'papua': 'papua',
    'kepulauan bangka belitung': 'bangka-belitung',
    'bangka belitung': 'bangka-belitung',
    'kepulauan riau': 'kepulauan-riau',
    'dki jakarta': 'dki-jakarta',
    'daerah khusus ibukota jakarta': 'dki-jakarta',
    'jakarta': 'dki-jakarta',
    'papua barat daya': 'papua-barat-daya',
    'papua barat': 'papua-barat',
    'papua tengah': 'papua-tengah',
    'papua pegunungan': 'papua-pegunungan',
    'papua selatan': 'papua-selatan',
  };

  if (LOCAL_PROVINCE_MAP[name]) {
    const id = LOCAL_PROVINCE_MAP[name];
    return PROVINCES.find(p => p.id === id) || null;
  }

  // Exact match with standardized names
  const exactMatch = PROVINCES.find(p => {
    const pn = p.name.toLowerCase().replace(/\./g, '').trim();
    return pn === name;
  });

  if (exactMatch) return exactMatch;

  // Fallback slug match
  const slugMatch = PROVINCES.find(p => p.id === name.replace(/\s+/g, '-'));
  if (slugMatch) return slugMatch;

  return null;
}

// Static SVG paths for the HUD category icons
const STATIC_SVGS = {
  'Tarian': '<path d="M12 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 5.5l-2 4.5-2 5M10 7.5L7 5l-2-2M10 8.5l3 2.5 2-1M10 12l-4 6M10 12l2 5-2 4" />',
  'Musik': '<circle cx="6" cy="18" r="3" /><circle cx="16" cy="16" r="3" /><path d="M9 18V5l10-2v13M9 10l10-2" />',
  'Cerita Rakyat': '<path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20M3 6V22M20 3H6.5A2.5 2.5 0 004 5.5V17" />',
  'Senjata': '<path d="M14.5 17.5L3 6V3h3l11.5 11.5M17.5 14.5L6 3M3 21l18-18" />',
  'Rumah Adat': '<path d="M3 21h18M3 10l9-7 9 7M5 10v11M19 10v11M9 21v-8h6v8" />',
  'Pakaian Adat': '<path d="M6 3h12l3 9-3 9H6l-3-9 3-9zm6 0v18M3 12h18" />',
  'Kuliner': '<path d="M3 12h18M12 3v9M5 12v3a7 7 0 0014 0v-3M9 6v3M15 6v3" />',
  'Bahasa Daerah': '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />',
  'Kerajinan': '<path d="M12 22a10 10 0 100-20 10 10 0 000 20zM6 12a2 2 0 114 0 2 2 0 01-4 0zM14 12a2 2 0 114 0 2 2 0 01-4 0zM10 7a2 2 0 114 0 2 2 0 01-4 0zM10 17a2 2 0 114 0 2 2 0 01-4 0z" />',
  'Upacara Adat': '<path d="M4 21V9l8-6 8 6v12M12 3v18M8 12h8" />',
  'Batik': '<path d="M12 3L3 12l9 9 9-9-9-9zm0 0v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9" />',
  'Wayang': '<path d="M12 2L9 7l3 13 3-13-3-5zm0 0v18M5 12h14M8 16l4 2 4-2" />',
  'Bangunan Bersejarah': '<path d="M2 20h20M3 20V10l9-6 9 6v10M6 10v10M10 10v10M14 10v10M18 10v10" />',
};

const getStaticSvg = (category) => {
  const path = STATIC_SVGS[category] || '<circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18" />';
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 100%; height: 100%;">${path}</svg>`;
};

