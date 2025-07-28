import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== TEST MOOD API CALLED ===');
    
    const body = await request.json();
    console.log('Received test data:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Test mood entry received',
      received_data: body,
    });
    
  } catch (error) {
    console.error('Test API Error:', error);
    return NextResponse.json(
      { error: 'Test API failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Test mood API is working',
  });
} 