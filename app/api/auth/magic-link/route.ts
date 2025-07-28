import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase client not initialized' },
        { status: 500 }
      );
    }

    // Get the base URL for the callback
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXTAUTH_URL || 'http://localhost:3000';

    console.log('Sending magic link to:', email);
    console.log('Redirect URL:', `${baseUrl}/api/debug-magic-link`);

    // Send magic link email with redirect to debug route first
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${baseUrl}/api/debug-magic-link`,
      },
    });

    if (error) {
      console.error('Magic link error:', error);
      return NextResponse.json(
        { error: 'Failed to send magic link' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Magic link sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Magic link API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 