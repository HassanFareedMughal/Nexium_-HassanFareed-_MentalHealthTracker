'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Meh, Frown, Activity, Coffee, BookOpen, Users, Heart } from 'lucide-react';

interface MoodTrackerProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const moodOptions = [
  { value: 'excellent', label: 'Excellent', icon: Smile, color: 'bg-green-500' },
  { value: 'good', label: 'Good', icon: Smile, color: 'bg-blue-500' },
  { value: 'okay', label: 'Okay', icon: Meh, color: 'bg-yellow-500' },
  { value: 'bad', label: 'Bad', icon: Frown, color: 'bg-orange-500' },
  { value: 'terrible', label: 'Terrible', icon: Frown, color: 'bg-red-500' },
];

const activityOptions = [
  { value: 'exercise', label: 'Exercise', icon: Activity },
  { value: 'social', label: 'Social', icon: Users },
  { value: 'work', label: 'Work', icon: Coffee },
  { value: 'hobby', label: 'Hobby', icon: BookOpen },
  { value: 'self-care', label: 'Self Care', icon: Heart },
];

export default function MoodTracker({ onSubmit, isLoading = false }: MoodTrackerProps) {
  const [formData, setFormData] = useState({
    mood: '',
    energy_level: 5,
    sleep_hours: 8,
    stress_level: 3,
    activities: [] as string[],
    notes: '',
  });

  const handleMoodSelect = (mood: string) => {
    setFormData(prev => ({ ...prev, mood }));
  };

  const handleActivityToggle = (activity: string) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.mood) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">How are you feeling today?</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mood Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What's your mood right now?
          </label>
          <div className="grid grid-cols-5 gap-3">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => handleMoodSelect(mood.value)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  formData.mood === mood.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-12 h-12 ${mood.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <mood.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Energy Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Energy Level (1-10): {formData.energy_level}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.energy_level}
            onChange={(e) => setFormData(prev => ({ ...prev, energy_level: parseInt(e.target.value) }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Sleep Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How many hours did you sleep last night?
          </label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={formData.sleep_hours}
            onChange={(e) => setFormData(prev => ({ ...prev, sleep_hours: parseFloat(e.target.value) }))}
            className="input-field"
          />
        </div>

        {/* Stress Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stress Level (1-10): {formData.stress_level}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.stress_level}
            onChange={(e) => setFormData(prev => ({ ...prev, stress_level: parseInt(e.target.value) }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Activities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What activities did you do today?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {activityOptions.map((activity) => (
              <button
                key={activity.value}
                type="button"
                onClick={() => handleActivityToggle(activity.value)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-2 ${
                  formData.activities.includes(activity.value)
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <activity.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{activity.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any additional notes?
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            rows={3}
            className="input-field"
            placeholder="How was your day? Any specific thoughts or feelings?"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!formData.mood || isLoading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Entry'}
        </button>
      </form>
    </motion.div>
  );
} 