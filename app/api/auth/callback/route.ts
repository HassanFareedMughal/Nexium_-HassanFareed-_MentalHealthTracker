import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const access_token = searchParams.get('access_token');
  const refresh_token = searchParams.get('refresh_token');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');

  console.log('Auth callback called with:', {
    access_token: access_token ? 'present' : 'missing',
    refresh_token: refresh_token ? 'present' : 'missing',
    error,
    error_description
  });

  if (error) {
    console.error('Auth error:', error, error_description);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }

  if (!access_token) {
    console.error('No access token provided');
    return NextResponse.redirect(new URL('/?error=no_token', request.url));
  }

  try {
    console.log('Redirecting to dashboard with token');
    
    // Create a redirect response to the dashboard
    const redirectResponse = NextResponse.redirect(new URL('/dashboard', request.url));
    
    // Set the access token as a cookie for the client-side auth context
    redirectResponse.cookies.set('sb-access-token', access_token, {
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    if (refresh_token) {
      redirectResponse.cookies.set('sb-refresh-token', refresh_token, {
        httpOnly: false, // Allow client-side access
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return redirectResponse;
  } catch (error) {
    console.error('Error in auth callback:', error);
    return NextResponse.redirect(new URL('/?error=callback_failed', request.url));
  }
} 