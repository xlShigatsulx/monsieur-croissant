'use client'

import { useCallback } from 'react'
import { useSlider } from '@/hooks/useSlider'
import { SLIDES } from '@/constants/slider'
import { SliderTrack } from './SliderTrack'
import { SliderCounter } from './SliderCounter'
import { SliderArrows } from './SliderArrows'
import { SliderDots } from './SliderDots'
import type { NavigationDirection } from '@/types/slider'

export function Slider() {
  const { current, trackIndex, isAnimated, navigate, goTo, resetAutoplay } =
    useSlider()

  const handleNavigate = useCallback(
    (dir: NavigationDirection) => {
      navigate(dir)
      resetAutoplay()
    },
    [navigate, resetAutoplay]
  )

  const handleDotSelect = useCallback(
    (index: number) => {
      goTo(index)
      resetAutoplay()
    },
    [goTo, resetAutoplay]
  )

  return (
    <div className='w-full max-w-3xl'>
      <div
        className='relative rounded-2xl overflow-hidden select-none'
        style={{
          boxShadow:
            '0 32px 64px -12px rgba(58,35,24,0.25), 0 0 0 1px rgba(196,151,122,0.12)',
        }}
      >
        <div className='relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden bg-[#efe0d5]'>
          <SliderTrack
            slides={SLIDES}
            trackIndex={trackIndex}
            isAnimated={isAnimated}
          />
          <SliderCounter
            current={current}
            total={SLIDES.length}
          />
          <SliderArrows onNavigate={handleNavigate} />
        </div>
      </div>

      <SliderDots
        slides={SLIDES}
        current={current}
        onSelect={handleDotSelect}
      />
    </div>
  )
}

export default Slider
