'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Activity, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

// Sample data - in real app this would come from the database
const sampleEntries = [
  {
    id: '1',
    mood: 'excellent',
    energy_level: 8,
    sleep_hours: 8,
    stress_level: 2,
    activities: ['exercise', 'social'],
    notes: 'Had a great workout and met with friends. Feeling energized!',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    mood: 'good',
    energy_level: 6,
    sleep_hours: 7,
    stress_level: 4,
    activities: ['work', 'hobby'],
    notes: 'Productive day at work, managed to work on my project.',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    mood: 'okay',
    energy_level: 5,
    sleep_hours: 6,
    stress_level: 6,
    activities: ['work'],
    notes: 'Busy day, feeling a bit tired.',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const moodColors = {
  excellent: 'bg-green-500',
  good: 'bg-blue-500',
  okay: 'bg-yellow-500',
  bad: 'bg-orange-500',
  terrible: 'bg-red-500',
};

const moodLabels = {
  excellent: 'Excellent',
  good: 'Good',
  okay: 'Okay',
  bad: 'Bad',
  terrible: 'Terrible',
};

export default function MoodHistory() {
  const [entries, setEntries] = useState(sampleEntries);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);

  const handleDelete = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const handleEdit = (entry: any) => {
    setSelectedEntry(entry);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mood History</h2>
        <p className="text-gray-600">Review your past mood entries and track your progress</p>
      </div>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${moodColors[entry.mood as keyof typeof moodColors]} rounded-full flex items-center justify-center text-white font-semibold`}>
                  {moodLabels[entry.mood as keyof typeof moodLabels].charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {moodLabels[entry.mood as keyof typeof moodLabels]}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {format(new Date(entry.created_at), 'MMM dd, yyyy')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {format(new Date(entry.created_at), 'HH:mm')}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(entry)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Energy Level</p>
                <p className="text-lg font-semibold text-gray-900">{entry.energy_level}/10</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Sleep Hours</p>
                <p className="text-lg font-semibold text-gray-900">{entry.sleep_hours}h</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Stress Level</p>
                <p className="text-lg font-semibold text-gray-900">{entry.stress_level}/10</p>
              </div>
            </div>

            {entry.activities.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <Activity className="w-4 h-4 text-gray-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Activities</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {entry.activities.map((activity: string) => (
                    <span
                      key={activity}
                      className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {entry.notes && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">{entry.notes}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No entries yet</h3>
          <p className="text-gray-600">Start tracking your mood to see your history here</p>
        </div>
      )}
    </div>
  );
} 