# 🤖 Complete n8n AI Setup Guide

## Overview
This guide will help you set up n8n with AI features for your Mental Health Tracker. The n8n workflow provides:
- **Mood Analysis**: AI-powered insights into your emotional state
- **Pattern Recognition**: Identifies trends in your mood data
- **Personalized Recommendations**: Actionable suggestions based on your data
- **Crisis Support**: Specialized support for low mood situations
- **Positive Reinforcement**: Encouraging messages and progress tracking

## 🚀 Quick Start (Docker - Recommended)

### 1. Install Docker
Download and install Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop/)

### 2. Create n8n Configuration
```bash
# Create n8n directory
mkdir n8n-mental-health
cd n8n-mental-health

# Create docker-compose.yml
```

### 3. Run n8n
```bash
# Start n8n
docker-compose up -d

# Access n8n at http://localhost:5678
```

## 📋 Manual Setup Options

### Option A: Docker Compose (Recommended)
Use the provided `docker-compose.yml` file in your project root.

### Option B: npm Installation
```bash
npm install n8n -g
n8n start
```

### Option C: Direct Download
1. Download n8n from [n8n.io](https://n8n.io/)
2. Extract and run the executable
3. Access at http://localhost:5678

## 🔧 Configuration Steps

### Step 1: Access n8n
1. Open your browser to `http://localhost:5678`
2. Create your first account
3. You'll be redirected to the n8n dashboard

### Step 2: Import the Workflow
1. Click **"Import from file"** in the top right
2. Select the `n8n-workflow-complete.json` file
3. Click **"Import"**
4. The workflow will appear in your workspace

### Step 3: Configure OpenAI Integration
1. In the workflow, click on the **"AI Analysis"** node
2. Click **"Add Credential"**
3. Select **"OpenAI API"**
4. Enter your OpenAI API key
5. Save the credential

### Step 4: Activate the Workflow
1. Click the **"Active"** toggle in the top right
2. The workflow is now ready to receive webhooks

### Step 5: Get the Webhook URL
1. Click on the **"Webhook Trigger"** node
2. Copy the webhook URL (e.g., `http://localhost:5678/webhook/mental-health-ai`)
3. Add this URL to your `.env.local` file:
   ```
   N8N_WEBHOOK_URL=http://localhost:5678/webhook/mental-health-ai
   ```

## 🔑 Required API Keys

### OpenAI API Key
1. Go to [platform.openai.com](https://platform.openai.com/)
2. Create an account or sign in
3. Go to **API Keys** section
4. Create a new API key
5. Copy the key and add it to n8n credentials

### Environment Variables
Add these to your `.env.local`:
```env
# n8n Configuration
N8N_WEBHOOK_URL=http://localhost:5678/webhook/mental-health-ai
N8N_BASE_URL=http://localhost:5678

# OpenAI (optional - can be set in n8n)
OPENAI_API_KEY=your_openai_api_key_here
```

## 🧪 Testing the Integration

### Test the Webhook
```bash
curl -X POST http://localhost:5678/webhook/mental-health-ai \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "test-user",
    "mood_level": 7,
    "energy_level": 6,
    "sleep_hours": 8,
    "stress_level": 4,
    "activities": ["exercise", "social"],
    "notes": "Feeling good today!"
  }'
```

### Expected Response
```json
{
  "success": true,
  "insights": {
    "mood_analysis": "Your current mood level of 7/10 indicates...",
    "patterns": "I notice you tend to feel better...",
    "recommendations": [
      "Try to maintain your current sleep schedule...",
      "Continue your exercise routine..."
    ],
    "positive_message": "You're doing great!...",
    "coping_strategies": [
      "Deep breathing exercises...",
      "Progressive muscle relaxation..."
    ]
  },
  "message": "AI insights generated successfully",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 🔄 Workflow Features

### 1. Webhook Trigger
- **Endpoint**: `/webhook/mental-health-ai`
- **Method**: POST
- **Accepts**: Mood data with user context

### 2. Data Processor
- Validates incoming data
- Prepares data for AI analysis
- Adds context from recent entries

### 3. AI Analysis
- Uses OpenAI GPT to analyze mood
- Provides personalized insights
- Generates actionable recommendations

### 4. Crisis Support
- Automatically triggered for mood ≤ 3
- Provides immediate coping strategies
- Includes crisis hotline information

### 5. Insight Processor
- Structures AI responses
- Extracts key insights
- Formats data for the app

### 6. Response
- Returns structured JSON response
- Includes success status and timestamp

## 🛠️ Customization

### Modify AI Prompts
1. Click on **"AI Analysis"** node
2. Edit the prompt in the **"Prompt"** field
3. Customize the AI's personality and focus

### Add New Features
1. Add new nodes to the workflow
2. Connect them to existing nodes
3. Test with sample data

### Environment-Specific Configuration
- **Development**: `http://localhost:5678`
- **Production**: Your n8n instance URL
- **Staging**: Your staging n8n URL

## 🚨 Troubleshooting

### Common Issues

#### 1. Webhook Not Receiving Data
- Check if n8n is running: `http://localhost:5678`
- Verify webhook URL in `.env.local`
- Check n8n logs for errors

#### 2. OpenAI API Errors
- Verify API key is correct
- Check OpenAI account has credits
- Ensure API key has proper permissions

#### 3. Workflow Not Active
- Click the **"Active"** toggle in n8n
- Check for validation errors in nodes
- Verify all credentials are set

#### 4. Docker Issues
```bash
# Restart n8n
docker-compose down
docker-compose up -d

# Check logs
docker-compose logs n8n
```

### Debug Mode
Enable debug logging in n8n:
1. Go to **Settings** → **Logs**
2. Set log level to **"debug"**
3. Check logs for detailed information

## 🔒 Security Considerations

### Production Deployment
1. Use HTTPS for webhook URLs
2. Implement webhook authentication
3. Use environment variables for secrets
4. Regular security updates

### API Key Management
- Never commit API keys to version control
- Use environment variables
- Rotate keys regularly
- Monitor usage

## 📊 Monitoring

### n8n Dashboard
- View workflow executions
- Monitor webhook calls
- Check error logs
- Performance metrics

### Application Integration
- Log AI request/response times
- Monitor success rates
- Track user engagement
- Error handling

## 🎯 Next Steps

1. **Test the Integration**: Use the test curl command above
2. **Deploy to Production**: Set up n8n on your server
3. **Monitor Usage**: Check n8n dashboard regularly
4. **Customize Workflows**: Add more AI features as needed

## 📞 Support

- **n8n Documentation**: [docs.n8n.io](https://docs.n8n.io/)
- **OpenAI Documentation**: [platform.openai.com/docs](https://platform.openai.com/docs)
- **Community**: [n8n community forum](https://community.n8n.io/)

---

**🎉 Congratulations!** Your n8n AI integration is now ready to provide intelligent insights for your Mental Health Tracker users. 