'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Lightbulb, Heart, TrendingUp, AlertTriangle, Sparkles } from 'lucide-react';

interface AIInsight {
  type?: string;
  title?: string;
  description?: string;
  confidence?: number;
}

interface AIInsightsProps {
  userId: string;
  currentMood?: number;
}

export default function AIInsights({ userId, currentMood }: AIInsightsProps) {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'analysis' | 'patterns' | 'recommendations' | 'crisis'>('analysis');

  // Sample insights for demonstration
  const sampleInsights: AIInsight[] = [
    {
      type: "pattern",
      title: "Sleep Quality Impact",
      description: "Your mood improves significantly when you get 7-8 hours of sleep. Consider maintaining this sleep schedule.",
      confidence: 0.85
    },
    {
      type: "suggestion",
      title: "Exercise Benefits",
      description: "Physical activity consistently boosts your mood. Try to exercise 3-4 times per week.",
      confidence: 0.78
    },
    {
      type: "achievement",
      title: "Consistent Tracking",
      description: "Great job maintaining your mood tracking routine! This consistency helps identify patterns.",
      confidence: 0.92
    }
  ];

  const sampleRecommendations = [
    "Try to maintain your current sleep schedule of 7-8 hours",
    "Continue your exercise routine - it's positively impacting your mood",
    "Consider adding more social activities to your weekly routine",
    "Practice gratitude journaling to maintain positive mindset"
  ];

  useEffect(() => {
    setInsights(sampleInsights);
    setRecommendations(sampleRecommendations);
  }, []);

  const handleRequestInsights = async () => {
    setLoading(true);
    try {
      // This would call your n8n workflow
      // const response = await fetch('/api/ai/insights', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId, currentMood })
      // });
      // const data = await response.json();
      // setInsights(data.insights || []);
      // setRecommendations(data.recommendations || []);
      
      // For now, use sample data
      setTimeout(() => {
        setInsights(sampleInsights);
        setRecommendations(sampleRecommendations);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error requesting insights:', error);
      setLoading(false);
    }
  };

  const renderInsightCard = (insight: AIInsight, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md p-6 mb-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg mr-3">
            <Brain className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{insight.title || 'AI Insight'}</h3>
        </div>
        {insight.confidence && (
          <span className="text-sm text-gray-500">
            {Math.round(insight.confidence * 100)}% confidence
          </span>
        )}
      </div>

      <div className="mb-3">
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
          insight.type === 'pattern' ? 'bg-purple-100 text-purple-800' :
          insight.type === 'suggestion' ? 'bg-blue-100 text-blue-800' :
          insight.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
          insight.type === 'achievement' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {insight.type?.toUpperCase() || 'INSIGHT'}
        </span>
      </div>

      <p className="text-gray-600 leading-relaxed">{insight.description}</p>
    </motion.div>
  );

  const renderRecommendationCard = (recommendation: string, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 border border-gray-200 rounded-lg bg-white"
    >
      <div className="flex items-start">
        <Lightbulb className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
        <p className="text-gray-700">{recommendation}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
            AI Insights
          </h2>
          <p className="text-gray-600 mt-1">Personalized analysis and recommendations</p>
        </div>
        <button
          onClick={handleRequestInsights}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 mr-2" />
              Get Insights
            </>
          )}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'analysis', label: 'Analysis', icon: Brain },
            { id: 'patterns', label: 'Patterns', icon: TrendingUp },
            { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
            { id: 'crisis', label: 'Crisis Support', icon: AlertTriangle }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'analysis' && (
          <div>
            {insights.length > 0 ? (
              insights.map((insight, index) => renderInsightCard(insight, index))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No insights available yet. Click "Get Insights" to analyze your mood data.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Mood Patterns</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Weekly Trends</h4>
                <p className="text-blue-700">Your mood tends to improve on weekends and after exercise sessions.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Positive Triggers</h4>
                <p className="text-green-700">Social activities, adequate sleep, and outdoor time consistently boost your mood.</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Stress Patterns</h4>
                <p className="text-yellow-700">Stress levels peak mid-week and decrease significantly on weekends.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personalized Recommendations</h3>
            {recommendations.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {recommendations.map((rec, index) => renderRecommendationCard(rec, index))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Lightbulb className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No recommendations available yet. Track your mood to get personalized suggestions.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'crisis' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">Crisis Support</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-800 mb-2">Immediate Support</h4>
                <p className="text-red-700 mb-3">If you're experiencing a mental health crisis, help is available 24/7.</p>
                <div className="space-y-2">
                  <p className="text-sm text-red-600">
                    <strong>National Suicide Prevention Lifeline:</strong> 988
                  </p>
                  <p className="text-sm text-red-600">
                    <strong>Crisis Text Line:</strong> Text HOME to 741741
                  </p>
                </div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">Coping Strategies</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">Deep breathing exercises (4-7-8 technique)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">Progressive muscle relaxation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">Mindful walking in nature</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">Creative activities like drawing or writing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 