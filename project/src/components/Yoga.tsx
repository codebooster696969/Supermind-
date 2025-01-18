import React, { useState } from 'react';

const YogaPractices = () => {
  const [formData, setFormData] = useState({
    year: 2022,
    month: 8,
    date: 11,
    hours: 6,
    minutes: 10,
    seconds: 10,
    latitude: 17.38333,
    longitude: 78.4666,
    timezone: 5.5
  });
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/yoga-durations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch yoga durations');
      }

      const data = await response.json();
      // Parse the output string to get the yoga data
      const yogaData = JSON.parse(data.output);
      setResults(yogaData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Yoga
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Learn about specific rituals and practices that can help you harness cosmic energy.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date inputs in one line */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                placeholder="Year"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                value={formData.month}
                onChange={(e) => setFormData({...formData, month: parseInt(e.target.value)})}
                placeholder="Month"
                min="1"
                max="12"
                className="w-20 px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: parseInt(e.target.value)})}
                placeholder="Date"
                min="1"
                max="31"
                className="w-20 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Time inputs in one line */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={formData.hours}
                onChange={(e) => setFormData({...formData, hours: parseInt(e.target.value)})}
                placeholder="Hours"
                min="0"
                max="23"
                className="w-20 px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                value={formData.minutes}
                onChange={(e) => setFormData({...formData, minutes: parseInt(e.target.value)})}
                placeholder="Minutes"
                min="0"
                max="59"
                className="w-20 px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                value={formData.seconds}
                onChange={(e) => setFormData({...formData, seconds: parseInt(e.target.value)})}
                placeholder="Seconds"
                min="0"
                max="59"
                className="w-20 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Location inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              value={formData.latitude}
              onChange={(e) => setFormData({...formData, latitude: parseFloat(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              value={formData.longitude}
              onChange={(e) => setFormData({...formData, longitude: parseFloat(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Timezone input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
          <input
            type="number"
            step="0.5"
            value={formData.timezone}
            onChange={(e) => setFormData({...formData, timezone: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {isLoading ? 'Calculating...' : 'Calculate Yoga Durations'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {results && (
        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Yoga Periods</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(results).map(([key, yoga]) => (
              <div 
                key={key}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    {yoga.name}
                  </h4>
                  <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    #{yoga.number}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>
                    <span className="font-medium">Completion: </span>
                    {formatDateTime(yoga.completion)}
                  </p>
                  {yoga.yoga_left_percentage !== undefined && (
                    <p>
                      <span className="font-medium">Remaining: </span>
                      {yoga.yoga_left_percentage.toFixed(2)}%
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YogaPractices;