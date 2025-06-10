// app/components/FertilizerCalculator.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
}

interface Recommendation {
  fertilizer: string;
  amount: string;
  cost: number;
}

const FertilizerCalculator: React.FC = () => {
  // --- useState hooks (at least 3) ---
  const [soilData, setSoilData] = useState<SoilData>({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    ph: 7 // Kept for consistency, even if not directly used in current rec logic
  });
  const [cropType, setCropType] = useState<string>('');
  const [fieldSize, setFieldSize] = useState<number>(1); // Default to 1 acre for initial calculation
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalCost, setTotalCost] = useState<number>(0);

  // --- useEffect hooks (at least 3) ---

  // Effect 1: Recalculate recommendations on soil data, crop type, or field size changes
  useEffect(() => {
    if (cropType && fieldSize > 0) { // Only calculate if crop and field size are valid
      setLoading(true);
      const timer = setTimeout(() => {
        const newRecommendations: Recommendation[] = [];

        // Simplified recommendation logic
        const N_needed_per_acre = 50; // target ppm
        const P_needed_per_acre = 25; // target ppm
        const K_needed_per_acre = 200; // target ppm

        // Nitrogen recommendation (using Urea 46-0-0)
        if (soilData.nitrogen < N_needed_per_acre) {
          const amount_kg = Math.ceil(((N_needed_per_acre - soilData.nitrogen) * fieldSize * 2.17) / 46 * 100); // Amount of Urea needed for N
          if (amount_kg > 0) {
              newRecommendations.push({
                  fertilizer: 'Urea (46-0-0)',
                  amount: `${amount_kg} kg`,
                  cost: amount_kg * 25 // Cost per kg
              });
          }
        }

        // Phosphorus recommendation (using DAP 18-46-0)
        if (soilData.phosphorus < P_needed_per_acre) {
            const amount_kg = Math.ceil(((P_needed_per_acre - soilData.phosphorus) * fieldSize * 2.17) / 46 * 100); // Amount of DAP for P
            if (amount_kg > 0) {
                newRecommendations.push({
                    fertilizer: 'DAP (18-46-0)',
                    amount: `${amount_kg} kg`,
                    cost: amount_kg * 30
                });
            }
        }

        // Potassium recommendation (using MOP 0-0-60)
        if (soilData.potassium < K_needed_per_acre) {
            const amount_kg = Math.ceil(((K_needed_per_acre - soilData.potassium) * fieldSize * 1.67) / 60 * 100); // Amount of MOP for K
            if (amount_kg > 0) {
                newRecommendations.push({
                    fertilizer: 'MOP (0-0-60)',
                    amount: `${amount_kg} kg`,
                    cost: amount_kg * 20
                });
            }
        }

        setRecommendations(newRecommendations);
        setLoading(false);
      }, 500); // Shorter timeout for faster response

      return () => clearTimeout(timer); // Cleanup for debounce
    } else {
      setRecommendations([]);
      setLoading(false);
    }
  }, [soilData, cropType, fieldSize]);

  // Effect 2: Calculate total cost when recommendations change
  useEffect(() => {
    const cost = recommendations.reduce((sum, rec) => sum + rec.cost, 0);
    setTotalCost(cost);
  }, [recommendations]);

  // Effect 3: Basic logging for component lifecycle (could be data fetching/saving in real app)
  useEffect(() => {
    console.log('Fertilizer Calculator component mounted or updated.');
    return () => {
      console.log('Fertilizer Calculator component unmounted.');
    };
  }, []); // Runs once on mount, and cleanup on unmount

  const handleSoilDataChange = (field: keyof SoilData, value: number) => {
    setSoilData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md h-full flex flex-col"> {/* Added flex-col and h-full */}
      <h3 className="text-xl font-bold text-green-800 mb-4 text-center">Fertilizer Calculator</h3>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3 mb-4"> {/* Compact grid and margin */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Crop Type</label>
          <select
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            className="w-full p-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
          >
            <option value="">Select</option>
            <option value="rice">Rice</option>
            <option value="wheat">Wheat</option>
            <option value="corn">Corn</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Field Size (acres)</label>
          <input
            type="number"
            value={fieldSize}
            onChange={(e) => setFieldSize(Number(e.target.value))}
            className="w-full p-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
            min="0"
          />
        </div>
        {['nitrogen', 'phosphorus', 'potassium', 'ph'].map(key => (
          <div key={key}>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              {key.charAt(0).toUpperCase() + key.slice(1)} {key === 'ph' ? '' : '(ppm)'}
            </label>
            <input
              type="number"
              value={soilData[key as keyof SoilData]}
              onChange={(e) => handleSoilDataChange(key as keyof SoilData, Number(e.target.value))}
              className="w-full p-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
              step={key === 'ph' ? "0.1" : "1"}
            />
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar"> {/* Added scroll for results if they overflow */}
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-2 text-xs text-gray-600">Calculating...</p>
          </div>
        ) : (
          <>
            {recommendations.length > 0 ? (
              <div className="space-y-2"> {/* Compact spacing */}
                {recommendations.map((rec, index) => (
                  <div key={index} className="bg-green-50 p-2 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 text-sm">{rec.fertilizer}</h4>
                    <p className="text-xs text-gray-600">Amount: {rec.amount}</p>
                    <p className="text-xs font-medium text-green-700">Cost: ₹{rec.cost}</p>
                  </div>
                ))}
                <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 text-sm">Total Est. Cost</h4>
                  <p className="text-lg font-bold text-blue-600">₹{totalCost}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center text-sm py-4">
                Enter details for recommendations.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FertilizerCalculator;