/**
 * Decodes a JWT's header and payload WITHOUT verifying its signature.
 *
 * ⚠️ This is NOT a security check. Do not trust the returned payload for
 * anything beyond reading non-sensitive claims (e.g. the `nonce` we set
 * ourselves before the auth redirect). The actual trust boundary is the
 * server-side authorization-code exchange over HTTPS with Shopify — that is
 * what proves the token is genuine, not this decode step.
 */

export function decodeJwt(token: string) {
  const [header, payload, signature] = token.split('.');
  return {
    header: JSON.parse(atob(header)),
    payload: JSON.parse(atob(payload)),
    signature,
  };
}

export function getNonce(idToken: string): string {
  return decodeJwt(idToken).payload.nonce;
}
