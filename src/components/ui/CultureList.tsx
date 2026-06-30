'use client';
import { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCulturesByProvince } from '@/data/cultures';
import { useAppFlow, useListUI } from '@/contexts/AppFlow';
import { getCategoryIcon, SearchIcon } from './PremiumIcons';
import { useSmoothScroll } from './SmoothScroll';
import { useIsMobile } from '@/utils/useIsMobile';

export const CultureList = ({ visible }) => {
  const {
    selectedProvince,
    selectedCategory,
    selectCulture,
    visitedByProvince,
    listenedByProvince,
  } = useAppFlow();

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

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedProvince?.id, searchQuery, activeCategories, setCurrentPage]);

  const rawCultures = useMemo(() => {
    return selectedProvince ? getCulturesByProvince(selectedProvince.id) : [];
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
    return rawCultures.filter((c) => {
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
        <div className="cl-row-thumb-preview">
          <img
            src={`https://img.youtube.com/vi/${culture.youtubeId}/mqdefault.jpg`}
            alt={culture.title}
            loading="lazy"
            className="cl-row-thumb-img"
            style={{ opacity: isHovered ? 0 : 1 }}
          />
          {isHovered && (
            <iframe
              src={`https://www.youtube.com/embed/${culture.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${culture.youtubeId}&controls=0&playsinline=1&enablejsapi=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0`}
              allow="autoplay; encrypted-media"
              className="cl-row-thumb-iframe"
              title={culture.title}
            />
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

