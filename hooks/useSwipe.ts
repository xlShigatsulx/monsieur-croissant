import { useRef, useCallback, useEffect, RefObject } from 'react';
import type { NavigationDirection } from '@/types/slider';

const SWIPE_THRESHOLD = 50;
const SWIPE_MAX_VERTICAL = 80;

export function useSwipe<T extends HTMLElement>(
  containerRef: React.RefObject<T | null>,
  onSwipe: (dir: NavigationDirection) => void,
) {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (startX.current === null || startY.current === null) return;

      const dx = e.changedTouches[0].clientX - startX.current;
      const dy = e.changedTouches[0].clientY - startY.current;

      if (Math.abs(dy) > SWIPE_MAX_VERTICAL) return;

      if (Math.abs(dx) > SWIPE_THRESHOLD) {
        onSwipe(dx < 0 ? 'next' : 'prev');
      }

      startX.current = null;
      startY.current = null;
    },
    [onSwipe],
  );

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [containerRef, handleTouchStart, handleTouchEnd]);
}
