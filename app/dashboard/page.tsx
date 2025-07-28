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
  Sparkles,
  LogOut
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Mental Health Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome!</span>
              <button className="text-gray-600 hover:text-gray-900">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'track' && (
            <MoodTracker />
          )}
          {activeTab === 'history' && (
            <MoodHistory />
          )}
          {activeTab === 'insights' && (
            <AIInsights userId="user-123" currentMood={7} />
          )}
          {activeTab === 'analytics' && (
            <DashboardStats stats={{
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
              ]
            }} />
          )}
        </div>
      </main>
    </div>
  );
} 