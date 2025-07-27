import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const access_token = searchParams.get('access_token');
  const refresh_token = searchParams.get('refresh_token');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');

  if (error) {
    console.error('Auth error:', error, error_description);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }

  if (!access_token) {
    console.error('No access token provided');
    return NextResponse.redirect(new URL('/?error=no_token', request.url));
  }

  try {
    // Set the session using the access token
    const { data: { user }, error } = await supabase?.auth.getUser(access_token);
    
    if (error || !user) {
      console.error('Error getting user:', error);
      return NextResponse.redirect(new URL('/?error=invalid_token', request.url));
    }

    // Set cookies for the session
    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    
    // Set the access token as a cookie
    response.cookies.set('sb-access-token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    if (refresh_token) {
      response.cookies.set('sb-refresh-token', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error('Error in auth callback:', error);
    return NextResponse.redirect(new URL('/?error=callback_failed', request.url));
  }
} 