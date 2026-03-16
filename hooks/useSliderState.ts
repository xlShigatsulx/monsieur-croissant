import { useState, useRef, useCallback } from 'react'
import type { NavigationDirection } from '@/types/slider'
import { SLIDES, SLIDER_CONFIG } from '@/constants/slider'

interface UseSliderStateReturn {
  current: number
  trackIndex: number
  isAnimated: boolean
  stepRef: React.RefObject<(dir: NavigationDirection) => void>
  navigate: (dir: NavigationDirection) => void
  goTo: (index: number) => void
}

export function useSliderState(): UseSliderStateReturn {
  const total = SLIDES.length

  const currentRef = useRef(0)
  const trackIndexRef = useRef(1)
  const isJumping = useRef(false)

  const [current, setCurrent] = useState(0)
  const [trackIndex, setTrackIndex] = useState(1)
  const [isAnimated, setIsAnimated] = useState(true)

  const jumpToReal = useCallback(
    (realCurrent: number, realTrackIndex: number) => {
      setTimeout(() => {
        currentRef.current = realCurrent
        trackIndexRef.current = realTrackIndex
        isJumping.current = false
        setIsAnimated(false)
        setCurrent(realCurrent)
        setTrackIndex(realTrackIndex)
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setIsAnimated(true))
        )
      }, SLIDER_CONFIG.transitionMs)
    },
    []
  )

  const step = useCallback(
    (dir: NavigationDirection) => {
      if (isJumping.current) return

      const nextCurrent =
        dir === 'next'
          ? (currentRef.current + 1) % total
          : (currentRef.current - 1 + total) % total

      const nextTrackIndex =
        dir === 'next' ? trackIndexRef.current + 1 : trackIndexRef.current - 1

      currentRef.current = nextCurrent
      trackIndexRef.current = nextTrackIndex
      setCurrent(nextCurrent)
      setTrackIndex(nextTrackIndex)

      if (nextTrackIndex === total + 1) {
        isJumping.current = true
        jumpToReal(0, 1)
      } else if (nextTrackIndex === 0) {
        isJumping.current = true
        jumpToReal(total - 1, total)
      }
    },
    [total, jumpToReal]
  )

  const stepRef = useRef(step)
  stepRef.current = step

  const navigate = useCallback(
    (dir: NavigationDirection) => {
      step(dir)
    },
    [step]
  )

  const goTo = useCallback((index: number) => {
    if (isJumping.current) return
    currentRef.current = index
    trackIndexRef.current = index + 1
    setCurrent(index)
    setTrackIndex(index + 1)
  }, [])

  return { current, trackIndex, isAnimated, stepRef, navigate, goTo }
}
