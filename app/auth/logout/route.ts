import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getLogoutUrl } from '@/lib/shopify/auth/customer.server'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  const idToken = cookieStore.get('customer_id_token')?.value

  cookieStore.delete('customer_access_token')
  cookieStore.delete('customer_refresh_token')
  cookieStore.delete('customer_id_token')
  cookieStore.delete('customer')

  if (idToken) {
    const logoutUrl = await getLogoutUrl(idToken)
    return NextResponse.redirect(logoutUrl)
  }

  return NextResponse.redirect(new URL('/', request.url))
}
