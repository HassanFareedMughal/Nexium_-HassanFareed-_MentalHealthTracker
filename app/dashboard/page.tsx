'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Activity, 
  Target, 
  Award, 
  Brain,
  BarChart3,
  History,
  Sparkles,
  LogOut
} from 'lucide-react';
import MoodTracker from '@/components/MoodTracker';
import MoodHistory from '@/components/MoodHistory';
import AIInsights from '@/components/AIInsights';
import DashboardStats from '@/components/DashboardStats';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@supabase/supabase-js';

const tabs = [
  { id: 'track', label: 'Track Mood', icon: TrendingUp },
  { id: 'history', label: 'History', icon: History },
  { id: 'insights', label: 'AI Insights', icon: Brain },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('track');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);

  // Handle authentication tokens from URL (magic link)
  useEffect(() => {
    const handleAuthTokens = async () => {
      const access_token = searchParams.get('access_token');
      const refresh_token = searchParams.get('refresh_token');
      const error = searchParams.get('error');

      if (error) {
        console.error('Auth error from URL:', error);
        router.push('/?error=auth_failed');
        return;
      }

      if (access_token && !user && !isProcessingAuth) {
        setIsProcessingAuth(true);
        console.log('Processing auth tokens from URL...');

        try {
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
          const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
          
          if (!supabaseUrl || !supabaseAnonKey) {
            console.error('Supabase not configured');
            router.push('/?error=config_error');
            return;
          }

          const supabase = createClient(supabaseUrl, supabaseAnonKey);
          
          // Set the session with the tokens
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token: refresh_token || '',
          });

          if (sessionError) {
            console.error('Error setting session:', sessionError);
            router.push('/?error=session_error');
            return;
          }

          if (!data.user) {
            console.error('No user found after setting session');
            router.push('/?error=no_user');
            return;
          }

          console.log('Session set successfully for user:', data.user.email);
          
          // Clear the URL parameters
          router.replace('/dashboard');
        } catch (error) {
          console.error('Error processing auth tokens:', error);
          router.push('/?error=callback_failed');
        } finally {
          setIsProcessingAuth(false);
        }
      }
    };

    handleAuthTokens();
  }, [searchParams, user, isProcessingAuth, router]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user && !isProcessingAuth) {
      router.push('/');
    }
  }, [user, loading, router, isProcessingAuth]);

  // Show loading while checking auth or processing tokens
  if (loading || isProcessingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {isProcessingAuth ? 'Setting up your session...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  // Mock stats for demonstration
  const stats = {
    current_streak: 5,
    total_entries: 23,
    average_mood: 7.2,
    most_common_activities: ['exercise', 'social', 'work'],
    weekly_trend: [
      { date: '2024-01-01', average_mood: 7.5, entry_count: 1 },
      { date: '2024-01-02', average_mood: 6.8, entry_count: 1 },
      { date: '2024-01-03', average_mood: 8.2, entry_count: 1 },
      { date: '2024-01-04', average_mood: 7.0, entry_count: 1 },
      { date: '2024-01-05', average_mood: 7.8, entry_count: 1 },
      { date: '2024-01-06', average_mood: 8.5, entry_count: 1 },
      { date: '2024-01-07', average_mood: 7.2, entry_count: 1 },
    ],
  };

  const handleMoodSubmit = async (data: any) => {
    // This function is no longer needed since MoodTracker handles submission directly
    return;
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900"
            >
              Welcome back! 👋
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-gray-600"
            >
              Track your mental health journey and get AI-powered insights
            </motion.p>
            {user.email && (
              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-1 text-sm text-gray-500"
              >
                Logged in as: {user.email}
              </motion.p>
            )}
          </div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={handleSignOut}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </motion.button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Mood</p>
                <p className="text-2xl font-bold text-gray-900">{stats.average_mood}/10</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Entries</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total_entries}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900">{stats.current_streak} days</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="p-2 bg-mental-100 rounded-lg">
                <Award className="w-6 h-6 text-mental-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Best Streak</p>
                <p className="text-2xl font-bold text-gray-900">7 days</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'track' && (
              <MoodTracker />
            )}
            
            {activeTab === 'history' && (
              <MoodHistory />
            )}
            
            {activeTab === 'insights' && (
              <AIInsights userId={user.id} currentMood={7} />
            )}
            
            {activeTab === 'analytics' && (
              <DashboardStats stats={stats} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 