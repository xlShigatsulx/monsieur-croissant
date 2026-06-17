import { LanguageCode } from '@/graphql/generated/graphql'
import { useLocale } from 'next-intl'

const LOCALE_TO_SHOPIFY: Record<string, LanguageCode> = {
  uk: LanguageCode.Uk,
  en: LanguageCode.En,
}

export function useShopifyLocale() {
  const locale = useLocale()
  return LOCALE_TO_SHOPIFY[locale] ?? LanguageCode.Uk
}
