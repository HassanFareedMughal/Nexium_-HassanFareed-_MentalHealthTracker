# Mental Health Tracker

An AI-powered web application for tracking mental health and mood patterns with personalized insights and recommendations.

## Features

- **🔐 Magic Link Authentication** - Secure email-based login with Supabase
- **📊 Mood Tracking** - Daily mood, energy, sleep, and stress level tracking
- **🤖 AI-Powered Insights** - Personalized recommendations via n8n integration
- **📈 Analytics Dashboard** - Visual charts and progress tracking
- **🗄️ Dual Database** - Supabase for auth, MongoDB for data storage
- **🚀 Vercel Deployment** - CI/CD ready for production

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Authentication**: Supabase Auth with Magic Links
- **Database**: Supabase (auth) + MongoDB (data)
- **AI Integration**: n8n workflows for insights
- **Charts**: Recharts for data visualization
- **Deployment**: Vercel with CI/CD

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- MongoDB database
- n8n instance (optional for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mental-health-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

   # MongoDB Configuration
   MONGODB_URI=your_mongodb_connection_string_here

   # n8n Webhook Configuration
   N8N_WEBHOOK_URL=your_n8n_webhook_url_here

   # Next.js Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Enable Email Auth with Magic Links
   - Create the following tables:

   ```sql
   -- Mood entries table
   CREATE TABLE mood_entries (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     mood TEXT NOT NULL CHECK (mood IN ('excellent', 'good', 'okay', 'bad', 'terrible')),
     energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
     sleep_hours DECIMAL(3,1) CHECK (sleep_hours >= 0 AND sleep_hours <= 24),
     stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
     activities TEXT[],
     notes TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- AI insights table
   CREATE TABLE ai_insights (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     type TEXT NOT NULL CHECK (type IN ('pattern', 'suggestion', 'warning', 'achievement')),
     title TEXT NOT NULL,
     description TEXT NOT NULL,
     confidence DECIMAL(3,2) CHECK (confidence >= 0 AND confidence <= 1),
     is_read BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- User preferences table
   CREATE TABLE user_preferences (
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
     notification_enabled BOOLEAN DEFAULT TRUE,
     reminder_time TIME DEFAULT '20:00',
     theme TEXT DEFAULT 'light',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Set up MongoDB**
   - Create a MongoDB database
   - The app will automatically create collections as needed

6. **Set up n8n (Optional)**
   - Deploy n8n instance
   - Create webhook workflows for AI insights
   - Configure the webhook URL in environment variables

7. **Run the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
mental-health-tracker/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── AIInsights.tsx     # AI insights display
│   ├── DashboardStats.tsx # Analytics dashboard
│   ├── MoodHistory.tsx    # Mood history view
│   └── MoodTracker.tsx    # Mood tracking form
├── lib/                   # Utility libraries
│   ├── mongodb.ts         # MongoDB connection
│   ├── n8n.ts            # n8n integration
│   └── supabase.ts       # Supabase client
├── types/                 # TypeScript type definitions
│   └── index.ts          # App types
├── env.example           # Environment variables template
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
└── README.md             # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/magic-link` - Send magic link email

### Mood Tracking
- `POST /api/mood` - Create new mood entry
- `GET /api/mood?user_id=xxx` - Get user's mood entries

### AI Insights
- `POST /api/insights` - Request AI analysis
- `GET /api/insights?user_id=xxx` - Get user's insights

## Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel

2. **Configure Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Ensure production URLs are correct

3. **Deploy**
   - Vercel will automatically deploy on push to main branch

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mental-health-tracker
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/mental-health
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_production_secret
```

## Features in Detail

### Mood Tracking
- 5-point mood scale (Excellent to Terrible)
- Energy level (1-10)
- Sleep hours tracking
- Stress level (1-10)
- Activity tagging
- Notes and reflections

### AI Insights
- Pattern recognition
- Personalized recommendations
- Mood trend analysis
- Activity correlation insights
- Sleep quality impact analysis

### Analytics Dashboard
- Weekly mood trends
- Activity distribution
- Streak tracking
- Progress visualization
- Export capabilities

### Security & Privacy
- End-to-end encryption
- GDPR compliant
- User data ownership
- Secure authentication
- Privacy-first design

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@mentalhealthtracker.com or create an issue in this repository.

## Acknowledgments

- Built with Next.js and Supabase
- AI insights powered by n8n
- Icons from Lucide React
- Charts by Recharts
- Styling with Tailwind CSS 