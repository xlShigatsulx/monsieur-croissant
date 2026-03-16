import { useRef, useCallback, useEffect } from 'react'
import type { NavigationDirection } from '@/types/slider'
import { SLIDER_CONFIG } from '@/constants/slider'

export function useAutoplay(
  stepRef: React.RefObject<(dir: NavigationDirection) => void>
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancel = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const schedule = useCallback(() => {
    cancel()
    timerRef.current = setTimeout(() => {
      stepRef.current('next')
      schedule()
    }, SLIDER_CONFIG.autoplayMs)
  }, [cancel, stepRef])

  useEffect(() => {
    schedule()
    return cancel
  }, [])

  const reset = useCallback(() => {
    cancel()
    schedule()
  }, [cancel, schedule])

  return { reset }
}
