export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface MoodEntry {
  id: string;
  user_id: string;
  mood: MoodLevel;
  energy_level: number;
  sleep_hours: number;
  stress_level: number;
  activities: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export type MoodLevel = 'excellent' | 'good' | 'okay' | 'bad' | 'terrible';

export interface Activity {
  id: string;
  name: string;
  category: ActivityCategory;
  impact: 'positive' | 'negative' | 'neutral';
}

export type ActivityCategory = 
  | 'exercise' 
  | 'social' 
  | 'work' 
  | 'hobby' 
  | 'self-care' 
  | 'sleep' 
  | 'diet' 
  | 'other';

export interface AIInsight {
  id: string;
  user_id: string;
  type: 'pattern' | 'suggestion' | 'warning' | 'achievement';
  title: string;
  description: string;
  confidence: number;
  created_at: string;
  is_read: boolean;
}

export interface MoodTrend {
  date: string;
  average_mood: number;
  entry_count: number;
}

export interface DashboardStats {
  current_streak: number;
  total_entries: number;
  average_mood: number;
  most_common_activities: string[];
  weekly_trend: MoodTrend[];
}

export interface N8nWebhookPayload {
  user_id: string;
  mood_data: Partial<MoodEntry>;
  insights_requested: boolean;
}

export interface N8nResponse {
  success: boolean;
  insights?: AIInsight[];
  recommendations?: string[];
  error?: string;
} 