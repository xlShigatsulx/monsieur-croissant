import { useGetProductByHandleQuery } from '@/graphql/generated/graphql';
import { useShopifyLocale } from '@/lib/apollo/useShopifyQuery';

export function useProductByHandle(handle: string) {
  const language = useShopifyLocale();

  const { data, loading, error } = useGetProductByHandleQuery({
    variables: { handle, language },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
  });

  return {
    product: data?.product,
    images: data?.product?.images.edges.map((e) => e.node) ?? [],
    variants: data?.product?.variants.edges.map((e) => e.node) ?? [],
    loading,
    error,
  };
}
