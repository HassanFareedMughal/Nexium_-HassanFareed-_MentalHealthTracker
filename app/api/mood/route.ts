import { NextRequest, NextResponse } from 'next/server';
import { mongodb } from '@/lib/mongodb';
import { requestAIInsights, requestQuickRecommendations, analyzeMoodPatterns } from '@/lib/n8n';
import { MoodEntry } from '@/types';

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
    const { user_id, mood_level, energy_level, sleep_hours, stress_level, activities, notes } = body;

    if (!user_id || mood_level === undefined) {
      return NextResponse.json(
        { error: 'user_id and mood_level are required' },
        { status: 400 }
      );
    }

    // Create mood entry
    const moodEntry = await createMoodEntry({
      user_id,
      mood_level,
      energy_level: energy_level || 5,
      sleep_hours: sleep_hours || 7,
      stress_level: stress_level || 5,
      activities: activities || [],
      notes: notes || '',
    });

    // Request AI insights from n8n (optional)
    try {
      const aiResponse = await requestAIInsights({
        user_id,
        mood_data: {
          mood: mood_level,
          energy_level: energy_level || 5,
          sleep_hours: sleep_hours || 7,
          stress_level: stress_level || 5,
          activities: activities || [],
          notes: notes || '',
        },
        insights_requested: true,
      });

      // Save insights to database if successful
      if (aiResponse.success && aiResponse.insights) {
        try {
          for (const insight of aiResponse.insights) {
            await mongodb.createInsight({
              user_id,
              type: insight.type || 'suggestion',
              title: insight.title || 'AI Insight',
              description: insight.description || '',
              confidence: insight.confidence || 0.8,
              created_at: new Date().toISOString(),
              is_read: false,
            });
          }
        } catch (error) {
          console.log('Could not save insights to database');
        }
      }

      return NextResponse.json({
        success: true,
        mood_entry: moodEntry,
        ai_insights: aiResponse.insights || [],
        recommendations: aiResponse.recommendations || [],
        ai_success: aiResponse.success,
      });
    } catch (error) {
      console.log('AI insights not available');
      return NextResponse.json({
        success: true,
        mood_entry: moodEntry,
        ai_insights: [],
        recommendations: [],
        ai_success: false,
      });
    }
  } catch (error) {
    console.error('Error creating mood entry:', error);
    return NextResponse.json(
      { error: 'Failed to create mood entry' },
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

    let entries;
    try {
      entries = await mongodb.getMoodEntries(user_id, limit);
    } catch (error) {
      console.log('MongoDB not available, returning empty array');
      entries = [];
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
                created_at: new Date().toISOString(),
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