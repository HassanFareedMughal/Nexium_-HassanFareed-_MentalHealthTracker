import { createClient } from '@supabase/supabase-js';
import { MoodEntry, AIInsight } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const auth = supabase?.auth;

// Database helper functions
export const db = {
  // Mood entries
  async createMoodEntry(entry: Omit<MoodEntry, 'id' | 'created_at' | 'updated_at'>) {
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data, error } = await supabase
      .from('mood_entries')
      .insert([entry])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getMoodEntries(userId: string, limit = 50) {
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async updateMoodEntry(id: string, updates: Partial<MoodEntry>) {
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data, error } = await supabase
      .from('mood_entries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteMoodEntry(id: string) {
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { error } = await supabase
      .from('mood_entries')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // AI Insights
  async createInsight(insight: Omit<AIInsight, 'id' | 'created_at'>) {
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data, error } = await supabase
      .from('ai_insights')
      .insert([insight])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getInsights(userId: string, limit = 20) {
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async markInsightAsRead(id: string) {
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { error } = await supabase
      .from('ai_insights')
      .update({ is_read: true })
      .eq('id', id);
    
    if (error) throw error;
  },

  // User preferences
  async getUserPreferences(userId: string) {
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async updateUserPreferences(userId: string, preferences: any) {
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({ user_id: userId, ...preferences })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}; 