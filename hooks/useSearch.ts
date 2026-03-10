'use client'

import { useState, useEffect } from 'react'
import {
  useSearchProductsLazyQuery,
  GetProductsQuery,
} from '@/graphql/generated/graphql'

type ProductEdge = NonNullable<GetProductsQuery['products']['edges']>[number]

const DEFAULT_SEARCH_COUNT = 12
const DEBOUNCE_DELAY = 300

export function useSearch(first = DEFAULT_SEARCH_COUNT) {
  const [query, setQuery] = useState('')

  const [search, { data, loading, error }] = useSearchProductsLazyQuery()

  useEffect(() => {
    if (!query.trim()) return

    const timer = setTimeout(() => {
      search({
        variables: { query, first },
      })
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(timer)
  }, [query, first, search])

  const results =
    data?.search?.edges?.flatMap((edge: ProductEdge) =>
      edge.node.__typename === 'Product' ? [edge.node] : []
    ) ?? []

  const totalCount = data?.search?.totalCount ?? 0
  const pageInfo = data?.search?.pageInfo

  const loadMore = () => {
    if (!pageInfo?.hasNextPage) return

    search({
      variables: {
        query,
        first,
        after: pageInfo.endCursor,
      },
    })
  }

  return {
    query,
    setQuery,
    results,
    totalCount,
    loading,
    error,
    hasNextPage: pageInfo?.hasNextPage ?? false,
    loadMore,
  }
}
