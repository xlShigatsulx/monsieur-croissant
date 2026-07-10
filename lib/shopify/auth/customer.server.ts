import { getOpenIDConfig } from './discovery';

const CLIENT_ID = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_CLIENT_ID!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;
const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;

export const REDIRECT_URI = `${APP_URL}/auth/callback`;

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
}

export class OAuthError extends Error {
  constructor(
    public code: string,
    message?: string,
  ) {
    super(message ?? code);
    this.name = 'OAuthError';
  }
}

async function parseOAuthErrorCode(response: Response): Promise<string> {
  try {
    const body = await response.clone().json();
    if (typeof body?.error === 'string') return body.error;
  } catch {}
  return 'unknown_error';
}

export async function exchangeCodeForToken(
  code: string,
  codeVerifier: string,
): Promise<TokenResponse> {
  const { token_endpoint } = await getOpenIDConfig();

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    code,
    code_verifier: codeVerifier,
  });

  const response = await fetch(token_endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) {
    const errorCode = await parseOAuthErrorCode(response);
    throw new OAuthError(errorCode, `Failed to exchange code: ${errorCode}`);
  }
  return response.json();
}

export async function refreshAccessToken(
  refreshToken: string,
): Promise<TokenResponse> {
  const { token_endpoint } = await getOpenIDConfig();

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: CLIENT_ID,
    refresh_token: refreshToken,
  });

  const response = await fetch(token_endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!response.ok) {
    const errorCode = await parseOAuthErrorCode(response);
    throw new OAuthError(errorCode, `Failed to refresh token: ${errorCode}`);
  }
  return response.json();
}

export async function getCustomer(accessToken: string) {
  const apiDiscoveryResponse = await fetch(
    `https://${SHOP_DOMAIN}/.well-known/customer-account-api`,
  );
  const { graphql_api } = await apiDiscoveryResponse.json();

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
  });

  if (!response.ok) throw new Error('Failed to fetch customer');
  const { data } = await response.json();
  return data.customer;
}

export async function getLogoutUrl(idToken: string): Promise<string> {
  const { end_session_endpoint } = await getOpenIDConfig();

  const params = new URLSearchParams({
    id_token_hint: idToken,
    post_logout_redirect_uri: APP_URL,
  });

  return `${end_session_endpoint}?${params}`;
}
