import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const access_token = searchParams.get('access_token');
    const refresh_token = searchParams.get('refresh_token');
    const error = searchParams.get('error');

    console.log('=== CALLBACK ROUTE CALLED ===');
    console.log('Access token:', access_token ? 'Present' : 'Missing');
    console.log('Refresh token:', refresh_token ? 'Present' : 'Missing');
    console.log('Error:', error);

    if (error) {
      console.error('Auth error:', error);
      return NextResponse.redirect('http://localhost:3000/?error=' + error);
    }

    if (!access_token) {
      console.error('No access token provided');
      return NextResponse.redirect('http://localhost:3000/?error=no_token');
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Set the session
    const { data, error: sessionError } = await supabase.auth.setSession({
      access_token,
      refresh_token: refresh_token || '',
    });

    if (sessionError) {
      console.error('Session error:', sessionError);
      return NextResponse.redirect('http://localhost:3000/?error=session_error');
    }

    if (!data.user) {
      console.error('No user found');
      return NextResponse.redirect('http://localhost:3000/?error=no_user');
    }

    console.log('Session set successfully for user:', data.user.email);
    
    // Redirect to dashboard
    return NextResponse.redirect('http://localhost:3000/dashboard');
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect('http://localhost:3000/?error=callback_failed');
  }
} 