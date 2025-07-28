import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const allParams = Object.fromEntries(searchParams.entries());
  
  console.log('Magic link debug - all parameters:', allParams);
  
  return NextResponse.json({
    message: 'Magic link debug',
    parameters: allParams,
    url: request.url
  });
} 