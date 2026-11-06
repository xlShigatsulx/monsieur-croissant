import { useGetShopHeroQuery } from '@/graphql/generated/graphql';
import { useShopifyLocale } from '@/lib/apollo/useShopifyQuery';

type HeroData = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonUrl: string;
};

export function useHeroData(): { data: HeroData | null; loading: boolean } {
  const language = useShopifyLocale();
  const { data, loading, previousData } = useGetShopHeroQuery({
    variables: { language },
    fetchPolicy: 'cache-first',
  });

  const activeData = data ?? previousData;
  if (!activeData) return { data: null, loading };

  const fields = activeData.shop.metafields ?? [];
  const get = (key: string) => fields.find((f) => f?.key === key)?.value ?? '';

  return {
    loading,
    data: {
      title: get('title'),
      subtitle: get('subtitle'),
      buttonLabel: get('button_label'),
      buttonUrl: get('button_url'),
    },
  };
}
