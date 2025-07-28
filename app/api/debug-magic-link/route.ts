import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const allParams = Object.fromEntries(searchParams.entries());
  
  console.log('Magic link debug - all parameters:', allParams);
  console.log('Full URL:', request.url);
  console.log('Headers:', Object.fromEntries(request.headers.entries()));
  
  return NextResponse.json({
    message: 'Magic link debug - SUCCESS!',
    parameters: allParams,
    url: request.url,
    timestamp: new Date().toISOString(),
    headers: Object.fromEntries(request.headers.entries())
  });
} 