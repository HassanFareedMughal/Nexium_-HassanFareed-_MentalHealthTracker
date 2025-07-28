import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const access_token = searchParams.get('access_token');
  const refresh_token = searchParams.get('refresh_token');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');

  console.log('=== AUTH CALLBACK STARTED ===');
  console.log('Full URL:', request.url);
  console.log('Search params:', Object.fromEntries(searchParams.entries()));
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
    if (!supabase) {
      console.error('Supabase client not initialized');
      return NextResponse.redirect(new URL('/?error=config_error', request.url));
    }

    console.log('Setting session with access token...');
    
    // Set the session using the access token
    const { data, error: sessionError } = await supabase.auth.setSession({
      access_token,
      refresh_token: refresh_token || '',
    });

    if (sessionError) {
      console.error('Error setting session:', sessionError);
      return NextResponse.redirect(new URL('/?error=session_error', request.url));
    }

    if (!data.user) {
      console.error('No user found after setting session');
      return NextResponse.redirect(new URL('/?error=no_user', request.url));
    }

    console.log('Session set successfully for user:', data.user.email);
    console.log('User ID:', data.user.id);
    
    // Create a redirect response to the dashboard
    const dashboardUrl = new URL('/dashboard', request.url);
    console.log('Redirecting to dashboard:', dashboardUrl.toString());
    
    const redirectResponse = NextResponse.redirect(dashboardUrl);
    
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

    console.log('=== AUTH CALLBACK COMPLETED SUCCESSFULLY ===');
    return redirectResponse;
  } catch (error) {
    console.error('Error in auth callback:', error);
    return NextResponse.redirect(new URL('/?error=callback_failed', request.url));
  }
} 