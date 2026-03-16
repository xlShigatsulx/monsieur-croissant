export async function generateState(): Promise<string> {
  const timestamp = Date.now().toString()
  const randomString = Math.random().toString(36).substring(2)
  return timestamp + randomString
}

export async function generateNonce(length = 16): Promise<string> {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let nonce = ''
  for (let i = 0; i < length; i++) {
    nonce += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return nonce
}
