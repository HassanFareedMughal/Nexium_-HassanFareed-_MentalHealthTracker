import { N8nWebhookPayload, N8nResponse, AIInsight } from '@/types';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || '';

export interface AIAnalysisRequest {
  user_id: string;
  mood_data: {
    mood: number;
    energy_level?: number;
    sleep_hours?: number;
    stress_level?: number;
    activities?: string[];
    notes?: string;
  };
  insights_requested?: boolean;
}

export interface AIAnalysisResponse {
  success: boolean;
  insights?: AIInsight[];
  recommendations?: string[];
  error?: string;
}

/**
 * Request AI insights from n8n workflow
 */
export async function requestAIInsights(data: AIAnalysisRequest): Promise<AIAnalysisResponse> {
  if (!N8N_WEBHOOK_URL) {
    throw new Error('N8N_WEBHOOK_URL not configured');
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        insights_requested: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n request failed: ${response.status}`);
    }

    const result = await response.json();
    return result as AIAnalysisResponse;
  } catch (error) {
    console.error('Error requesting AI insights:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Request quick recommendations from n8n workflow
 */
export async function requestQuickRecommendations(data: AIAnalysisRequest): Promise<AIAnalysisResponse> {
  if (!N8N_WEBHOOK_URL) {
    throw new Error('N8N_WEBHOOK_URL not configured');
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        insights_requested: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n request failed: ${response.status}`);
    }

    const result = await response.json();
    return result as AIAnalysisResponse;
  } catch (error) {
    console.error('Error requesting quick recommendations:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Analyze mood patterns and provide insights
 */
export async function analyzeMoodPatterns(
  userId: string,
  moodEntries: any[]
): Promise<AIAnalysisResponse> {
  if (!N8N_WEBHOOK_URL) {
    throw new Error('N8N_WEBHOOK_URL not configured');
  }

  try {
    // Use the most recent mood entry for analysis
    const latestEntry = moodEntries[0];
    if (!latestEntry) {
      return {
        success: false,
        error: 'No mood entries available for analysis',
      };
    }

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        mood_data: {
          mood: latestEntry.mood_level || latestEntry.mood,
          energy_level: latestEntry.energy_level || 5,
          sleep_hours: latestEntry.sleep_hours || 7,
          stress_level: latestEntry.stress_level || 5,
          activities: latestEntry.activities || [],
          notes: latestEntry.notes || '',
        },
        insights_requested: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Pattern analysis request failed: ${response.status}`);
    }

    const result = await response.json();
    return result as AIAnalysisResponse;
  } catch (error) {
    console.error('Error analyzing mood patterns:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Get personalized recommendations based on mood trends
 */
export async function getPersonalizedRecommendations(
  userId: string,
  moodTrends: any[]
): Promise<AIAnalysisResponse> {
  if (!N8N_WEBHOOK_URL) {
    throw new Error('N8N_WEBHOOK_URL not configured');
  }

  try {
    // Use the most recent mood entry for recommendations
    const latestEntry = moodTrends[0];
    if (!latestEntry) {
      return {
        success: false,
        error: 'No mood data available for recommendations',
      };
    }

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        mood_data: {
          mood: latestEntry.mood_level || latestEntry.mood,
          energy_level: latestEntry.energy_level || 5,
          sleep_hours: latestEntry.sleep_hours || 7,
          stress_level: latestEntry.stress_level || 5,
          activities: latestEntry.activities || [],
          notes: latestEntry.notes || '',
        },
        insights_requested: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Recommendations request failed: ${response.status}`);
    }

    const result = await response.json();
    return result as AIAnalysisResponse;
  } catch (error) {
    console.error('Error requesting recommendations:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
} 