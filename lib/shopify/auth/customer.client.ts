import { getOpenIDConfig } from './discovery';

const CLIENT_ID = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_CLIENT_ID!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export const REDIRECT_URI = `${APP_URL}/auth/callback`;

export async function getAuthorizationUrl(
  state: string,
  nonce: string,
  codeChallenge: string,
): Promise<string> {
  const { authorization_endpoint } = await getOpenIDConfig();

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: 'openid email customer-account-api:full',
    state,
    nonce,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  return `${authorization_endpoint}?${params.toString()}`;
}
