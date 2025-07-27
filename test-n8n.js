// Test script for n8n webhook integration
// Run with: node test-n8n.js

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/mental-health';

async function testN8nWebhook() {
  console.log('🧪 Testing n8n webhook integration...');
  
  const testData = {
    user_id: "test-user-123",
    mood_data: {
      mood: 7,
      energy_level: 6,
      sleep_hours: 8,
      stress_level: 4,
      activities: ["exercise", "social", "work"],
      notes: "Feeling good today! Had a great workout and met with friends."
    },
    insights_requested: true
  };

  try {
    console.log('📤 Sending test data to n8n...');
    console.log('Data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Success! Response:');
    console.log(JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('🎉 n8n integration is working correctly!');
      if (result.insights) {
        console.log(`📊 Received ${result.insights.length} insights`);
      }
      if (result.recommendations) {
        console.log(`💡 Received ${result.recommendations.length} recommendations`);
      }
    } else {
      console.log('⚠️  n8n returned success: false');
    }
    
  } catch (error) {
    console.error('❌ Error testing n8n webhook:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure n8n is running on http://localhost:5678');
    console.log('2. Check that the workflow is active in n8n');
    console.log('3. Verify the webhook URL is correct');
    console.log('4. Ensure OpenAI API key is configured in n8n');
  }
}

// Test quick recommendations
async function testQuickRecommendations() {
  console.log('\n🧪 Testing quick recommendations...');
  
  const testData = {
    user_id: "test-user-123",
    mood_data: {
      mood: 5,
      energy_level: 4,
      sleep_hours: 6,
      stress_level: 7,
      activities: ["work"],
      notes: "Feeling a bit tired and stressed."
    },
    insights_requested: false
  };

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Quick recommendations response:');
    console.log(JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('❌ Error testing quick recommendations:', error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting n8n integration tests...\n');
  
  await testN8nWebhook();
  await testQuickRecommendations();
  
  console.log('\n✨ Test completed!');
}

// Run if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testN8nWebhook, testQuickRecommendations }; 