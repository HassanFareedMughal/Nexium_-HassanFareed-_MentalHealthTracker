'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Activity, 
  Target, 
  Award, 
  Brain,
  BarChart3,
  History,
  Sparkles
} from 'lucide-react';
import MoodTracker from '@/components/MoodTracker';
import MoodHistory from '@/components/MoodHistory';
import AIInsights from '@/components/AIInsights';
import DashboardStats from '@/components/DashboardStats';

const tabs = [
  { id: 'track', label: 'Track Mood', icon: TrendingUp },
  { id: 'history', label: 'History', icon: History },
  { id: 'insights', label: 'AI Insights', icon: Brain },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('track');
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Mood submitted:', data);
      // Here you would typically call your API
    } catch (error) {
      console.error('Error submitting mood:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
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
              <MoodTracker onSubmit={handleMoodSubmit} isLoading={isLoading} />
            )}
            
            {activeTab === 'history' && (
              <MoodHistory />
            )}
            
            {activeTab === 'insights' && (
              <AIInsights userId="demo-user" currentMood={7} />
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