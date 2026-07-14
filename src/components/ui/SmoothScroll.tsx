'use client';
import { useEffect } from 'react';
import 'locomotive-scroll/dist/locomotive-scroll.css';

/**
 * Custom hook to enable Locomotive Scroll v5 (smooth momentum scrolling)
 * on a specific container ref.
 * 
 * @param {React.RefObject<any>} ref - The container ref that has overflow-y: auto
 * @param {boolean} active - Turn smooth scrolling on/off dynamically
 */
export const useSmoothScroll = (ref: React.RefObject<any>, active = true) => {
  useEffect(() => {
    if (!active || !ref.current || typeof window === 'undefined' || window.innerWidth <= 768) return;

    let scrollInstance: any = null;

    // Small delay to ensure children layout and heights are computed
    const timeoutId = setTimeout(() => {
      if (!ref.current) return;
      
      import('locomotive-scroll')
        .then((module) => {
          const LocomotiveScroll = module.default;
          if (!ref.current) return;
          
          try {
            scrollInstance = new LocomotiveScroll({
              el: ref.current,
              lenisOptions: {
                wrapper: ref.current,
                // Target the scrollable content container
                content: ref.current.firstElementChild || ref.current,
                lerp: 0.07, // slightly smoother lerp for premium feel
                duration: 1.2,
                smoothWheel: true,
                syncTouch: true,
              }
            } as any);
          } catch (e) {
            console.error('Failed to initialize Locomotive Scroll:', e);
          }
        })
        .catch((err) => {
          console.error('Failed to load locomotive-scroll dynamically:', err);
        });
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      if (scrollInstance) {
        try {
          scrollInstance.destroy();
        } catch (e) {
          // ignore destroy errors on unmount
        }
      }
    };
  }, [ref, active]);
};
