import React, { useState } from 'react';

// Basic Card Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-4 border-b">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold text-gray-800">
    {children}
  </h2>
);

const CardContent = ({ children }) => (
  <div className="p-4">
    {children}
  </div>
);

const BirthChart = () => {
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    date: '',
    hours: '',
    minutes: '',
    seconds: '',
    latitude: '',
    longitude: '',
    timezone: '',
    observation_point: 'topocentric',
    ayanamsha: 'lahiri'
  });
  
  const [apiResponse, setApiResponse] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const observationPoints = ['topocentric', 'geocentric'];
  const ayanamshas = ['lahiri', 'raman', 'krishnamurti'];

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateInputs = () => {
    const { year, month, date, hours, minutes, seconds, latitude, longitude, timezone } = formData;
    if (!year || !month || !date || !hours || !minutes || !seconds || !latitude || !longitude || !timezone) {
      return 'All fields are required.';
    }
    if (Number(month) < 1 || Number(month) > 12) return 'Month must be between 1 and 12.';
    if (Number(date) < 1 || Number(date) > 31) return 'Date must be between 1 and 31.';
    if (Number(hours) < 0 || Number(hours) > 23) return 'Hours must be between 0 and 23.';
    if (Number(minutes) < 0 || Number(minutes) > 59) return 'Minutes must be between 0 and 59.';
    if (Number(seconds) < 0 || Number(seconds) > 59) return 'Seconds must be between 0 and 59.';
    if (Number(latitude) < -90 || Number(latitude) > 90) return 'Latitude must be between -90 and 90.';
    if (Number(longitude) < -180 || Number(longitude) > 180) return 'Longitude must be between -180 and 180.';
    if (Number(timezone) < -12 || Number(timezone) > 14) return 'Timezone must be between -12 and 14.';
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setLoading(true);

    const requestData = {
      year: Number(formData.year),
      month: Number(formData.month),
      date: Number(formData.date),
      hours: Number(formData.hours),
      minutes: Number(formData.minutes),
      seconds: Number(formData.seconds),
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      timezone: Number(formData.timezone),
      settings: {
        observation_point: formData.observation_point,
        ayanamsha: formData.ayanamsha
      }
    };

    try {
      // Fetch chart data
      const chartResponse = await fetch('http://localhost:3000/api/navamsa-chart-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      if (!chartResponse.ok) {
        throw new Error('Failed to fetch chart data');
      }

      const chartData = await chartResponse.json();
      setApiResponse(chartData);

      // Fetch summary data
      const summaryResponse = await fetch('https://my-app.shashanksgh3.workers.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      if (!summaryResponse.ok) {
        throw new Error('Failed to fetch summary data');
      }

      const summaryData = await summaryResponse.json();
      setSummaryData(summaryData);

    } catch (err) {
      setError(err.message || 'Failed to connect to the server. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const processApiResponse = (data) => {
    const houses = Array.from({ length: 12 }, () => []);
    Object.values(data.output).forEach(planet => {
      const houseIndex = planet.current_sign - 1;
      if (houses[houseIndex]) {
        houses[houseIndex].push(planet);
      }
    });
    return houses;
  };

  const HouseBox = ({ houseNumber, planets = [] }) => (
    <div className="p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-2 text-center">House {houseNumber}</h3>
      <div className="space-y-1">
        {planets.map((planet, idx) => (
          <div key={idx} className="text-sm text-center">
            <span className={planet.isRetro === "true" ? "text-red-600" : "text-gray-600"}>
              {planet.name} {planet.isRetro === "true" ? "⟲" : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const SummarySection = ({ data }) => {
    if (!data) return null;

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Astrological Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-indigo-800">Planetary Influences</h3>
                <p className="text-gray-700 leading-relaxed">{data.planetaryInfluences}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-blue-800">Key Aspects</h3>
                <p className="text-gray-700 leading-relaxed">{data.keyAspects}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-teal-800">House Positions</h3>
                <p className="text-gray-700 leading-relaxed">{data.housePositions}</p>
              </div>
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-rose-800">Overall Reading</h3>
                <p className="text-gray-700 leading-relaxed">{data.overallReading}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderChart = () => {
    if (!apiResponse) return null;

    const houses = processApiResponse(apiResponse);

    return (
      <div className="grid grid-cols-3 gap-6">
        {houses.map((planets, index) => (
          <HouseBox 
            key={index + 1}
            houseNumber={index + 1}
            planets={planets}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Birth Data Input</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['year', 'month', 'date', 'hours', 'minutes', 'seconds', 'latitude', 'longitude', 'timezone'].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {field}
                    </label>
                    <input
                      type="number"
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                      step={field === 'latitude' || field === 'longitude' || field === 'timezone' ? 'any' : '1'}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Observation Point
                  </label>
                  <select
                    name="observation_point"
                    value={formData.observation_point}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                  >
                    {observationPoints.map((point) => (
                      <option key={point} value={point}>
                        {point.charAt(0).toUpperCase() + point.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ayanamsha
                  </label>
                  <select
                    name="ayanamsha"
                    value={formData.ayanamsha}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                  >
                    {ayanamshas.map((ayanamsha) => (
                      <option key={ayanamsha} value={ayanamsha}>
                        {ayanamsha.charAt(0).toUpperCase() + ayanamsha.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
              >
                {loading ? 'Calculating...' : 'Generate Chart'}
              </button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Navamsa Chart</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Calculating chart...</p>
              </div>
            ) : apiResponse ? (
              renderChart()
            ) : (
              <div className="text-center text-gray-500 py-12">
                Enter birth details and generate the chart to view the results
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <SummarySection data={summaryData} />
    </div>
  );
};

export default BirthChart;