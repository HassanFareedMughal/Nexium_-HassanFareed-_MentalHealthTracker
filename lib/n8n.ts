import axios from 'axios';
import { N8nWebhookPayload, N8nResponse, MoodEntry, AIInsight } from '@/types';

const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL!;

export const n8n = {
  async requestInsights(payload: N8nWebhookPayload): Promise<N8nResponse> {
    try {
      const response = await axios.post(n8nWebhookUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 second timeout
      });

      return response.data;
    } catch (error) {
      console.error('Error requesting insights from n8n:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  async analyzeMoodPattern(userId: string, moodData: Partial<MoodEntry>): Promise<AIInsight[]> {
    const payload: N8nWebhookPayload = {
      user_id: userId,
      mood_data: moodData,
      insights_requested: true,
    };

    const response = await this.requestInsights(payload);
    
    if (response.success && response.insights) {
      return response.insights;
    }
    
    return [];
  },

  async getRecommendations(userId: string, recentMoodData: Partial<MoodEntry>[]): Promise<string[]> {
    const payload: N8nWebhookPayload = {
      user_id: userId,
      mood_data: recentMoodData[0] || {},
      insights_requested: false,
    };

    const response = await this.requestInsights(payload);
    
    if (response.success && response.recommendations) {
      return response.recommendations;
    }
    
    return [];
  },

  async generateWeeklyReport(userId: string, weeklyData: MoodEntry[]): Promise<AIInsight[]> {
    const payload: N8nWebhookPayload = {
      user_id: userId,
      mood_data: {
        // Send aggregated weekly data
        notes: JSON.stringify(weeklyData),
      },
      insights_requested: true,
    };

    const response = await this.requestInsights(payload);
    
    if (response.success && response.insights) {
      return response.insights;
    }
    
    return [];
  },
}; 