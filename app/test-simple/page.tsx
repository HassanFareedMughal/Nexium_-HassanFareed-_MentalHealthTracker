'use client';

export default function TestSimple() {
  const handleClick = () => {
    alert('Button clicked!');
    console.log('Button clicked!');
  };

  const handleSave = async () => {
    alert('Save button clicked!');
    console.log('Save button clicked!');
    
    try {
      const response = await fetch('/api/test-mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'test-user',
          mood_level: 8,
          energy_level: 7,
          sleep_hours: 8,
          stress_level: 4,
          activities: ['exercise'],
          notes: 'Test entry'
        }),
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        alert('✅ Test save successful!');
      } else {
        alert('❌ Test save failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error: ' + error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Test Page</h1>
      
      <div className="space-y-4">
        <button 
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Test Basic Click
        </button>
        
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded ml-4"
        >
          Test Save API
        </button>
      </div>
      
      <div className="mt-8">
        <p>If you see alerts when clicking these buttons, JavaScript is working.</p>
        <p>Check console (F12) for detailed logs.</p>
      </div>
    </div>
  );
} 