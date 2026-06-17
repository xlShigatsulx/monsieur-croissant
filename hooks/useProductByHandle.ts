import {
  GetProductByHandleQuery,
  useGetProductByHandleQuery,
} from '@/graphql/generated/graphql'
import { useShopifyLocale } from '@/lib/apollo/useShopifyQuery'

export function useProductByHandle(handle: string) {
  const language = useShopifyLocale()

  const { data, loading, error } = useGetProductByHandleQuery({
    variables: { handle, language },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  })

  const product = data?.product ?? null
  const images = product?.images.edges.map((edge) => edge.node) ?? []
  const variants = product?.variants.edges.map((edge) => edge.node) ?? []

  return { product, images, variants, loading, error }
}
