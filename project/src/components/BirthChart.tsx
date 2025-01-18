import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ChartParams {
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  latitude: number;
  longitude: number;
  timezone: number;
  observation_point: 'topocentric' | 'geocentric';
  ayanamsha: 'sayana' | 'lahiri';
}

export default function BirthChart() {
  const [chartParams, setChartParams] = useState<ChartParams>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
    latitude: 0,
    longitude: 0,
    timezone: 5.5,
    observation_point: 'topocentric',
    ayanamsha: 'lahiri'
  });

  const [chart, setChart] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would make an API call with chartParams
    // For now, we'll just simulate a chart response
    generateChart();
  };

  const generateChart = () => {
    // Simulated chart data
    const houses = Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      degree: i * 30,
      sign: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
             'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'][i]
    }));

    setChart({ houses });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Birth Chart Calculator
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date and Time Inputs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  value={chartParams.year}
                  onChange={(e) => setChartParams({...chartParams, year: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Month (1-12)
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={chartParams.month}
                  onChange={(e) => setChartParams({...chartParams, month: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
              {/* Add similar inputs for date, hours, minutes, seconds */}
              
              {/* Location Inputs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Latitude (-90 to 90)
                </label>
                <input
                  type="number"
                  min="-90"
                  max="90"
                  step="0.000001"
                  value={chartParams.latitude}
                  onChange={(e) => setChartParams({...chartParams, latitude: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Longitude (-180 to 180)
                </label>
                <input
                  type="number"
                  min="-180"
                  max="180"
                  step="0.000001"
                  value={chartParams.longitude}
                  onChange={(e) => setChartParams({...chartParams, longitude: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>

              {/* Settings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Observation Point
                </label>
                <select
                  value={chartParams.observation_point}
                  onChange={(e) => setChartParams({...chartParams, observation_point: e.target.value as 'topocentric' | 'geocentric'})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                >
                  <option value="topocentric">Topocentric</option>
                  <option value="geocentric">Geocentric</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ayanamsha
                </label>
                <select
                  value={chartParams.ayanamsha}
                  onChange={(e) => setChartParams({...chartParams, ayanamsha: e.target.value as 'sayana' | 'lahiri'})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                >
                  <option value="sayana">Sayana</option>
                  <option value="lahiri">Lahiri</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Generate Chart
              </button>
            </div>
          </form>

          {chart && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <div className="relative w-full h-[600px] bg-gray-50 dark:bg-gray-700 rounded-lg">
                {/* Animated Chart Visualization */}
                <div className="absolute inset-0">
                  {chart.houses.map((house: any, index: number) => (
                    <motion.div
                      key={house.number}
                      initial={{ rotate: 0, opacity: 0 }}
                      animate={{ 
                        rotate: house.degree,
                        opacity: 1
                      }}
                      transition={{ 
                        duration: 1,
                        delay: index * 0.1
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        width: '200px',
                        height: '2px',
                        background: `linear-gradient(90deg, #6366f1 ${index * 30}%, transparent)`
                      }}
                    >
                      <div className="absolute right-0 -top-3 bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm">
                        {house.sign}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}