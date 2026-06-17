import { useGetShopQuery } from '@/graphql/generated/graphql'
import { useShopifyLocale } from '@/lib/apollo/useShopifyQuery'

export function useShop() {
  const language = useShopifyLocale()

  const { data, loading, error } = useGetShopQuery({
    variables: { language },
    fetchPolicy: 'cache-and-network',
  })

  const shop = data?.shop
  const brand = shop?.brand

  return {
    shopName: shop?.name ?? 'Monsieur Croissant',
    description: shop?.description ?? '',
    slogan: brand?.slogan ?? '',
    shortDescription: brand?.shortDescription ?? '',
    logo: brand?.logo?.image ?? null,
    squareLogo: brand?.squareLogo?.image ?? null,
    colors: brand?.colors ?? null,
    loading,
    error,
  }
}
