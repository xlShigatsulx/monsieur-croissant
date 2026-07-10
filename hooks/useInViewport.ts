import { useEffect, useState, RefObject } from 'react';

export function useInViewport<T extends HTMLElement>(
  ref: RefObject<T | null>,
  threshold = 0.4,
) {
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isInView;
}
