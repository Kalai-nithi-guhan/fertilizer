// app/components/CropGrowthMonitor.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface GrowthStage {
  stage: string;
  days: number;
  description: string;
}

interface WeatherData {
  temperature: number;
  humidity: number;
}

const CropGrowthMonitor: React.FC = () => {
  // --- useState hooks (at least 3) ---
  const [selectedCrop, setSelectedCrop] = useState<string>('tomato');
  const [plantingDate, setPlantingDate] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [currentStage, setCurrentStage] = useState<GrowthStage | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 25,
    humidity: 60,
  });
  const [notifications, setNotifications] = useState<string[]>([]);
  const [growthProgress, setGrowthProgress] = useState<number>(0);

  const cropStages: { [key: string]: GrowthStage[] } = {
    tomato: [
      { stage: 'Germination', days: 7, description: 'Seeds sprouting' },
      { stage: 'Seedling', days: 21, description: 'True leaves appear' },
      { stage: 'Vegetative', days: 45, description: 'Rapid growth' },
      { stage: 'Flowering', days: 65, description: 'Flowers forming' },
      { stage: 'Fruiting', days: 85, description: 'Fruits developing' }
    ],
    rice: [
      { stage: 'Germination', days: 5, description: 'Seeds sprouting' },
      { stage: 'Seedling', days: 20, description: 'Young plants' },
      { stage: 'Transplanting', days: 25, description: 'Moving to field' },
      { stage: 'Tillering', days: 50, description: 'Multiple shoots' },
      { stage: 'Panicle Formation', days: 75, description: 'Grain heads forming' },
      { stage: 'Maturity', days: 120, description: 'Grains fully developed' }
    ]
  };

  // --- useEffect hooks (at least 3) ---

  // Effect 1: Calculate current day from planting date
  useEffect(() => {
    if (plantingDate) {
      const planting = new Date(plantingDate);
      const today = new Date();
      const diffTime = today.getTime() - planting.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setCurrentDay(Math.max(0, diffDays));
    } else {
      setCurrentDay(0); // Reset if planting date is cleared
    }
  }, [plantingDate]);

  // Effect 2: Determine current growth stage and progress
  useEffect(() => {
    if (selectedCrop && currentDay >= 0) { // Check currentDay >= 0 for initial state
      const stages = cropStages[selectedCrop];
      if (!stages || stages.length === 0) {
          setCurrentStage(null);
          setGrowthProgress(0);
          return;
      }
      
      let stageFound: GrowthStage | null = null;
      for (let i = 0; i < stages.length; i++) {
        if (currentDay <= stages[i].days) {
          stageFound = stages[i];
          break;
        }
      }
      // If currentDay exceeds all defined stages, assume the last stage
      if (!stageFound) {
          stageFound = stages[stages.length - 1];
      }
      setCurrentStage(stageFound);

      // Calculate progress based on total days for the selected crop
      const totalDays = stages[stages.length - 1]?.days || 1; // Prevent division by zero
      setGrowthProgress((currentDay / totalDays) * 100);
    } else {
        setCurrentStage(null);
        setGrowthProgress(0);
    }
  }, [selectedCrop, currentDay]);


  // Effect 3: Simulate weather updates and generate notifications
  useEffect(() => {
    // Simulate weather updates every 5 seconds (reduced for faster updates)
    const weatherInterval = setInterval(() => {
      const newTemp = Math.max(15, Math.min(40, weatherData.temperature + (Math.random() - 0.5) * 2)); // Smaller random changes
      const newHumidity = Math.max(30, Math.min(90, weatherData.humidity + (Math.random() - 0.5) * 5)); // Smaller random changes
      setWeatherData({ temperature: newTemp, humidity: newHumidity });

      // Generate notifications
      const newNotifications: string[] = [];
      if (newTemp > 30) { // Lower threshold for high temp alert
        newNotifications.push('High temp! Consider watering.');
      }
      if (newHumidity < 50) { // Higher threshold for low humidity alert
        newNotifications.push('Low humidity. Mulching recommended.');
      }
      if (currentStage && currentDay > 0) {
        newNotifications.push(`${selectedCrop} is in ${currentStage.stage} stage.`);
      }
      setNotifications(newNotifications);
    }, 5000);

    return () => clearInterval(weatherInterval);
  }, [weatherData, currentStage, selectedCrop, currentDay]); // Depend on relevant states

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', { // Changed to IN for Indian format
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md h-full flex flex-col"> {/* Added flex-col and h-full */}
      <h3 className="text-xl font-bold text-green-800 mb-4 text-center">Crop Growth Monitor</h3>
      
      {/* Control Panel */}
      <div className="grid grid-cols-2 gap-3 mb-4"> {/* Compact grid */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Select Crop</label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full p-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
          >
            <option value="tomato">Tomato</option>
            <option value="rice">Rice</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Planting Date</label>
          <input
            type="date"
            value={plantingDate}
            onChange={(e) => setPlantingDate(e.target.value)}
            className="w-full p-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Growth Info & Progress */}
      {plantingDate && (
        <div className="bg-blue-50 p-3 rounded-lg mb-4 text-center"> {/* Compacted padding and margin */}
          <h4 className="font-semibold text-blue-800 text-sm">Growth Info</h4>
          <p className="text-xs text-gray-600">Planted: {formatDate(plantingDate)}</p>
          <p className="text-xs text-gray-600">Days: {currentDay}</p>
          <div className="mt-1">
            <div className="bg-gray-200 rounded-full h-1.5"> {/* Smaller progress bar */}
              <div 
                className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, growthProgress)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{Math.min(100, Math.round(growthProgress))}% Complete</p>
          </div>
        </div>
      )}

      {/* Current Stage Info & Weather & Notifications - combined into a scrollable area if needed */}
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar"> {/* Added scroll for results if they overflow */}
        {/* Current Stage */}
        <h4 className="font-semibold text-gray-800 text-sm mb-2">Current Stage</h4>
        {currentStage ? (
          <div className="bg-green-50 p-3 rounded-lg border border-green-200 mb-3"> {/* Compacted */}
            <p className="font-semibold text-green-800 text-base">{currentStage.stage}</p>
            <p className="text-xs text-gray-600">{currentStage.description}</p>
          </div>
        ) : (
          <p className="text-gray-500 text-center text-xs py-2">Set planting date.</p>
        )}

        {/* Weather Conditions */}
        <h4 className="font-semibold text-gray-800 text-sm mb-2">Weather</h4>
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 grid grid-cols-2 gap-2 text-xs mb-3"> {/* Compacted */}
          <div>
            <span className="font-medium text-yellow-700">Temp:</span>
            <p className="font-bold">{weatherData.temperature.toFixed(1)}°C</p>
          </div>
          <div>
            <span className="font-medium text-blue-700">Humidity:</span>
            <p className="font-bold">{weatherData.humidity.toFixed(0)}%</p>
          </div>
        </div>

        {/* Notifications */}
        <h4 className="font-semibold text-gray-800 text-sm mb-2">Alerts</h4>
        <div className="space-y-1"> {/* Compacted spacing */}
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="bg-red-50 p-2 rounded border border-red-200">
                <p className="text-xs text-red-700">{notification}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-xs">No alerts.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropGrowthMonitor;