'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Target } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    current_streak: number;
    total_entries: number;
    average_mood: number;
    most_common_activities: string[];
    weekly_trend: any[];
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  // Sample data for charts
  const weeklyData = [
    { day: 'Mon', mood: 3.2, entries: 1 },
    { day: 'Tue', mood: 3.8, entries: 1 },
    { day: 'Wed', mood: 2.5, entries: 1 },
    { day: 'Thu', mood: 4.1, entries: 1 },
    { day: 'Fri', mood: 3.9, entries: 1 },
    { day: 'Sat', mood: 4.3, entries: 1 },
    { day: 'Sun', mood: 3.7, entries: 1 },
  ];

  const activityData = [
    { activity: 'Exercise', count: 5 },
    { activity: 'Social', count: 3 },
    { activity: 'Work', count: 7 },
    { activity: 'Hobby', count: 2 },
    { activity: 'Self Care', count: 4 },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Analytics</h2>
        <p className="text-gray-600">Track your progress and patterns over time</p>
      </div>

      {/* Weekly Mood Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
          Weekly Mood Trend
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 4]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Activity Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-green-600" />
          Activity Distribution
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="activity" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="card text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-primary-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Current Streak</h4>
          <p className="text-3xl font-bold text-primary-600">{stats.current_streak} days</p>
        </div>

        <div className="card text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Total Entries</h4>
          <p className="text-3xl font-bold text-green-600">{stats.total_entries}</p>
        </div>

        <div className="card text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-yellow-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Average Mood</h4>
          <p className="text-3xl font-bold text-yellow-600">{stats.average_mood.toFixed(1)}/4</p>
        </div>
      </motion.div>

      {/* Most Common Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Common Activities</h3>
        <div className="space-y-3">
          {stats.most_common_activities.length > 0 ? (
            stats.most_common_activities.map((activity, index) => (
              <div key={activity} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{activity}</span>
                <span className="text-sm text-gray-600">#{index + 1}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No activity data available yet</p>
          )}
        </div>
      </motion.div>
    </div>
  );
} 