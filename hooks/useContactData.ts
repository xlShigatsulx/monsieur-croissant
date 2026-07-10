import { useGetShopContactQuery } from '@/graphql/generated/graphql';
import { useShopifyLocale } from '@/lib/apollo/useShopifyQuery';

export type ContactData = {
  address: string;
  hoursWeekdays: string;
  hoursWeekends: string;
  phone: string;
  mapsUrl: string;
};

export function useContactData(): {
  data: ContactData | null;
  loading: boolean;
} {
  const language = useShopifyLocale();

  const { data, loading } = useGetShopContactQuery({
    variables: { language },
    fetchPolicy: 'cache-and-network',
  });

  if (loading || !data) return { data: null, loading };

  const fields = data.shop.metafields ?? [];
  const get = (key: string) => fields.find((f) => f?.key === key)?.value ?? '';

  return {
    loading,
    data: {
      address: get('address'),
      hoursWeekdays: get('hours_weekdays'),
      hoursWeekends: get('hours_weekends'),
      phone: get('phone'),
      mapsUrl: get('maps_url'),
    },
  };
}
