const CLIENT_ID = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_CLIENT_ID!
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!
const AUTH_URL = process.env.NEXT_PUBLIC_SHOPIFY_AUTH_URL!
const TOKEN_URL = process.env.NEXT_PUBLIC_SHOPIFY_TOKEN_URL!
const LOGOUT_URL = process.env.NEXT_PUBLIC_SHOPIFY_LOGOUT_URL!

export const REDIRECT_URI = `${APP_URL}/auth/callback`

interface TokenResponse {
  access_token: string
  refresh_token: string
  id_token: string
  expires_in: number
}

export function getAuthorizationUrl(
  state: string,
  nonce: string,
  codeChallenge: string
): string {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: 'openid email customer-account-api:full',
    state,
    nonce,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  })

  return `${AUTH_URL}?${params}`
}

export async function exchangeCodeForToken(
  code: string,
  codeVerifier: string
): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    code,
    code_verifier: codeVerifier,
  })

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to exchange code for token: ${error}`)
  }

  return response.json()
}

export async function refreshAccessToken(
  refreshToken: string
): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: CLIENT_ID,
    refresh_token: refreshToken,
  })

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!response.ok) throw new Error('Failed to refresh token')
  return response.json()
}

export async function getCustomer(accessToken: string) {
  const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!

  const apiDiscoveryResponse = await fetch(
    `https://${SHOP_DOMAIN}/.well-known/customer-account-api`
  )
  const { graphql_api } = await apiDiscoveryResponse.json()

  const response = await fetch(graphql_api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },
    body: JSON.stringify({
      query: `query {
        customer {
          id
          firstName
          lastName
          emailAddress { emailAddress }
        }
      }`,
    }),
  })

  if (!response.ok) throw new Error('Failed to fetch customer')
  const { data } = await response.json()
  return data.customer
}

export function getLogoutUrl(idToken: string): string {
  const params = new URLSearchParams({
    id_token_hint: idToken,
    post_logout_redirect_uri: APP_URL,
  })
  return `${LOGOUT_URL}?${params}`
}
