'use client'

import {
  useGetProductsQuery,
  GetProductsQuery,
} from '@/graphql/generated/graphql'

type ProductEdge = NonNullable<GetProductsQuery['products']['edges']>[number]

const DEFAULT_PRODUCTS_COUNT = 12

export function useProducts(first = DEFAULT_PRODUCTS_COUNT, after?: string) {
  const { data, loading, error, fetchMore } = useGetProductsQuery({
    variables: { first, after },
  })

  const products =
    data?.products?.edges?.map((edge: ProductEdge) => edge.node) ?? []
  const pageInfo = data?.products?.pageInfo

  const loadMore = () => {
    if (!pageInfo?.hasNextPage) return

    fetchMore({
      variables: {
        first,
        after: pageInfo.endCursor,
      },
    })
  }

  return {
    products,
    loading,
    error,
    hasNextPage: pageInfo?.hasNextPage ?? false,
    loadMore,
  }
}
