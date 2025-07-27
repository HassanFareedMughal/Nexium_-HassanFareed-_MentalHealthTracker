# 🧠 AI-Powered Mental Health Tracker

A comprehensive mental health tracking application with AI-powered insights, built with Next.js, Supabase, MongoDB, and n8n workflows.

## ✨ Features

### 🔐 Authentication
- **Magic Link Authentication** - Secure email-based login
- **Supabase Integration** - Robust user management
- **Session Management** - Persistent user sessions

### 📊 Mood Tracking
- **Daily Mood Logging** - Track mood, energy, sleep, stress
- **Activity Tracking** - Log activities that affect your mood
- **Notes & Context** - Add personal notes to entries
- **Visual History** - Beautiful charts and analytics

### 🤖 AI-Powered Insights
- **Personalized Analysis** - AI analyzes your mood patterns
- **Smart Recommendations** - Actionable suggestions based on data
- **Pattern Recognition** - Identifies trends in your mental health
- **Crisis Support** - Specialized help for low mood situations
- **Positive Reinforcement** - Encouraging progress messages

### 📈 Analytics & Visualization
- **Mood Trends** - Weekly and monthly mood charts
- **Activity Distribution** - See what activities boost your mood
- **Progress Tracking** - Visualize your mental health journey
- **Dashboard Stats** - Key metrics at a glance

### 🔧 Technical Features
- **Real-time Updates** - Instant data synchronization
- **Responsive Design** - Works on all devices
- **Offline Support** - Basic functionality without internet
- **Data Export** - Export your mood data
- **Privacy Focused** - Your data stays private

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization

### Backend & Database
- **Supabase** - Authentication and PostgreSQL database
- **MongoDB** - NoSQL database for mood data
- **Next.js API Routes** - Serverless backend functions

### AI & Automation
- **n8n** - Workflow automation platform
- **OpenAI GPT** - AI-powered insights and recommendations
- **Webhook Integration** - Real-time AI processing

### Deployment
- **Vercel** - Frontend deployment
- **Docker** - n8n containerization
- **CI/CD** - Automated deployment pipeline

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker (for n8n)
- Supabase account
- MongoDB database
- OpenAI API key

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd mental-health-tracker
npm install
```

### 2. Environment Setup
```bash
cp env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# n8n AI Integration
N8N_WEBHOOK_URL=http://localhost:5678/webhook/mental-health
N8N_BASE_URL=http://localhost:5678

# OpenAI
OPENAI_API_KEY=your_openai_api_key
```

### 3. Database Setup

#### Supabase Setup
1. Create a new Supabase project
2. Run the SQL from `supabase-setup.sql` in the SQL Editor
3. Enable Email Auth in Authentication settings

#### MongoDB Setup
1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Add it to `.env.local`

### 4. n8n AI Setup

#### Option A: Docker (Recommended)
```bash
# Start n8n with Docker
docker-compose up -d

# Access n8n at http://localhost:5678
```

#### Option B: Manual Installation
```bash
npm install n8n -g
n8n start
```

#### Import Workflow
1. Open n8n at `http://localhost:5678`
2. Click "Import from file"
3. Select `n8n-workflow.json`
4. Configure OpenAI API key in the workflow
5. Activate the workflow

### 5. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

## 🤖 AI Features Setup

### n8n Workflow Features
- **Webhook Trigger** - Receives mood data from your app
- **Data Processing** - Validates and prepares data for AI
- **OpenAI Integration** - Generates personalized insights
- **Response Formatting** - Returns structured JSON responses

### AI Capabilities
- **Mood Analysis** - Understands your emotional state
- **Pattern Recognition** - Identifies trends in your data
- **Personalized Recommendations** - Actionable suggestions
- **Crisis Support** - Specialized help for low mood

### Testing AI Integration
```bash
# Test the n8n webhook
node test-n8n.js
```

## 📁 Project Structure

```
mental-health-tracker/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── AIInsights.tsx    # AI insights display
│   ├── MoodTracker.tsx   # Mood tracking form
│   └── DashboardStats.tsx # Analytics components
├── lib/                   # Utility libraries
│   ├── supabase.ts       # Supabase client
│   ├── mongodb.ts        # MongoDB connection
│   ├── n8n.ts           # n8n integration
│   └── auth-context.tsx  # Authentication context
├── types/                 # TypeScript definitions
├── n8n-workflow.json     # n8n workflow configuration
├── docker-compose.yml    # n8n Docker setup
└── README.md             # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/magic-link` - Send magic link email

### Mood Tracking
- `POST /api/mood` - Create mood entry with AI insights
- `GET /api/mood?user_id=xxx` - Get mood entries

### AI Integration
- `POST /api/ai/insights` - Request AI analysis (via n8n)
- `GET /api/ai/patterns` - Get mood pattern analysis

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### n8n Production Setup
1. Deploy n8n to your server or cloud
2. Update webhook URLs in environment variables
3. Configure SSL certificates for security

### Environment Variables for Production
```env
# Production URLs
N8N_WEBHOOK_URL=https://your-n8n-domain.com/webhook/mental-health
N8N_BASE_URL=https://your-n8n-domain.com

# Database URLs
MONGODB_URI=your_production_mongodb_uri
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
```

## 🧪 Testing

### Run Tests
```bash
# Test n8n integration
node test-n8n.js

# Test API endpoints
npm run test

# Test UI components
npm run test:ui
```

### Manual Testing
1. **Authentication** - Test magic link login
2. **Mood Tracking** - Add mood entries
3. **AI Insights** - Verify AI recommendations
4. **Analytics** - Check charts and stats

## 🔒 Security

### Data Protection
- **Encrypted Storage** - All data encrypted at rest
- **Secure Authentication** - Supabase Auth with magic links
- **API Security** - Rate limiting and validation
- **Privacy First** - No data sharing with third parties

### Environment Security
- **Secret Management** - Environment variables for secrets
- **API Key Rotation** - Regular key updates
- **HTTPS Only** - Secure connections in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📞 Support

- **Documentation** - Check the `/docs` folder
- **Issues** - Report bugs on GitHub
- **Discussions** - Ask questions in GitHub Discussions

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- **Supabase** - Authentication and database
- **n8n** - Workflow automation
- **OpenAI** - AI capabilities
- **Next.js** - React framework
- **Tailwind CSS** - Styling framework

---

**🎉 Congratulations!** Your AI-powered Mental Health Tracker is ready to help users track their mental health with intelligent insights and personalized recommendations. 