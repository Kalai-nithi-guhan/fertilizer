"use client";

import { useState } from "react";

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
    temperature: "",
    humidity: "",
    moisture: "",
    soilType: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
  });

  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateRecommendation = (data: FormData): AnalysisResult => {
    const temp = parseFloat(data.temperature);
    const humidity = parseFloat(data.humidity);
    const moisture = parseFloat(data.moisture);
    const n = parseFloat(data.nitrogen);
    const p = parseFloat(data.phosphorus);
    const k = parseFloat(data.potassium);

    let recommendation = "Balanced NPK fertilizer";
    let npkRatio = "10-10-10";
    let applicationRate = "200-300 kg/hectare";
    let additionalNotes = "Apply during early growing season.";

    if (n < 50) {
      recommendation = "Nitrogen-rich fertilizer recommended";
      npkRatio = "20-10-10";
      additionalNotes =
        "Low nitrogen levels detected. Consider organic nitrogen sources.";
    } else if (p < 30) {
      recommendation = "Phosphorus-enhanced fertilizer";
      npkRatio = "10-20-10";
      additionalNotes = "Phosphorus deficiency may affect root development.";
    } else if (k < 100) {
      recommendation = "Potassium-rich fertilizer";
      npkRatio = "10-10-20";
      additionalNotes = "Potassium boost needed for fruit and grain development.";
    }

    if (data.soilType === "sandy") {
      applicationRate = "150-250 kg/hectare";
      additionalNotes += " Sandy soil requires more frequent applications.";
    } else if (data.soilType === "clay") {
      applicationRate = "250-350 kg/hectare";
      additionalNotes += " Clay soil retains nutrients well.";
    }

    return { recommendation, npkRatio, applicationRate, additionalNotes };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const analysisResult = generateRecommendation(formData);
    setResult(analysisResult);
    setIsAnalyzing(false);
  };

  const resetForm = () => {
    setFormData({
      temperature: "",
      humidity: "",
      moisture: "",
      soilType: "",
      nitrogen: "",
      phosphorus: "",
      potassium: "",
    });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="flex min-h-screen">
        {/* Left Panel */}
        <div className="w-1/3 bg-gradient-to-br from-green-800 to-green-600 p-8 text-white">
          <div className="text-4xl font-bold mb-2">🌾 AgriSmart</div>
          <div className="text-xl text-green-200 mb-8">
            AI-Powered Fertilizer Recommendations
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">How it works:</h3>
              <ul className="space-y-3">
                {[
                  "Enter your soil parameters",
                  "AI analyzes the data",
                  "Get personalized recommendations",
                  "Optimize your crop yield",
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
                  "Quality Assurance",
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
                  {[
                    { name: "temperature", label: "Temperature (°C)", placeholder: "e.g., 25.5" },
                    { name: "humidity", label: "Humidity (%)", placeholder: "e.g., 65.2" },
                    { name: "moisture", label: "Moisture (%)", placeholder: "e.g., 45.8" },
                  ].map(({ name, label, placeholder }) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label}
                      </label>
                      <input
                        type="number"
                        name={name}
                        value={(formData as any)[name]}
                        onChange={handleInputChange}
                        step="0.1"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder={placeholder}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Soil Type
                    </label>
                    <select
                      name="soilType"
                      value={formData.soilType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select soil type</option>
                      {["loamy", "clay", "sandy", "silt", "peaty", "chalky"].map((type) => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {[
                    { name: "nitrogen", label: "Nitrogen (N) ppm", placeholder: "e.g., 45.2" },
                    { name: "phosphorus", label: "Phosphorus (P) ppm", placeholder: "e.g., 28.7" },
                    { name: "potassium", label: "Potassium (K) ppm", placeholder: "e.g., 125.3" },
                  ].map(({ name, label, placeholder }) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label}
                      </label>
                      <input
                        type="number"
                        name={name}
                        value={(formData as any)[name]}
                        onChange={handleInputChange}
                        step="0.1"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
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
                  {isAnalyzing ? "Analyzing..." : "🔍 Analyze & Get Recommendations"}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-green-800 mb-4">✅ Analysis Complete</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: "🌱 Recommendation", value: result.recommendation },
                      { title: "⚖️ NPK Ratio", value: result.npkRatio },
                      { title: "📏 Application Rate", value: result.applicationRate },
                      { title: "📝 Additional Notes", value: result.additionalNotes },
                    ].map(({ title, value }) => (
                      <div key={title} className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                        <p className="text-gray-700">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Soil Data Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {Object.entries(formData).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-medium text-gray-600 capitalize">{key}:</span>
                        <p className="text-gray-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={resetForm}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700"
                  >
                    🔄 Analyze New Sample
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700"
                  >
                    🖨️ Print Results
                  </button>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                  <p className="text-sm text-yellow-700">
                    ⚠️ These recommendations are based on provided inputs. Consult with local
                    agricultural experts for more precise decisions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
