import { memo } from 'react'

interface SliderCounterProps {
  current: number
  total: number
}

export const SliderCounter = memo(function SliderCounter({
  current,
  total,
}: SliderCounterProps) {
  return (
    <div className='absolute top-4 right-4 sm:top-5 sm:right-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 z-10'>
      <span className='text-white/90 text-[11px] tracking-widest'>
        {String(current + 1).padStart(2, '0')} /{' '}
        {String(total).padStart(2, '0')}
      </span>
    </div>
  )
})
