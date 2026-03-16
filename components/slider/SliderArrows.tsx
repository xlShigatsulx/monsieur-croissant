import { memo } from 'react'
import { NavigationDirection } from '@/types/slider'

interface SliderArrowsProps {
  onNavigate: (dir: NavigationDirection) => void
}

export const SliderArrows = memo(function SliderArrows({
  onNavigate,
}: SliderArrowsProps) {
  const buttonClassNames =
    'absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer'
  return (
    <>
      <button
        aria-label='Попередній слайд'
        onClick={() => onNavigate('prev')}
        className={`${buttonClassNames} left-3 sm:left-4`}
      >
        <ChevronIcon direction='left' />
      </button>

      <button
        aria-label='Наступний слайд'
        onClick={() => onNavigate('next')}
        className={`${buttonClassNames} right-3 sm:right-4`}
      >
        <ChevronIcon direction='right' />
      </button>
    </>
  )
})

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
    >
      {direction === 'left' ? (
        <path
          d='M10 13L5 8L10 3'
          stroke='white'
          strokeWidth='1.6'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      ) : (
        <path
          d='M6 3L11 8L6 13'
          stroke='white'
          strokeWidth='1.6'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      )}
    </svg>
  )
}
