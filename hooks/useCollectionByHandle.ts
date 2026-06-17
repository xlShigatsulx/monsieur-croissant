import { useGetCollectionByHandleQuery } from '@/graphql/generated/graphql'
import { useShopifyLocale } from '@/lib/apollo/useShopifyQuery'
import { useMemo } from 'react'

const DEFAULT_PRODUCTS_COUNT = 12

export function useCollectionByHandle(
  handle: string,
  first: number = DEFAULT_PRODUCTS_COUNT
) {
  const language = useShopifyLocale()

  const { data, loading, error, fetchMore } = useGetCollectionByHandleQuery({
    variables: { handle, first, language },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  })

  const collection = data?.collection ?? null

  const products = useMemo(() => {
    const edges = collection?.products?.edges ?? []
    const seen = new Set<string>()
    return edges
      .map((edge) => edge.node)
      .filter((node) => {
        if (seen.has(node.id)) return false
        seen.add(node.id)
        return true
      })
  }, [collection])

  const pageInfo = collection?.products?.pageInfo

  const loadMore = () => {
    if (!pageInfo?.hasNextPage) return
    fetchMore({
      variables: { handle, first, after: pageInfo.endCursor, language },
    })
  }

  return {
    collection,
    products,
    loading,
    error,
    hasNextPage: pageInfo?.hasNextPage ?? false,
    loadMore,
  }
}
