'use client';

export default function TestSimple() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple JavaScript Test</h1>
      
      <button 
        onClick={() => alert('JavaScript is working!')}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Test JavaScript
      </button>
      
      <button 
        onClick={() => {
          console.log('Button clicked');
          alert('Console log test');
        }}
        className="ml-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Test Console
      </button>
      
      <div className="mt-4">
        <p>If you see alerts when clicking these buttons, JavaScript is working.</p>
        <p>If you don't see alerts, there's a JavaScript issue.</p>
      </div>
    </div>
  );
} 