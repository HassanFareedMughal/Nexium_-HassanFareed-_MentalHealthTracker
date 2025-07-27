'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Lightbulb, TrendingUp, AlertTriangle, Award, CheckCircle } from 'lucide-react';

// Sample AI insights - in real app this would come from n8n
const sampleInsights = [
  {
    id: '1',
    type: 'pattern',
    title: 'Exercise Boosts Your Mood',
    description: 'You consistently report better mood on days when you exercise. Consider adding more physical activity to your routine.',
    confidence: 0.85,
    created_at: new Date().toISOString(),
    is_read: false,
  },
  {
    id: '2',
    type: 'suggestion',
    title: 'Sleep Quality Matters',
    description: 'Your mood tends to be better when you get 7-8 hours of sleep. Try to maintain a consistent sleep schedule.',
    confidence: 0.78,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    is_read: true,
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Great Progress!',
    description: 'You\'ve maintained a 5-day streak of tracking your mood. Consistency is key to understanding your patterns.',
    confidence: 1.0,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    is_read: true,
  },
  {
    id: '4',
    type: 'warning',
    title: 'Stress Level Trend',
    description: 'Your stress levels have been increasing over the past week. Consider stress management techniques like meditation.',
    confidence: 0.72,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    is_read: false,
  },
];

const insightIcons = {
  pattern: TrendingUp,
  suggestion: Lightbulb,
  warning: AlertTriangle,
  achievement: Award,
};

const insightColors = {
  pattern: 'bg-blue-100 text-blue-700 border-blue-200',
  suggestion: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  warning: 'bg-red-100 text-red-700 border-red-200',
  achievement: 'bg-green-100 text-green-700 border-green-200',
};

export default function AIInsights() {
  const [insights, setInsights] = useState(sampleInsights);
  const [isLoading, setIsLoading] = useState(false);

  const handleMarkAsRead = (id: string) => {
    setInsights(prev => 
      prev.map(insight => 
        insight.id === id ? { ...insight, is_read: true } : insight
      )
    );
  };

  const unreadCount = insights.filter(insight => !insight.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-primary-600" />
            AI Insights
          </h2>
          <p className="text-gray-600">Personalized insights and recommendations based on your mood patterns</p>
        </div>
        {unreadCount > 0 && (
          <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
            {unreadCount} new
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your patterns...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card border-l-4 ${
                insight.is_read ? 'opacity-75' : ''
              } ${
                insightColors[insight.type as keyof typeof insightColors]
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${
                    insightColors[insight.type as keyof typeof insightColors].split(' ')[0]
                  }`}>
                    {(() => {
                      const Icon = insightIcons[insight.type as keyof typeof insightIcons];
                      return <Icon className="w-5 h-5" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {insight.title}
                      </h3>
                      {!insight.is_read && (
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Confidence: {Math.round(insight.confidence * 100)}%</span>
                        <span>•</span>
                        <span>{new Date(insight.created_at).toLocaleDateString()}</span>
                      </div>
                      {!insight.is_read && (
                        <button
                          onClick={() => handleMarkAsRead(insight.id)}
                          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {insights.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No insights yet</h3>
          <p className="text-gray-600">Start tracking your mood to receive personalized AI insights</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="card bg-gradient-to-r from-primary-50 to-mental-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">Mark all as read</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">Request analysis</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium">Get recommendations</span>
          </button>
        </div>
      </div>
    </div>
  );
} 