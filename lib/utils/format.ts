const LOCALE_MAP: Record<string, string> = {
  uk: 'uk-UA',
  en: 'en-US',
}

export function formatPrice(
  amount: number,
  currencyCode: string,
  locale: string = 'uk'
): string {
  return new Intl.NumberFormat(LOCALE_MAP[locale] ?? 'uk-UA', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount)
}
