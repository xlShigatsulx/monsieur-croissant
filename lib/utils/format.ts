export function formatPrice(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount)
}
