import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email parameter required' }, { status: 400 });
  }

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not initialized' }, { status: 500 });
  }

  try {
    const baseUrl = 'https://mental-heath-tracker-k2pf8stuy-hassan-fareeds-projects.vercel.app';
    
    console.log('Testing magic link for:', email);
    console.log('Redirect URL:', `${baseUrl}/api/debug-magic-link`);

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${baseUrl}/api/debug-magic-link`,
      },
    });

    if (error) {
      console.error('Magic link test error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Magic link sent',
      redirectUrl: `${baseUrl}/api/debug-magic-link`
    });
  } catch (error) {
    console.error('Magic link test error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 