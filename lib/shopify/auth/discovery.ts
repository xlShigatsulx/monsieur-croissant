interface OpenIDConfig {
  authorization_endpoint: string;
  token_endpoint: string;
  end_session_endpoint: string;
}

const CACHE_TTL_MS = 60 * 60 * 1000;
let cachedConfig: OpenIDConfig | null = null;
let cachedAt = 0;

export async function getOpenIDConfig(): Promise<OpenIDConfig> {
  const isFresh = cachedConfig && Date.now() - cachedAt < CACHE_TTL_MS;
  if (isFresh) return cachedConfig!;

  const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
  const res = await fetch(
    `https://${SHOP_DOMAIN}/.well-known/openid-configuration`,
  );

  if (!res.ok) {
    if (cachedConfig) return cachedConfig;
    throw new Error('Failed to fetch OpenID configuration');
  }

  cachedConfig = await res.json();
  cachedAt = Date.now();
  return cachedConfig!;
}
