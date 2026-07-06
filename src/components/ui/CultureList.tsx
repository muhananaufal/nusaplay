'use client';
import { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCulturesByProvince } from '@/utils/fetchCultures';
import { useAppFlow, useListUI } from '@/contexts/AppFlow';
import { useProgress } from '@/contexts/Progress';
import { getCategoryIcon, SearchIcon } from './PremiumIcons';
import { useSmoothScroll } from './SmoothScroll';
import { useIsMobile } from '@/utils/useIsMobile';

export const CultureList = ({ visible }) => {
  const {
    selectedProvince,
    selectedCategory,
    selectCulture,
  } = useAppFlow();

  const {
    visitedByProvince,
    listenedByProvince,
  } = useProgress();

  // Isolated list-UI context â€” changes here do NOT re-render NavigationMenu,
  // MapView, or any other component that only subscribes to AppFlowContext.
  const {
    searchQuery,
    setSearchQuery,
    activeCategories,
    setActiveCategories,
    currentPage,
    setCurrentPage,
    setTotalPages,
    totalPages,
  } = useListUI();

  // matchMedia-based â€” fires only when threshold is crossed, not every pixel
  const isMobile = useIsMobile(768);

  const [hoveredId, setHoveredId] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showMobileProgress, setShowMobileProgress] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasMoved = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      hasMoved.current = false;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeftStart.current = el.scrollLeft;
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      if (Math.abs(walk) > 5) {
        hasMoved.current = true;
      }
      el.scrollLeft = scrollLeftStart.current - walk;
    };

    const onMouseUpOrLeave = () => {
      isDragging.current = false;
      el.style.cursor = '';
      el.style.userSelect = '';
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseup', onMouseUpOrLeave);
    el.addEventListener('mouseleave', onMouseUpOrLeave);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseup', onMouseUpOrLeave);
      el.removeEventListener('mouseleave', onMouseUpOrLeave);
    };
  }, []);

  useSmoothScroll(gridRef, visible);

  const prevDepsRef = useRef({
    selectedCategory,
    provinceId: selectedProvince?.id,
    searchQuery,
    activeCategoriesStr: activeCategories.join(','),
  });

  useEffect(() => {
    const prev = prevDepsRef.current;
    const activeCategoriesStr = activeCategories.join(',');

    const changed =
      prev.selectedCategory !== selectedCategory ||
      prev.provinceId !== selectedProvince?.id ||
      prev.searchQuery !== searchQuery ||
      prev.activeCategoriesStr !== activeCategoriesStr;

    if (changed) {
      setCurrentPage(1);
      prevDepsRef.current = {
        selectedCategory,
        provinceId: selectedProvince?.id,
        searchQuery,
        activeCategoriesStr,
      };
    }
  }, [selectedCategory, selectedProvince?.id, searchQuery, activeCategories, setCurrentPage]);

  const [rawCultures, setRawCultures] = useState<any[]>([]);

  useEffect(() => {
    if (!selectedProvince?.id) { setRawCultures([]); return; }
    fetchCulturesByProvince(selectedProvince.id).then(setRawCultures);
  }, [selectedProvince?.id]);

  const currentVisitedIds = useMemo(() => {
    const list = visitedByProvince[selectedProvince?.id || ''] || [];
    return new Set(list);
  }, [visitedByProvince, selectedProvince?.id]);

  const currentListenedIds = useMemo(() => {
    const list = listenedByProvince[selectedProvince?.id || ''] || [];
    return new Set(list);
  }, [listenedByProvince, selectedProvince?.id]);

  const filteredCultures = useMemo(() => {
    const list = rawCultures.filter((c) => {
      const matchesCategory = activeCategories.includes('Semua') || activeCategories.includes(c.category);
      if (!matchesCategory) return false;
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        (c.title || '').toLowerCase().includes(query) ||
        (c.description || '').toLowerCase().includes(query) ||
        (c.location || '').toLowerCase().includes(query)
      );
    });

    // Pindahkan budaya yang memiliki audio ke urutan paling atas
    return [...list].sort((a, b) => {
      const hasAudioA = !!a.audio;
      const hasAudioB = !!b.audio;
      if (hasAudioA && !hasAudioB) return -1;
      if (!hasAudioA && hasAudioB) return 1;
      return 0;
    });
  }, [rawCultures, activeCategories, searchQuery]);

  const itemsPerPage = isMobile ? 5 : 10;
  const localTotalPages = Math.ceil(filteredCultures.length / itemsPerPage) || 1;

  useEffect(() => {
    setTotalPages(localTotalPages);
  }, [localTotalPages, setTotalPages]);

  useEffect(() => {
    if (currentPage > localTotalPages) setCurrentPage(localTotalPages);
  }, [filteredCultures.length, localTotalPages, currentPage, setCurrentPage]);

  const paginatedCultures = useMemo(() => {
    return filteredCultures.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredCultures, currentPage, itemsPerPage]);

  const activeCulture = useMemo(() => {
    if (filteredCultures.length === 0) return null;
    const found = filteredCultures.find(c => c.id === hoveredId);
    return found || paginatedCultures[0] || filteredCultures[0];
  }, [hoveredId, filteredCultures, paginatedCultures]);

  const availableCategories = useMemo(() => {
    return ['Semua', ...new Set(rawCultures.map(c => c.category))];
  }, [rawCultures]);

  // Count per category from raw (unfiltered) data
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'Semua': rawCultures.length };
    rawCultures.forEach(c => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, [rawCultures]);

  const handleCategoryToggle = (category) => {
    if (category === 'Semua') {
      setActiveCategories(['Semua']);
    } else {
      setActiveCategories((prev) => {
        const filtered = prev.filter((c) => c !== 'Semua');
        if (filtered.includes(category)) {
          const next = filtered.filter((c) => c !== category);
          return next.length === 0 ? ['Semua'] : next;
        } else {
          return [...filtered, category];
        }
      });
    }
  };

  useEffect(() => {
    setIframeLoaded(false);
    const timer = setTimeout(() => setIframeLoaded(true), 850);
    return () => clearTimeout(timer);
  }, [activeCulture?.id]);

  if (!visible) return null;

  const globalOffset = (currentPage - 1) * itemsPerPage;

  return (
    <motion.div
      className="cl-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={gridRef} className="cl-list-panel">
        <div className="cl-list-scroll-container" style={{ width: '100%' }}>
          {/* Province Title with total culture count */}
          <div className="cl-list-title-bar">
            <h1 className="cl-list-province-title">
              {selectedProvince?.name || 'Semua'}
              <span className="cl-list-province-count">
                {rawCultures.length} Budaya
              </span>
            </h1>
          </div>

          {/* Search input and category filter pills */}
          <div className="cl-list-header">
            <div className={`cl-search-wrapper ${searchQuery ? 'has-query' : ''}`}>
              <SearchIcon size={16} />
              <input
                type="text"
                placeholder="Cari warisan budaya..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="cl-search-clear" onClick={() => setSearchQuery('')}>&times;</button>
              )}
            </div>

            <div ref={scrollRef} className="cl-category-pills">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  className={`cl-cat-pill ${activeCategories.includes(cat) ? 'active' : ''}`}
                  onClick={() => {
                    if (hasMoved.current) {
                      hasMoved.current = false;
                      return;
                    }
                    handleCategoryToggle(cat);
                  }}
                >
                  {cat}
                  <span className="cl-cat-pill-count">{categoryCounts[cat] ?? 0}</span>
                </button>
              ))}
            </div>
            <div className="cl-drag-hint">
              <span>← Geser untuk melihat kategori lainnya →</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filteredCultures.length === 0 ? (
              <motion.div
                key="empty"
                className="cl-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="cl-empty-num">—</span>
                {rawCultures.length === 0 ? (
                  <p>Belum ada konten untuk kategori ini.</p>
                ) : (
                  <p>Tidak ada hasil untuk <em>"{searchQuery}"</em></p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key={`page-${currentPage}-${searchQuery}-${activeCategories.join(',')}`}
                className="cl-list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {paginatedCultures.map((culture, index) => {
                  const originalIndex = rawCultures.findIndex(c => c.id === culture.id);
                  const displayIndex = originalIndex !== -1 ? originalIndex : globalOffset + index;
                  return (
                    <CultureRow
                      key={culture.id}
                      culture={culture}
                      index={displayIndex}
                      listIndex={index}
                      // Pass isHovered boolean (not the whole hoveredId) so React.memo
                      // only re-renders the two rows that actually change state (the
                      // newly hovered row and the previously hovered one).
                      isHovered={hoveredId === culture.id}
                      setHoveredId={setHoveredId}
                      selectCulture={selectCulture}
                      isVisited={currentVisitedIds.has(culture.id)}
                      isListened={currentListenedIds.has(culture.id)}
                    />
                  );
                })}

                {/* Inline Page Pagination Controls */}
                {totalPages > 1 && (
                  <div className="cl-pagination">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      className="cl-page-arrow"
                    >
                      &larr; Prev
                    </button>
                    <span className="cl-page-indicator">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      className="cl-page-arrow"
                    >
                      Next &rarr;
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

// Helper to get a safe fallback map image for the province
const getProvinceFallbackImage = (provinceId: string) => {
  const map: Record<string, string> = {
    'diy': '/images/diy.webp',
    'kalimantan-barat': '/images/kalimantan-barat.webp',
    'papua': '/images/papua.webp',
    'jawa-tengah': '/images/diy.webp',
  };
  return map[provinceId] || '/images/grain.webp';
};

// ── CultureRow ──────────────────────────────────────────────────────────────────────────
// Wrapped in React.memo with isHovered boolean prop instead of raw hoveredId:
// only the entering and leaving row re-render on hover (2 renders instead of 10).
const CultureRow = memo(({ culture, index, listIndex, isHovered, setHoveredId, selectCulture, isVisited, isListened }: any) => {
  const [transformOrigin, setTransformOrigin] = useState('center top');
  const Icon = getCategoryIcon(culture.category);

  // Stable callbacks — culture comes from static data (stable ref), selectCulture
  // and setHoveredId are stable references from context/useState setters.
  const handleClick = useCallback(() => {
    selectCulture(culture);
  }, [selectCulture, culture]);

  const updateOrigin = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    setTransformOrigin(y < rect.height / 2 ? 'center top' : 'center bottom');
  }, []);

  const handleMouseEnter = useCallback((e) => {
    updateOrigin(e);
    setHoveredId(culture.id);
  }, [updateOrigin, setHoveredId, culture.id]);

  const handleMouseLeave = useCallback((e) => {
    updateOrigin(e);
    setHoveredId(null);
  }, [updateOrigin, setHoveredId]);

  return (
    <motion.div
      className={`cl-row ${isHovered ? 'hovered' : ''}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: listIndex * 0.03, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin }}
    >
      {/* Title + description (left side, stacked vertically) */}
      <div className="cl-row-left">
        <h3 className="cl-row-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {culture.title}
          {culture.audio && (
            <span className="cl-row-audio-badge" title="Narasi Suara Tersedia" style={{ display: 'inline-flex', color: isHovered ? '#ffffff' : 'var(--c-accent)', opacity: isHovered ? 1 : 0.85 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
              </svg>
            </span>
          )}
          {isVisited && (
            <span className={`cl-row-star ${isListened ? 'shimmering-gold' : 'bordered-gold'}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill={isListened ? "var(--c-accent)" : "none"} stroke="var(--c-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </span>
          )}
        </h3>
        {culture.description && (
          <p className="cl-row-desc">{culture.description}</p>
        )}
      </div>

      {/* Row Right elements */}
      <div className="cl-row-right">
        {/* Category tag */}
        <span className="cl-row-category">
          <Icon size={12} />
          {culture.category}
        </span>

        {/* Video preview thumbnail */}
        <div className="cl-row-thumb-preview" style={{ position: 'relative', overflow: 'hidden' }}>
          {!culture.audio ? (
            // Locked placeholder (No audio) - matching detail page
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              height: '100%',
              background: '#1F2D3D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={`https://img.youtube.com/vi/${culture.youtubeId}/mqdefault.jpg`}
                alt=""
                onError={(e) => {
                  const fallback = getProvinceFallbackImage(culture.provinceId);
                  (e.target as HTMLImageElement).src = fallback;
                }}
                style={{ 
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%', 
                  objectFit: 'cover', 
                  filter: 'grayscale(0.4) blur(1.5px)', 
                  opacity: 0.15 
                }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(13, 27, 42, 0.45)',
                zIndex: 2
              }}>
                {/* Padlock SVG */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))', opacity: 0.85 }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
            </div>
          ) : (
            // Playable Video preview
            <>
              {culture.video ? (
                <video
                  src={culture.video}
                  preload="metadata"
                  loop
                  muted
                  playsInline
                  className="cl-row-thumb-iframe"
                  style={{ objectFit: 'cover' }}
                  ref={(el) => {
                    if (el) {
                      if (isHovered) {
                        el.play().catch(() => {});
                      } else {
                        el.pause();
                        el.currentTime = 0;
                      }
                    }
                  }}
                />
              ) : (
                <img
                  src={culture.image || getProvinceFallbackImage(culture.provinceId)}
                  alt={culture.title}
                  loading="lazy"
                  className="cl-row-thumb-img"
                  style={{ 
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)', 
                    transition: 'transform 0.4s ease' 
                  }}
                  onError={(e) => {
                    const fallback = getProvinceFallbackImage(culture.provinceId);
                    (e.target as HTMLImageElement).src = fallback;
                  }}
                />
              )}
            </>
          )}
          {/* Transparent shield to capture all clicks and touch events */}
          <div className="cl-row-thumb-shield" />
        </div>

        {/* Index number */}
        <span className="cl-row-num">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  );
});

