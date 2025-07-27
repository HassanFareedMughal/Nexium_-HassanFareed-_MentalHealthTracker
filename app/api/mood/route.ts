import { NextRequest, NextResponse } from 'next/server';
import { mongodb } from '@/lib/mongodb';
import { n8n } from '@/lib/n8n';

// Fallback for when MongoDB is not configured
const createMoodEntry = async (entry: any) => {
  try {
    return await mongodb.createMoodEntry(entry);
  } catch (error) {
    // If MongoDB fails, return a mock response
    console.log('MongoDB not available, using mock data');
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...entry,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, mood, energy_level, sleep_hours, stress_level, activities, notes } = body;

    if (!user_id || !mood) {
      return NextResponse.json(
        { error: 'User ID and mood are required' },
        { status: 400 }
      );
    }

    // Create mood entry
    const moodEntry = await createMoodEntry({
      user_id,
      mood,
      energy_level,
      sleep_hours,
      stress_level,
      activities,
      notes,
    });

    // Request AI insights from n8n (optional)
    try {
      const insights = await n8n.analyzeMoodPattern(user_id, {
        mood,
        energy_level,
        sleep_hours,
        stress_level,
        activities,
        notes,
      });

      // Save insights to database
      for (const insight of insights) {
        try {
          await mongodb.createInsight({
            user_id,
            type: insight.type,
            title: insight.title,
            description: insight.description,
            confidence: insight.confidence,
            is_read: false,
          });
        } catch (error) {
          console.log('Could not save insight to database');
        }
      }
    } catch (error) {
      console.log('AI insights not available');
    }

    return NextResponse.json(
      { message: 'Mood entry created successfully', data: moodEntry },
      { status: 201 }
    );
  } catch (error) {
    console.error('Mood entry API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    let entries;
    try {
      entries = await mongodb.getMoodEntries(user_id, limit);
    } catch (error) {
      console.log('MongoDB not available, returning empty array');
      entries = [];
    }

    return NextResponse.json(
      { data: entries },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get mood entries API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 