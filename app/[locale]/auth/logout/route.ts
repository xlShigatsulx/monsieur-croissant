import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getLogoutUrl } from '@/lib/shopify/auth/customer.server';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const idToken = cookieStore.get('customer_id_token')?.value;

  let redirectUrl = new URL('/', request.url).toString();

  try {
    if (idToken) {
      redirectUrl = await getLogoutUrl(idToken);
    }
  } catch (error) {
    console.error('Failed to get logout URL:', error);
  }

  const response = NextResponse.redirect(redirectUrl);

  const cookiesToDelete = [
    'customer_access_token',
    'customer_refresh_token',
    'customer_id_token',
    'customer',
  ];

  cookiesToDelete.forEach((cookieName) => {
    response.cookies.set(cookieName, '', {
      maxAge: 0,
      path: '/',
    });
  });

  return response;
}
