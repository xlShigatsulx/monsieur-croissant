export function decodeJwt(token: string) {
  const [header, payload, signature] = token.split('.')
  return {
    header: JSON.parse(atob(header)),
    payload: JSON.parse(atob(payload)),
    signature,
  }
}

export function getNonce(idToken: string): string {
  return decodeJwt(idToken).payload.nonce
}
