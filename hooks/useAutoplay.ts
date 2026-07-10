import { useRef, useCallback, useEffect } from 'react';
import type { NavigationDirection } from '@/types/slider';
import { SLIDER_CONFIG } from '@/constants/slider';

export function useAutoplay(
  stepRef: React.RefObject<(dir: NavigationDirection) => void>,
  enabled: boolean = true,
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleRef = useRef<() => void>(() => {});

  const cancel = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const schedule = useCallback(() => {
    cancel();
    if (!enabled) return;
    timerRef.current = setTimeout(() => {
      stepRef.current('next');
      scheduleRef.current();
    }, SLIDER_CONFIG.autoplayMs);
  }, [cancel, stepRef, enabled]);

  useEffect(() => {
    scheduleRef.current = schedule;
  }, [schedule]);

  useEffect(() => {
    schedule();
    return cancel;
  }, [schedule, cancel]);

  const reset = useCallback(() => {
    cancel();
    schedule();
  }, [cancel, schedule]);

  return { reset };
}
