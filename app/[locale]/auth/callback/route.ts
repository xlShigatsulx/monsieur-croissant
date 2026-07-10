import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getNonce } from '@/lib/shopify/auth/jwt';
import {
  exchangeCodeForToken,
  getCustomer,
  OAuthError,
} from '@/lib/shopify/auth/customer.server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const cookieStore = await cookies();
  const savedState = cookieStore.get('oauth_state')?.value;
  const savedNonce = cookieStore.get('oauth_nonce')?.value;
  const codeVerifier = cookieStore.get('code_verifier')?.value;

  if (!state || state !== savedState) {
    return NextResponse.redirect(new URL('/?error=invalid_state', request.url));
  }

  if (!code || !codeVerifier) {
    return NextResponse.redirect(
      new URL('/?error=missing_params', request.url),
    );
  }

  try {
    const { access_token, refresh_token, id_token, expires_in } =
      await exchangeCodeForToken(code, codeVerifier);

    const nonce = getNonce(id_token);
    if (nonce !== savedNonce) {
      return NextResponse.redirect(
        new URL('/?error=invalid_nonce', request.url),
      );
    }

    const customer = await getCustomer(access_token);

    cookieStore.set('customer_access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expires_in,
      sameSite: 'lax',
      path: '/',
    });

    cookieStore.set('customer_refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
      path: '/',
    });

    cookieStore.set('customer_id_token', id_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expires_in,
      sameSite: 'lax',
      path: '/',
    });

    cookieStore.set(
      'customer',
      JSON.stringify({
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.emailAddress?.emailAddress,
      }),
      {
        secure: process.env.NODE_ENV === 'production',
        maxAge: expires_in,
        sameSite: 'lax',
        path: '/',
      },
    );

    cookieStore.delete('oauth_state');
    cookieStore.delete('oauth_nonce');
    cookieStore.delete('code_verifier');

    return NextResponse.redirect(new URL('/profile', request.url));
  } catch (error) {
    if (error instanceof OAuthError && error.code === 'invalid_grant') {
      console.warn('Auth callback: invalid_grant, prompting re-login');
      return NextResponse.redirect(
        new URL('/?error=session_expired', request.url),
      );
    }

    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}
