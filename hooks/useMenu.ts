import { useGetMenuQuery } from '@/graphql/generated/graphql'
import { useShopifyLocale } from '@/lib/apollo/useShopifyQuery'

export function useMenu(handle = 'main-menu') {
  const language = useShopifyLocale()

  const { data, loading } = useGetMenuQuery({
    variables: { handle, language },
    fetchPolicy: 'cache-and-network',
  })

  const items = data?.menu?.items ?? []
  return { items, loading }
}
