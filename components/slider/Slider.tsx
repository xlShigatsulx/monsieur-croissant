'use client'

import { useCallback, useMemo } from 'react'
import { useSlider } from '@/hooks/useSlider'
import { SliderTrack } from './SliderTrack'
import { SliderCounter } from './SliderCounter'
import { SliderArrows } from './SliderArrows'
import { SliderDots } from './SliderDots'
import type { NavigationDirection, Slide } from '@/types/slider'
import { useGetCollectionByHandleQuery } from '@/graphql/generated/graphql'
import { SliderCta } from './SliderCta'
import { SliderSkeleton } from './SliderSkeleton'

export function Slider() {
  const { data, loading, error } = useGetCollectionByHandleQuery({
    variables: { handle: 'hero-slider', first: 5 },
    fetchPolicy: 'cache-first',
  })

  const slides: Slide[] = useMemo(() => {
    if (!data?.collection?.products?.edges) return []

    return data.collection.products.edges.map((product) => ({
      id: product.node.id,
      title: product.node.title,
      description: product.node.description
        ? product.node.description.replace(/<[^>]*>/g, '')
        : '',
      imageUrl: product.node.images?.edges[0]?.node.url ?? '',
      altText:
        product.node.images?.edges[0]?.node.altText ?? product.node.title,
      ctaUrl: `/products/${product.node.handle}`,
      price: product.node.variants?.edges[0]?.node.price.amount,
      currencyCode: product.node.variants?.edges[0]?.node.price.currencyCode,
    }))
  }, [data])

  const { current, trackIndex, isAnimated, navigate, goTo, resetAutoplay } =
    useSlider({ totalLength: slides.length })

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

  if (loading) return <SliderSkeleton />

  if (error || slides.length === 0) return null

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
            slides={slides}
            trackIndex={trackIndex}
            isAnimated={isAnimated}
          />
          <SliderCounter
            current={current}
            total={slides.length}
          />
          <SliderArrows onNavigate={handleNavigate} />
        </div>
      </div>

      <SliderDots
        slides={slides}
        current={current}
        onSelect={handleDotSelect}
      />

      <SliderCta productLink={slides[current]?.ctaUrl} />
    </div>
  )
}

export default Slider
