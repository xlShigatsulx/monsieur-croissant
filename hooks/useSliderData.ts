import { useMemo } from 'react'
import type { Slide } from '@/types/slider'
import { useCollectionByHandle } from './useCollectionByHandle'

export function useSliderData() {
  const { products, loading, error } = useCollectionByHandle('hero-slider', 5)

  const slides: Slide[] = useMemo(() => {
    return products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description
        ? product.description.replace(/<[^>]*>/g, '')
        : '',
      imageUrl: product.images?.edges[0]?.node.url ?? '',
      altText: product.images?.edges[0]?.node.altText ?? product.title,
      ctaUrl: `/products/${product.handle}`,
      price: product.variants?.edges[0]?.node.price.amount,
    }))
  }, [products])

  return { slides, loading, error }
}
