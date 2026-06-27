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
  const gridRef = useRef(null);

  useSmoothScroll(gridRef, visible);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedProvince?.id, searchQuery, activeCategories, setCurrentPage]);

  const rawCultures = useMemo(() => {
    return selectedProvince ? getCulturesByProvince(selectedProvince.id) : [];
  }, [selectedProvince?.id]);

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
      {/* â”€â”€ LEFT PREVIEW COLUMN â”€â”€ */}
      <div className="cl-preview-panel">
        <div className="cl-rail-inner">
          <div className="cl-rail-overline">BUDAYA NUSANTARA</div>

          <div className="cl-rail-province">
            {selectedProvince?.name || 'Semua'}
          </div>

          <div className="cl-rail-counter">
            <span className="cl-rail-count-current">
              {String(Math.min(globalOffset + paginatedCultures.length, filteredCultures.length)).padStart(2, '0')}
            </span>
            <span className="cl-rail-count-divider">/</span>
            <span className="cl-rail-count-total">
              {String(filteredCultures.length).padStart(2, '0')}
            </span>
          </div>

        </div>

        {/* Dynamic description of the active culture */}
        {!isMobile && activeCulture && (
          <motion.div 
            key={`desc-${activeCulture.id}`}
            className="cl-preview-description-wrapper" 
            style={{ marginTop: '20px', padding: '0 4px' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h4 style={{ 
              fontSize: '0.95rem', 
              fontWeight: 500, 
              color: 'var(--c-accent)', 
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em' 
            }}>
              {activeCulture.title}
            </h4>
            <p style={{ 
              fontSize: '0.8rem', 
              color: 'var(--c-text-soft)', 
              lineHeight: 1.5,
              margin: 0
            }}>
              {activeCulture.description}
            </p>
          </motion.div>
        )}

        {/* Video preview container (shown on desktop only) */}
        {!isMobile && activeCulture && (
          <div className="cl-video-preview-container">
            <iframe
              key={activeCulture.id}
              src={`https://www.youtube.com/embed/${activeCulture.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${activeCulture.youtubeId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="cl-video-preview-iframe"
              title={activeCulture.title}
            />
            <div className="cl-video-preview-overlay" />
            <img
              src={`https://img.youtube.com/vi/${activeCulture.youtubeId}/sddefault.jpg`}
              alt={activeCulture.title}
              className="cl-video-preview-thumbnail"
              style={{
                opacity: iframeLoaded ? 0 : 1,
                pointerEvents: 'none',
              }}
            />
          </div>
        )}
      </div>

      {/* â”€â”€ RIGHT LIST PANEL â”€â”€ */}
      <div ref={gridRef} className="cl-list-panel">
        <div className="cl-list-scroll-container" style={{ width: '100%' }}>
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

            <div className="cl-category-pills">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  className={`cl-cat-pill ${activeCategories.includes(cat) ? 'active' : ''}`}
                  onClick={() => handleCategoryToggle(cat)}
                >
                  {cat}
                </button>
              ))}
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

// â”€â”€ CultureRow â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Wrapped in React.memo with isHovered boolean prop instead of raw hoveredId:
// only the entering and leaving row re-render on hover (2 renders instead of 10).
const CultureRow = memo(({ culture, index, listIndex, isHovered, setHoveredId, selectCulture }: any) => {
  const [transformOrigin, setTransformOrigin] = useState('center top');
  const Icon = getCategoryIcon(culture.category);

  // Stable callbacks â€” culture comes from static data (stable ref), selectCulture
  // and setHoveredId are stable references from context/useState setters.
  const handleClick = useCallback(() => selectCulture(culture), [selectCulture, culture]);

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
      {/* Title (left side) */}
      <h3 className="cl-row-title">
        {culture.title}
      </h3>

      {/* Row Right elements */}
      <div className="cl-row-right">
        {/* Category tag */}
        <span className="cl-row-category">
          <Icon size={12} />
          {culture.category}
        </span>

        {/* Inline thumbnail for mobile (hidden on desktop) */}
        <div className="cl-row-thumb-mobile">
          <img
            src={`https://img.youtube.com/vi/${culture.youtubeId}/mqdefault.jpg`}
            alt={culture.title}
            loading="lazy"
          />
        </div>

        {/* Index number */}
        <span className="cl-row-num">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  );
});

