import { useGetShopHeroQuery } from '@/graphql/generated/graphql'

type HeroData = {
  title: string
  subtitle: string
  buttonLabel: string
  buttonUrl: string
}

export function useHeroData(): { data: HeroData | null; loading: boolean } {
  const { data, loading } = useGetShopHeroQuery()

  if (loading || !data) return { data: null, loading }

  const fields = data.shop.metafields ?? []
  const get = (key: string) => fields.find((f) => f?.key === key)?.value ?? ''

  return {
    loading,
    data: {
      title: get('title'),
      subtitle: get('subtitle'),
      buttonLabel: get('button_label'),
      buttonUrl: get('button_url'),
    },
  }
}
