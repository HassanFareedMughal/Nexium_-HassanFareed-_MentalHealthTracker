import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== TEST MOOD API CALLED ===');
    const body = await request.json();
    console.log('Test API received body:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Test API working',
      received_data: body
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      { error: 'Test API failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Test mood API is working'
  });
} 