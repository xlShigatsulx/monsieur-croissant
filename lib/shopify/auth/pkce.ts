export function generateCodeVerifier(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return base64UrlEncode(String.fromCharCode(...Array.from(array)))
}

export async function generateCodeChallenge(
  codeVerifier: string
): Promise<string> {
  const digestOp = await crypto.subtle.digest(
    { name: 'SHA-256' },
    new TextEncoder().encode(codeVerifier)
  )
  const hash = convertBufferToString(digestOp)
  return base64UrlEncode(hash)
}

function base64UrlEncode(str: string): string {
  const base64 = btoa(str)
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function convertBufferToString(hash: ArrayBuffer): string {
  const uintArray = new Uint8Array(hash)
  return String.fromCharCode(...Array.from(uintArray))
}
