import { SHOPIFY_CONFIG } from '@/lib/shopify/config';

export function isSafeCheckoutUrl(rawUrl: string): boolean {
  if (!rawUrl || typeof rawUrl !== 'string') return false;
  try {
    const url = new URL(rawUrl);
    const isHttps =
      url.protocol === 'https:' ||
      (process.env.NODE_ENV !== 'production' && url.protocol === 'http:');
    if (!isHttps) return false;

    const hostname = url.hostname.toLowerCase();
    const storeDomain = SHOPIFY_CONFIG.storeDomain?.toLowerCase();

    const isTrustedShopify =
      hostname.endsWith('.myshopify.com') ||
      hostname.endsWith('.shopify.com') ||
      (storeDomain && hostname === storeDomain) ||
      (typeof window !== 'undefined' && hostname === window.location.hostname);

    return !!isTrustedShopify;
  } catch {
    return false;
  }
}

export function safeRedirectToCheckout(checkoutUrl: string): boolean {
  if (!isSafeCheckoutUrl(checkoutUrl)) {
    console.warn('Blocked redirect to untrusted checkout URL:', checkoutUrl);
    return false;
  }
  window.location.href = checkoutUrl;
  return true;
}
