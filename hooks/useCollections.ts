import {
  GetCollectionsQuery,
  useGetCollectionsQuery,
} from '@/graphql/generated/graphql'
import { useShopifyLocale } from '@/lib/apollo/useShopifyQuery'
import { useMemo } from 'react'

type CollectionEdge = NonNullable<
  GetCollectionsQuery['collections']['edges']
>[number]

const DEFAULT_COLLECTIONS_COUNT = 12

export function useCollections(first = DEFAULT_COLLECTIONS_COUNT) {
  const language = useShopifyLocale()

  const { data, loading, error } = useGetCollectionsQuery({
    variables: { first, language },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  })

  const collections = useMemo(() => {
    if (!data?.collections?.edges) return []
    const seen = new Set<string>()
    return data.collections.edges
      .map((edge: CollectionEdge) => edge.node)
      .filter((node) => {
        if (seen.has(node.id)) return false
        seen.add(node.id)
        return true
      })
      .filter((collection) => collection.metafield?.value !== 'true')
  }, [data])

  return { collections, loading, error }
}
