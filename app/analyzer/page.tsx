// app/analyzer/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface FormData {
  soilType: string;
  cropType: string;
  season: string;
  location: string;
  nutrients: string;
}

export default function Analyzer() {
  const [formData, setFormData] = useState<FormData>({
    soilType: '',
    cropType: '',
    season: '',
    location: '',
    nutrients: ''
  });

  const [recommendation, setRecommendation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendation('');

    try {
      console.log('Sending request with data:', formData);
      
      const response = await fetch('/api/fertilizer-recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned HTML instead of JSON. Check your API route setup.');
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      setRecommendation(data.recommendation);
    } catch (err: any) {
      console.error('Request failed:', err);
      setError(err.message || 'Failed to get recommendation');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      soilType: '',
      cropType: '',
      season: '',
      location: '',
      nutrients: ''
    });
    setRecommendation('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🌱 AI Fertilizer Analyzer
          </h1>
          <p className="text-lg text-gray-600">
            Get personalized fertilizer recommendations powered by OpenAI
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              📋 Crop & Soil Information
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soil Type *
                </label>
                <select
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
                >
                  <option value="">Select Soil Type</option>
                  <option value="Clay">Clay - Heavy, retains water</option>
                  <option value="Sandy">Sandy - Light, drains quickly</option>
                  <option value="Loamy">Loamy - Balanced, ideal for most crops</option>
                  <option value="Silty">Silty - Fine particles, fertile</option>
                  <option value="Chalky">Chalky - Alkaline, free-draining</option>
                  <option value="Peaty">Peaty - Organic, acidic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crop Type *
                </label>
                <select
                  name="cropType"
                  value={formData.cropType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
                >
                  <option value="">Select Crop Type</option>
                  <option value="Rice">🌾 Rice</option>
                  <option value="Wheat">🌾 Wheat</option>
                  <option value="Maize">🌽 Maize/Corn</option>
                  <option value="Cotton">🌿 Cotton</option>
                  <option value="Sugarcane">🎋 Sugarcane</option>
                  <option value="Tomato">🍅 Tomato</option>
                  <option value="Potato">🥔 Potato</option>
                  <option value="Onion">🧅 Onion</option>
                  <option value="Soybean">🫘 Soybean</option>
                  <option value="Other">🌱 Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Growing Season *
                </label>
                <select
                  name="season"
                  value={formData.season}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
                >
                  <option value="">Select Season</option>
                  <option value="Kharif">🌧️ Kharif (Monsoon - Jun-Nov)</option>
                  <option value="Rabi">❄️ Rabi (Winter - Nov-Apr)</option>
                  <option value="Zaid">☀️ Zaid (Summer - Mar-Jun)</option>
                  <option value="Year-round">🔄 Year-round cultivation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📍 Location (Optional)
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Coimbatore, Tamil Nadu, India"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🧪 Current Soil Nutrient Levels (Optional)
                </label>
                <textarea
                  name="nutrients"
                  value={formData.nutrients}
                  onChange={handleInputChange}
                  placeholder="e.g., Nitrogen: 250 kg/ha, Phosphorus: 60 kg/ha, Potassium: 40 kg/ha, pH: 6.5, Organic matter: 2.5%"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  {loading ? '🔄 Analyzing with AI...' : '🚀 Get AI Recommendation'}
                </button>
                
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  🔄 Reset
                </button>
              </div>
            </form>
          </div>

          {/* Results Display */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              🤖 AI Recommendation
            </h2>

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                <span className="ml-3 text-gray-600">Generating AI recommendation...</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <div className="text-red-400 text-xl">⚠️</div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {recommendation && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <div className="text-green-400 text-xl">✅</div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-green-800 mb-2">
                      AI Recommendation Ready
                    </h3>
                    <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {recommendation}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!loading && !error && !recommendation && (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">🤖</div>
                <p className="text-lg mb-2">Ready to help!</p>
                <p>Fill out the form and click "Get AI Recommendation" to receive personalized fertilizer advice powered by OpenAI.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}