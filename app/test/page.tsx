'use client';

import { useState } from 'react';

export default function TestPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const testMagicLink = async () => {
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testDirectMagicLink = async () => {
    setLoading(true);
    setResult('');

    try {
      const response = await fetch(`/api/test-magic-link?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Magic Link Test</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <button
              onClick={testMagicLink}
              disabled={loading || !email}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Test Magic Link (Form API)'}
            </button>

            <button
              onClick={testDirectMagicLink}
              disabled={loading || !email}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Test Magic Link (Direct API)'}
            </button>
          </div>

          {result && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Result:</h3>
              <pre className="bg-gray-100 p-3 rounded-md text-xs overflow-auto max-h-64">
                {result}
              </pre>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Instructions:</h3>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Enter your email address</li>
            <li>2. Click "Test Magic Link" to send a magic link</li>
            <li>3. Check your email for the magic link</li>
            <li>4. Click the magic link in your email</li>
            <li>5. It should redirect to the debug page</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 