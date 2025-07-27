# n8n Setup Instructions

## Option 1: Docker (Recommended)

1. **Install Docker Desktop** from https://docker.com
2. **Run n8n:**
   ```bash
   docker-compose up -d
   ```
3. **Access n8n:** http://localhost:5678
4. **Login:** admin / mentalhealth2024

## Option 2: npm Installation

1. **Install n8n globally:**
   ```bash
   npm install n8n -g
   ```

2. **Start n8n:**
   ```bash
   n8n start
   ```

3. **Access n8n:** http://localhost:5678

## Option 3: Direct Download

1. **Download n8n** from https://n8n.io
2. **Extract and run:**
   ```bash
   ./n8n start
   ```

## After Installation

1. **Create your first workflow**
2. **Add a Webhook trigger**
3. **Configure AI nodes** (OpenAI, etc.)
4. **Get your webhook URL**
5. **Add to .env.local:**
   ```
   N8N_WEBHOOK_URL=http://localhost:5678/webhook/mental-health
   ``` 