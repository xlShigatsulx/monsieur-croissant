import { memo, useCallback } from 'react'
import type { Slide } from '@/types/slider'
import { useTranslations } from 'next-intl'

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

export const SliderDots = memo(function SliderDots({
  slides,
  current,
  onSelect,
}: SliderDotsProps) {
  const t = useTranslations('slider')

  return (
    <div
      className='flex items-center justify-center gap-2 mt-5'
      role='tablist'
      aria-label={t('dots')}
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

const Dot = memo(function Dot({ slide, index, isActive, onSelect }: DotProps) {
  const t = useTranslations('slider')

  const handleClick = useCallback(() => onSelect(index), [index, onSelect])

  return (
    <button
      role='tab'
      aria-selected={isActive}
      aria-label={t('dot', { index: index + 1, title: slide.title })}
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
