import { useSliderState } from './useSliderState'
import { useAutoplay } from './useAutoplay'
import type { NavigationDirection } from '@/types/slider'

interface UseSliderReturn {
  current: number
  trackIndex: number
  isAnimated: boolean
  navigate: (dir: NavigationDirection) => void
  goTo: (index: number) => void
  resetAutoplay: () => void
}

export function useSlider({
  totalLength,
}: {
  totalLength: number
}): UseSliderReturn {
  const { current, trackIndex, isAnimated, stepRef, navigate, goTo } =
    useSliderState({ totalLength })
  const { reset: resetAutoplay } = useAutoplay(stepRef)

  return { current, trackIndex, isAnimated, navigate, goTo, resetAutoplay }
}
