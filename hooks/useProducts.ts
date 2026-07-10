'use client';

import {
  useGetProductsQuery,
  GetProductsQuery,
} from '@/graphql/generated/graphql';
import { useShopifyLocale } from '@/lib/apollo/useShopifyQuery';
import { useEffect, useMemo } from 'react';

type ProductEdge = NonNullable<GetProductsQuery['products']['edges']>[number];

const DEFAULT_PRODUCTS_COUNT = 12;

export function useProducts(first = DEFAULT_PRODUCTS_COUNT) {
  const language = useShopifyLocale();

  const { data, loading, error, fetchMore } = useGetProductsQuery({
    variables: { first, language },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const products = useMemo(() => {
    const edges = data?.products?.edges ?? [];
    const seen = new Set<string>();
    return edges
      .map((edge: ProductEdge) => edge.node)
      .filter((node) => {
        if (seen.has(node.id)) return false;
        seen.add(node.id);
        return true;
      });
  }, [data]);

  const pageInfo = data?.products?.pageInfo;

  const loadMore = () => {
    if (!pageInfo?.hasNextPage) return;
    fetchMore({
      variables: { first, after: pageInfo.endCursor, language },
    });
  };

  return {
    products,
    loading,
    error,
    hasNextPage: pageInfo?.hasNextPage ?? false,
    loadMore,
  };
}
