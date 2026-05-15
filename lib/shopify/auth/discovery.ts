interface OpenIDConfig {
  authorization_endpoint: string
  token_endpoint: string
  end_session_endpoint: string
}

let cachedConfig: OpenIDConfig | null = null

export async function getOpenIDConfig(): Promise<OpenIDConfig> {
  if (cachedConfig) return cachedConfig

  const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!
  const res = await fetch(
    `https://${SHOP_DOMAIN}/.well-known/openid-configuration`
  )

  if (!res.ok) throw new Error('Failed to fetch OpenID configuration')

  cachedConfig = await res.json()
  return cachedConfig!
}
