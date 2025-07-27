import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase not configured', url: supabaseUrl, hasKey: !!supabaseAnonKey },
        { status: 500 }
      );
    }

    // Test basic connection
    const { data, error } = await supabase.from('mood_entries').select('count').limit(1);
    
    if (error) {
      return NextResponse.json(
        { error: 'Supabase connection failed', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Supabase connection successful',
        url: supabaseUrl,
        hasKey: !!supabaseAnonKey
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Test failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 