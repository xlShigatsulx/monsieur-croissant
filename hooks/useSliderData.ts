import { useMemo } from 'react'
import { useGetCollectionByHandleQuery } from '@/graphql/generated/graphql'
import type { Slide } from '@/types/slider'

export function useSliderData() {
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
    }))
  }, [data])

  return { slides, loading, error }
}
