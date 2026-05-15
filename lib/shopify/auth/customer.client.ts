const CLIENT_ID = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_CLIENT_ID!
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!

export const REDIRECT_URI = `${APP_URL}/auth/callback`

export async function getAuthorizationUrl(
  state: string,
  nonce: string,
  codeChallenge: string,
  mode: 'login' | 'register' = 'login'
): Promise<string> {
  const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
  const res = await fetch(
    `https://${SHOP_DOMAIN}/.well-known/openid-configuration`
  )
  const { authorization_endpoint } = await res.json()

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: 'openid email customer-account-api:full',
    state,
    nonce,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    ...(mode === 'register' && { prompt: 'create' }),
  })

  return `${authorization_endpoint}?${params}`
}
