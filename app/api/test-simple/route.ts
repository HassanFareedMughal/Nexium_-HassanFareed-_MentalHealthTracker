import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('=== SIMPLE TEST API CALLED ===');
  
  try {
    const body = await request.json();
    console.log('Simple test received:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Simple test API is working!',
      received: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Simple test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Simple test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  console.log('=== SIMPLE TEST GET CALLED ===');
  return NextResponse.json({
    success: true,
    message: 'Simple test GET is working!',
    timestamp: new Date().toISOString()
  });
} 