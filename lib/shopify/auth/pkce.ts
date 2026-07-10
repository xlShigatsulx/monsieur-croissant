export function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(bytesToBinaryString(array));
}

export async function generateCodeChallenge(
  codeVerifier: string,
): Promise<string> {
  const digestOp = await crypto.subtle.digest(
    { name: 'SHA-256' },
    new TextEncoder().encode(codeVerifier),
  );
  const hash = convertBufferToString(digestOp);
  return base64UrlEncode(hash);
}

function base64UrlEncode(str: string): string {
  const base64 = btoa(str);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function convertBufferToString(hash: ArrayBuffer): string {
  return bytesToBinaryString(new Uint8Array(hash));
}

function bytesToBinaryString(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return binary;
}
