'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorText = textRef.current;
    if (!cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    let currentStyle = 'default';
    let lastTarget: HTMLElement | null = null;
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target === lastTarget) return;
      lastTarget = target;

      if (target.closest('.pd-bg-click-area')) {
        if (currentStyle !== 'explore') {
          currentStyle = 'explore';
          gsap.to(cursor, { width: 130, height: 130, backgroundColor: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.35)', backdropFilter: 'blur(10px)', duration: 0.4, overwrite: 'auto' });
          gsap.to(cursorText, { opacity: 1, scale: 1, duration: 0.4, overwrite: 'auto' });
          if (cursorText) { cursorText.innerText = 'EXPLORE'; cursorText.style.color = '#ffffff'; cursorText.style.fontSize = '9px'; cursorText.style.letterSpacing = '0.15em'; }
        }
      } else if (target.closest('.province-center-badge') || target.closest('.leaflet-marker-icon')) {
        if (currentStyle !== 'explore-badge') {
          currentStyle = 'explore-badge';
          gsap.to(cursor, { width: 68, height: 68, backgroundColor: 'var(--c-accent)', border: 'none', duration: 0.3, overwrite: 'auto' });
          gsap.to(cursorText, { opacity: 1, scale: 1, duration: 0.3, overwrite: 'auto' });
          if (cursorText) { cursorText.innerText = 'KLIK'; cursorText.style.color = '#0D1B2A'; cursorText.style.fontSize = '9px'; cursorText.style.letterSpacing = '0.15em'; }
        }
      } else if (target.closest('#nusaplay-leaflet-map') || target.closest('.cl-category-pills') || target.closest('.pd-thumbnails-row')) {
        if (currentStyle !== 'drag') {
          currentStyle = 'drag';
          gsap.to(cursor, { width: 56, height: 56, backgroundColor: 'rgba(27, 79, 156, 0.12)', border: '1px solid rgba(27, 79, 156, 0.4)', duration: 0.3, overwrite: 'auto' });
          gsap.to(cursorText, { opacity: 1, scale: 1, duration: 0.3, overwrite: 'auto' });
          if (cursorText) { cursorText.innerText = 'GESER'; cursorText.style.color = 'var(--c-accent)'; cursorText.style.fontSize = '8px'; cursorText.style.letterSpacing = '0.1em'; }
        }
      } else if (target.tagName.toLowerCase() === 'img' || target.closest('.cl-row-thumb') || target.closest('.cd-video-panel') || target.closest('.cursor-view')) {
        if (currentStyle !== 'view') {
          currentStyle = 'view';
          gsap.to(cursor, { width: 70, height: 70, backgroundColor: 'rgba(27, 79, 156, 0.95)', border: 'none', duration: 0.3, overwrite: 'auto' });
          gsap.to(cursorText, { opacity: 1, scale: 1, duration: 0.3, overwrite: 'auto' });
          if (cursorText) cursorText.innerText = 'VIEW';
        }
      } else if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('.nav-btn') || target.closest('.province-cat-row') || target.closest('.cd-audio-btn') || target.closest('svg')) {
        if (currentStyle !== 'interactive') {
          currentStyle = 'interactive';
          gsap.to(cursor, { width: 44, height: 44, backgroundColor: 'transparent', border: '1.5px solid #1B4F9C', duration: 0.3, overwrite: 'auto' });
          gsap.to(cursorText, { opacity: 0, scale: 0, duration: 0.3, overwrite: 'auto' });
        }
      } else {
        if (currentStyle !== 'default') {
          currentStyle = 'default';
          gsap.to(cursor, { width: 10, height: 10, backgroundColor: '#1B4F9C', border: 'none', duration: 0.3, overwrite: 'auto' });
          gsap.to(cursorText, { opacity: 0, scale: 0, duration: 0.3, overwrite: 'auto' });
        }
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{ position: 'fixed', top: 0, left: 0, width: 10, height: 10, borderRadius: '50%', pointerEvents: 'none', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', willChange: 'transform' }}
    >
      <span
        ref={textRef}
        style={{ fontSize: '9px', color: '#fff', fontWeight: 'bold', letterSpacing: '0.1em', opacity: 0, transform: 'scale(0)', pointerEvents: 'none' }}
      />
    </div>
  );
};
