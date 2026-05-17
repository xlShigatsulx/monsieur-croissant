import { memo, useCallback } from 'react'
import type { Slide } from '@/types/slider'

interface SliderDotsProps {
  slides: Slide[]
  current: number
  onSelect: (index: number) => void
}

interface DotProps {
  slide: Slide
  index: number
  isActive: boolean
  onSelect: (index: number) => void
}

const Dot = memo(function Dot({ slide, index, isActive, onSelect }: DotProps) {
  const handleClick = useCallback(() => onSelect(index), [index, onSelect])

  return (
    <button
      role='tab'
      aria-selected={isActive}
      aria-label={`Слайд ${index + 1}: ${slide.title}`}
      onClick={handleClick}
      className='rounded-full transition-all duration-300 ease-out cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c4977a]
        hover:opacity-75'
      style={{
        width: isActive ? 28 : 8,
        height: 8,
        backgroundColor: isActive ? '#c4977a' : '#ddc5b5',
      }}
    />
  )
})

export const SliderDots = memo(function SliderDots({
  slides,
  current,
  onSelect,
}: SliderDotsProps) {
  return (
    <div
      className='flex items-center justify-center gap-2 mt-5'
      role='tablist'
      aria-label='Навігація по слайдах'
    >
      {slides.map((slide, i) => (
        <Dot
          key={slide.id}
          slide={slide}
          index={i}
          isActive={i === current}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
})
