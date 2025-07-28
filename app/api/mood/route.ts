import { NextRequest, NextResponse } from 'next/server';
import { mongodb } from '@/lib/mongodb';
import { requestAIInsights, requestQuickRecommendations, analyzeMoodPatterns } from '@/lib/n8n';
import { MoodEntry } from '@/types';

// Simple in-memory storage for when MongoDB is not available
const memoryStorage: { [key: string]: any[] } = {};

// Fallback for when MongoDB is not configured
const createMoodEntry = async (entry: any) => {
  try {
    console.log('Attempting to save to MongoDB...');
    const result = await mongodb.createMoodEntry(entry);
    console.log('Successfully saved to MongoDB:', result);
    return result;
  } catch (error) {
    // If MongoDB fails, use in-memory storage
    console.log('MongoDB not available, using in-memory storage. Error:', error);
    const mockEntry = {
      id: Math.random().toString(36).substr(2, 9),
      ...entry,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // Store in memory
    if (!memoryStorage[entry.user_id]) {
      memoryStorage[entry.user_id] = [];
    }
    memoryStorage[entry.user_id].push(mockEntry);
    
    console.log('Created in-memory entry:', mockEntry);
    console.log('Current memory storage for user:', memoryStorage[entry.user_id].length, 'entries');
    return mockEntry;
  }
};

export async function POST(request: NextRequest) {
  try {
    console.log('=== MOOD API CALLED ===');
    
    const body = await request.json();
    console.log('Received data:', body);
    
    const { user_id, mood_level, energy_level, sleep_hours, stress_level, activities, notes } = body;

    // Validate required fields
    if (!user_id || mood_level === undefined) {
      console.error('Missing required fields');
      return NextResponse.json(
        { error: 'user_id and mood_level are required' },
        { status: 400 }
      );
    }

    // Create the mood entry
    const moodEntry = {
      id: Math.random().toString(36).substr(2, 9),
      user_id,
      mood_level,
      energy_level: energy_level || 5,
      sleep_hours: sleep_hours || 7,
      stress_level: stress_level || 5,
      activities: activities || [],
      notes: notes || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Store in memory
    if (!memoryStorage[user_id]) {
      memoryStorage[user_id] = [];
    }
    memoryStorage[user_id].push(moodEntry);
    
    console.log('Mood entry saved successfully:', moodEntry);
    console.log('Total entries for user:', memoryStorage[user_id].length);

    return NextResponse.json({
      success: true,
      message: 'Mood entry saved successfully',
      mood_entry: moodEntry,
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to save mood entry' },
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
        { error: 'user_id is required' },
        { status: 400 }
      );
    }

    let entries: any[] = [];
    try {
      entries = await mongodb.getMoodEntries(user_id, limit);
    } catch (error) {
      console.log('MongoDB not available, using in-memory storage');
      // Use in-memory storage as fallback
      entries = memoryStorage[user_id] || [];
      entries = entries.slice(0, limit);
    }

    // Request pattern analysis if we have entries
    let patternAnalysis = null;
    if (entries.length > 0) {
      try {
        patternAnalysis = await analyzeMoodPatterns(user_id, entries);
        if (patternAnalysis.success && patternAnalysis.insights) {
          try {
            for (const insight of patternAnalysis.insights) {
              await mongodb.createInsight({
                user_id,
                type: insight.type || 'pattern',
                title: insight.title || 'Pattern Analysis',
                description: insight.description || '',
                confidence: insight.confidence || 0.8,
                is_read: false,
              });
            }
          } catch (error) {
            console.log('Could not save pattern analysis to database');
          }
        }
      } catch (error) {
        console.log('Pattern analysis not available');
      }
    }

    return NextResponse.json({
      success: true,
      entries,
      pattern_analysis: patternAnalysis,
    });
  } catch (error) {
    console.error('Error fetching mood entries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mood entries' },
      { status: 500 }
    );
  }
} 