import { MongoClient, Db } from 'mongodb';
import { MoodEntry, AIInsight, User } from '@/types';

const uri = process.env.MONGODB_URI!;
const dbName = 'mental-health-tracker';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!uri) {
    console.error('MONGODB_URI is not set');
    throw new Error('MONGODB_URI environment variable is not configured');
  }

  try {
    console.log('Connecting to MongoDB...');
    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db(dbName);
    
    cachedClient = client;
    cachedDb = db;
    
    console.log('Successfully connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export const mongodb = {
  // Mood entries
  async createMoodEntry(entry: Omit<MoodEntry, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { db } = await connectToDatabase();
      const now = new Date().toISOString();
      
      const newEntry = {
        ...entry,
        id: Math.random().toString(36).substr(2, 9),
        created_at: now,
        updated_at: now,
      };
      
      console.log('Inserting mood entry:', newEntry);
      const result = await db.collection('mood_entries').insertOne(newEntry);
      console.log('Mood entry inserted with ID:', result.insertedId);
      return { ...newEntry, _id: result.insertedId };
    } catch (error) {
      console.error('Error creating mood entry in MongoDB:', error);
      throw error;
    }
  },

  async getMoodEntries(userId: string, limit = 50) {
    const { db } = await connectToDatabase();
    
    const entries = await db
      .collection('mood_entries')
      .find({ user_id: userId })
      .sort({ created_at: -1 })
      .limit(limit)
      .toArray();
    
    return entries;
  },

  async updateMoodEntry(id: string, updates: Partial<MoodEntry>) {
    const { db } = await connectToDatabase();
    
    const result = await db
      .collection('mood_entries')
      .updateOne(
        { id },
        { 
          $set: { 
            ...updates, 
            updated_at: new Date().toISOString() 
          } 
        }
      );
    
    return result;
  },

  async deleteMoodEntry(id: string) {
    const { db } = await connectToDatabase();
    
    const result = await db
      .collection('mood_entries')
      .deleteOne({ id });
    
    return result;
  },

  // AI Insights
  async createInsight(insight: Omit<AIInsight, 'id' | 'created_at'>) {
    const { db } = await connectToDatabase();
    const now = new Date().toISOString();
    
    const newInsight = {
      ...insight,
      id: Math.random().toString(36).substr(2, 9),
      created_at: now,
    };
    
    const result = await db.collection('ai_insights').insertOne(newInsight);
    return { ...newInsight, _id: result.insertedId };
  },

  async getInsights(userId: string, limit = 20) {
    const { db } = await connectToDatabase();
    
    const insights = await db
      .collection('ai_insights')
      .find({ user_id: userId })
      .sort({ created_at: -1 })
      .limit(limit)
      .toArray();
    
    return insights;
  },

  async markInsightAsRead(id: string) {
    const { db } = await connectToDatabase();
    
    const result = await db
      .collection('ai_insights')
      .updateOne(
        { id },
        { $set: { is_read: true } }
      );
    
    return result;
  },

  // Analytics
  async getMoodTrends(userId: string, days = 30) {
    const { db } = await connectToDatabase();
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const pipeline = [
      {
        $match: {
          user_id: userId,
          created_at: { $gte: startDate.toISOString() }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: { $dateFromString: { dateString: "$created_at" } } } },
          average_mood: { $avg: { $indexOfArray: [["terrible", "bad", "okay", "good", "excellent"], "$mood"] } },
          entry_count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ];
    
    const trends = await db.collection('mood_entries').aggregate(pipeline).toArray();
    return trends.map(trend => ({
      date: trend._id,
      average_mood: Math.round(trend.average_mood * 100) / 100,
      entry_count: trend.entry_count
    }));
  },

  async getDashboardStats(userId: string) {
    const { db } = await connectToDatabase();
    
    // Get current streak
    const entries = await db
      .collection('mood_entries')
      .find({ user_id: userId })
      .sort({ created_at: -1 })
      .toArray();
    
    let streak = 0;
    const today = new Date().toDateString();
    
    for (const entry of entries) {
      const entryDate = new Date(entry.created_at).toDateString();
      if (entryDate === today || 
          new Date(entry.created_at).getTime() === new Date(today).getTime() - (streak * 24 * 60 * 60 * 1000)) {
        streak++;
      } else {
        break;
      }
    }
    
    // Get average mood
    const moodValues = entries.map(entry => 
      ['terrible', 'bad', 'okay', 'good', 'excellent'].indexOf(entry.mood)
    );
    const averageMood = moodValues.length > 0 
      ? moodValues.reduce((a, b) => a + b, 0) / moodValues.length 
      : 0;
    
    // Get most common activities
    const allActivities = entries.flatMap(entry => entry.activities);
    const activityCounts = allActivities.reduce((acc, activity) => {
      acc[activity] = (acc[activity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const mostCommonActivities = Object.entries(activityCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([activity]) => activity);
    
    return {
      current_streak: streak,
      total_entries: entries.length,
      average_mood: Math.round(averageMood * 100) / 100,
      most_common_activities: mostCommonActivities,
      weekly_trend: await this.getMoodTrends(userId, 7)
    };
  }
}; 