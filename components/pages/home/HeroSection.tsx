'use client'

import { useHeroData } from '@/hooks/useHeroData'
import { HeroSkeleton } from './HeroSkeleton'
import Link from 'next/link'

export function HeroSection() {
  const { data, loading } = useHeroData()

  if (loading) return <HeroSkeleton />
  if (!data) return null

  return (
    <div className='text-center py-12'>
      <p className='font-cormorant italic text-caramel/80 text-lg font-light mb-2'>
        смачна пекарня
      </p>
      <h1 className='font-cormorant italic text-4xl sm:text-6xl text-mocha font-semibold leading-tight mb-4'>
        {data.title}
      </h1>
      <div className='w-12 h-px bg-caramel/50 mx-auto mb-6' />
      <p className='text-mocha/70 text-base sm:text-lg leading-relaxed whitespace-pre-line max-w-md mx-auto mb-8'>
        {data.subtitle}
      </p>
      <Link
        href={data.buttonUrl || '/products'}
        className='inline-flex items-center gap-2 px-8 py-3 rounded-full
          border border-caramel/40 text-mocha text-sm tracking-wide
          hover:bg-caramel/8 hover:border-caramel
          transition-all duration-200'
      >
        {data.buttonLabel || 'Наші смаколики'}
      </Link>
    </div>
  )
}
