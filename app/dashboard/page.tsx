'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar, 
  Brain, 
  BarChart3, 
  Plus,
  Activity,
  Target,
  Award
} from 'lucide-react';
import MoodTracker from '@/components/MoodTracker';
import DashboardStats from '@/components/DashboardStats';
import MoodHistory from '@/components/MoodHistory';
import AIInsights from '@/components/AIInsights';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('track');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    current_streak: 0,
    total_entries: 0,
    average_mood: 0,
    most_common_activities: [],
    weekly_trend: []
  });

  const tabs = [
    { id: 'track', label: 'Track Mood', icon: Plus },
    { id: 'history', label: 'History', icon: Calendar },
    { id: 'insights', label: 'AI Insights', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const handleMoodSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // This would integrate with the database
      console.log('Saving mood entry:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        total_entries: prev.total_entries + 1,
        current_streak: prev.current_streak + 1
      }));
      
      // Switch to insights tab to show AI analysis
      setActiveTab('insights');
    } catch (error) {
      console.error('Error saving mood entry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mental Health Tracker</h1>
              <p className="text-gray-600">Track your mood and get AI-powered insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-primary-600">{stats.current_streak} days</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Mood</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.average_mood.toFixed(1)}/4
                </p>
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
              <AIInsights />
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