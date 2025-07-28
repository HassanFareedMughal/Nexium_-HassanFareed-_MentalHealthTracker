import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log('=== SUPABASE CONFIG TEST ===');
  console.log('Supabase URL:', supabaseUrl ? 'Present' : 'Missing');
  console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing');
  console.log('Supabase Service Key:', supabaseServiceKey ? 'Present' : 'Missing');

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({
      error: 'Missing Supabase configuration',
      supabaseUrl: !!supabaseUrl,
      supabaseAnonKey: !!supabaseAnonKey,
      supabaseServiceKey: !!supabaseServiceKey
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Test a simple query
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      hasError: !!error,
      error: error?.message,
      data: data
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to connect to Supabase',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 