"use client";
import { useState } from 'react';

interface FormData {
  temperature: string;
  humidity: string;
  moisture: string;
  soilType: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
}

interface AnalysisResult {
  recommendation: string;
  npkRatio: string;
  applicationRate: string;
  additionalNotes: string;
}

export default function AnalyzerPage() {
  const [formData, setFormData] = useState<FormData>({
    temperature: '',
    humidity: '',
    moisture: '',
    soilType: '',
    nitrogen: '',
    phosphorus: '',
    potassium: ''
  });

  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateRecommendation = (data: FormData): AnalysisResult => {
    const temp = parseFloat(data.temperature);
    const humidity = parseFloat(data.humidity);
    const moisture = parseFloat(data.moisture);
    const n = parseFloat(data.nitrogen);
    const p = parseFloat(data.phosphorus);
    const k = parseFloat(data.potassium);

    // Simple recommendation logic
    let recommendation = "Balanced NPK fertilizer";
    let npkRatio = "10-10-10";
    let applicationRate = "200-300 kg/hectare";
    let additionalNotes = "Apply during early growing season.";

    if (n < 50) {
      recommendation = "Nitrogen-rich fertilizer recommended";
      npkRatio = "20-10-10";
      additionalNotes = "Low nitrogen levels detected. Consider organic nitrogen sources.";
    } else if (p < 30) {
      recommendation = "Phosphorus-enhanced fertilizer";
      npkRatio = "10-20-10";
      additionalNotes = "Phosphorus deficiency may affect root development.";
    } else if (k < 100) {
      recommendation = "Potassium-rich fertilizer";
      npkRatio = "10-10-20";
      additionalNotes = "Potassium boost needed for fruit and grain development.";
    }

    if (data.soilType === 'sandy') {
      applicationRate = "150-250 kg/hectare";
      additionalNotes += " Sandy soil requires more frequent applications.";
    } else if (data.soilType === 'clay') {
      applicationRate = "250-350 kg/hectare";
      additionalNotes += " Clay soil retains nutrients well.";
    }

    return { recommendation, npkRatio, applicationRate, additionalNotes };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysisResult = generateRecommendation(formData);
    setResult(analysisResult);
    setIsAnalyzing(false);
  };

  const resetForm = () => {
    setFormData({
      temperature: '',
      humidity: '',
      moisture: '',
      soilType: '',
      nitrogen: '',
      phosphorus: '',
      potassium: ''
    });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="flex min-h-screen">
        {/* Left Panel */}
        <div className="w-1/3 bg-gradient-to-br from-green-800 to-green-600 p-8 text-white">
          <div className="text-4xl font-bold mb-2">🌾 AgriSmart</div>
          <div className="text-xl text-green-200 mb-8">AI-Powered Fertilizer Recommendations</div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">How it works:</h3>
              <ul className="space-y-3">
                {[
                  "Enter your soil parameters",
                  "AI analyzes the data",
                  "Get personalized recommendations",
                  "Optimize your crop yield"
                ].map((step, index) => (
                  <li key={index} className="flex items-center text-green-100">
                    <span className="bg-green-700 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Features:</h3>
              <ul className="space-y-2">
                {[
                  "Smart Soil Analysis",
                  "Advanced AI Technology",
                  "Data-Driven Results",
                  "Expert Recommendations",
                  "Quality Assurance"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-green-100">
                    <span className="text-green-300 mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Right Panel */}
        <div className="flex-1 p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Soil Analysis & Fertilizer Recommendations
            </h1>
            
            {!result ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Temperature (°C)
                    </label>
                    <input
                      type="number"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleInputChange}
                      step="0.1"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., 25.5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Humidity (%)
                    </label>
                    <input
                      type="number"
                      name="humidity"
                      value={formData.humidity}
                      onChange={handleInputChange}
                      step="0.1"
                      min="0"
                      max="100"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., 65.2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Moisture (%)
                    </label>
                    <input
                      type="number"
                      name="moisture"
                      value={formData.moisture}
                      onChange={handleInputChange}
                      step="0.1"
                      min="0"
                      max="100"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., 45.8"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Soil Type
                    </label>
                    <select
                      name="soilType"
                      value={formData.soilType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select soil type</option>
                      <option value="loamy">Loamy</option>
                      <option value="clay">Clay</option>
                      <option value="sandy">Sandy</option>
                      <option value="silt">Silt</option>
                      <option value="peaty">Peaty</option>
                      <option value="chalky">Chalky</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nitrogen (N) ppm
                    </label>
                    <input
                      type="number"
                      name="nitrogen"
                      value={formData.nitrogen}
                      onChange={handleInputChange}
                      step="0.1"
                      min="0"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., 45.2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phosphorus (P) ppm
                    </label>
                    <input
                      type="number"
                      name="phosphorus"
                      value={formData.phosphorus}
                      onChange={handleInputChange}
                      step="0.1"
                      min="0"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., 28.7"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Potassium (K) ppm
                  </label>
                  <input
                    type="number"
                    name="potassium"
                    value={formData.potassium}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., 125.3"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className={`w-full py-3 px-6 rounded-md font-medium text-lg transition-all duration-300 ${
                    isAnalyzing 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-green-600 hover:bg-green-700 transform hover:scale-105"
                  } text-white`}
                >
                  {isAnalyzing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Soil Data...
                    </span>
                  ) : (
                    "🔍 Analyze & Get Recommendations"
                  )}
                </button>
              </form>
            ) : (
              // Results Display
              <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">✅</div>
                    <h2 className="text-2xl font-bold text-green-800">Analysis Complete!</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="font-semibold text-gray-900 mb-2">🌱 Recommendation</h3>
                      <p className="text-gray-700">{result.recommendation}</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="font-semibold text-gray-900 mb-2">⚖️ NPK Ratio</h3>
                      <p className="text-gray-700 text-xl font-mono">{result.npkRatio}</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="font-semibold text-gray-900 mb-2">📏 Application Rate</h3>
                      <p className="text-gray-700">{result.applicationRate}</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="font-semibold text-gray-900 mb-2">📝 Additional Notes</h3>
                      <p className="text-gray-700 text-sm">{result.additionalNotes}</p>
                    </div>
                  </div>
                </div>

                {/* Input Summary */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Your Soil Data Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Temperature:</span>
                      <p className="text-gray-900">{formData.temperature}°C</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Humidity:</span>
                      <p className="text-gray-900">{formData.humidity}%</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Moisture:</span>
                      <p className="text-gray-900">{formData.moisture}%</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Soil Type:</span>
                      <p className="text-gray-900 capitalize">{formData.soilType}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Nitrogen:</span>
                      <p className="text-gray-900">{formData.nitrogen} ppm</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Phosphorus:</span>
                      <p className="text-gray-900">{formData.phosphorus} ppm</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Potassium:</span>
                      <p className="text-gray-900">{formData.potassium} ppm</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={resetForm}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    🔄 Analyze New Soil Sample
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors font-medium"
                  >
                    🖨️ Print Results
                  </button>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="text-xl mr-2">⚠️</div>
                    <div>
                      <h4 className="font-medium text-yellow-800">Disclaimer</h4>
                      <p className="text-yellow-700 text-sm mt-1">
                        These recommendations are based on AI analysis of provided data. 
                        For best results, consult with local agricultural experts and conduct 
                        professional soil testing for precise nutrient management.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}