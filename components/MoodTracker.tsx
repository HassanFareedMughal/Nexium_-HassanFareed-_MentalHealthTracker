'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smile, 
  Frown, 
  Meh, 
  Heart, 
  Zap,
  Activity,
  Coffee,
  BookOpen,
  Heart as HeartIcon,
  Briefcase
} from 'lucide-react';

export default function MoodTracker() {
  const [mood, setMood] = useState('');
  const [energy, setEnergy] = useState(5);
  const [sleep, setSleep] = useState(7);
  const [stress, setStress] = useState(5);
  const [activities, setActivities] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const moodOptions = [
    { value: 'excellent', label: 'Excellent', icon: Heart, color: 'bg-green-500' },
    { value: 'good', label: 'Good', icon: Smile, color: 'bg-blue-500' },
    { value: 'okay', label: 'Okay', icon: Meh, color: 'bg-yellow-500' },
    { value: 'bad', label: 'Bad', icon: Frown, color: 'bg-orange-500' },
    { value: 'terrible', label: 'Terrible', icon: Zap, color: 'bg-red-500' },
  ];

  const activityOptions = [
    { value: 'exercise', label: 'Exercise', icon: Activity },
    { value: 'social', label: 'Social', icon: Coffee },
    { value: 'hobby', label: 'Hobby', icon: BookOpen },
    { value: 'self_care', label: 'Self Care', icon: HeartIcon },
    { value: 'work', label: 'Work', icon: Briefcase },
  ];

  const handleActivityToggle = (activity: string) => {
    setActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSave = async () => {
    console.log('=== SAVE BUTTON CLICKED ===');
    alert('Save button clicked!');
    
    console.log('Current mood:', mood);
    if (!mood) {
      console.log('No mood selected');
      alert('Please select a mood first');
      return;
    }

    console.log('Mood selected, proceeding...');
    alert('Saving mood entry...');

    const moodData = {
      user_id: 'user-123',
      mood_level: mood === 'excellent' ? 10 : 
                  mood === 'good' ? 8 : 
                  mood === 'okay' ? 6 : 
                  mood === 'bad' ? 4 : 2,
      energy_level: energy,
      sleep_hours: sleep,
      stress_level: stress,
      activities: activities,
      notes: notes,
      timestamp: new Date().toISOString(),
    };

    console.log('Mood data to send:', moodData);

    try {
      console.log('Making API call to /api/test-mood...');
      const response = await fetch('/api/test-mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moodData),
      });

      console.log('API response status:', response.status);
      const responseData = await response.json();
      console.log('API response data:', responseData);

      if (response.ok) {
        console.log('Success! Resetting form...');
        alert('✅ Mood saved successfully!');
        // Reset form
        setMood('');
        setEnergy(5);
        setSleep(7);
        setStress(5);
        setActivities([]);
        setNotes('');
      } else {
        console.log('API call failed');
        alert('❌ Failed to save mood');
      }
    } catch (error) {
      console.error('Error in save function:', error);
      alert('❌ Error saving mood: ' + error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">How are you feeling today?</h2>
      
      {/* Mood Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What's your mood right now?
        </label>
        <div className="grid grid-cols-5 gap-3">
          {moodOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setMood(option.value)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                mood === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <option.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Energy Level */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Energy Level (1-10): {energy}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={energy}
          onChange={(e) => setEnergy(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Sleep Hours */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How many hours did you sleep last night?
        </label>
        <input
          type="number"
          min="0"
          max="24"
          step="0.5"
          value={sleep}
          onChange={(e) => setSleep(parseFloat(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Stress Level */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stress Level (1-10): {stress}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={stress}
          onChange={(e) => setStress(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Activities */}
      <div className="mb-6">
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
                activities.includes(activity.value)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
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
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Any additional notes?
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="How was your day? Any specific thoughts or feelings?"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
      >
        Save Entry
      </button>
    </div>
  );
} 