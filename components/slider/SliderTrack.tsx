import Image from 'next/image'
import type { Slide } from '@/types/slider'
import { SLIDER_CONFIG } from '@/constants/slider'
import { SliderCaption } from './SliderCaption'

interface SliderTrackProps {
  slides: Slide[]
  trackIndex: number
  isAnimated: boolean
}

export function SliderTrack({
  slides,
  trackIndex,
  isAnimated,
}: SliderTrackProps) {
  const track = [slides[slides.length - 1], ...slides, slides[0]]
  const total = track.length

  return (
    <div
      className='flex h-full'
      style={{
        width: `${total * 100}%`,
        transform: `translateX(-${(trackIndex * 100) / total}%)`,
        transition: isAnimated
          ? `transform ${SLIDER_CONFIG.transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`
          : 'none',
      }}
    >
      {track.map((slide, i) => (
        <div
          key={i}
          className='relative h-full'
          style={{ width: `${100 / total}%` }}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.altText}
            loading='eager'
            fill
            draggable={false}
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 768px'
            priority={i === 1}
          />

          <div
            className='absolute inset-0 pointer-events-none'
            style={{
              background:
                'linear-gradient(to top, rgba(30,14,8,0.72) 0%, rgba(30,14,8,0.18) 45%, transparent 75%)',
            }}
          />

          <SliderCaption
            title={slide.title}
            description={slide.description}
            price={slide.price}
          />
        </div>
      ))}
    </div>
  )
}
