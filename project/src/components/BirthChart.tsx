import React, { useState } from 'react';

// Basic Card Components with enhanced styling
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
    {children}
  </h2>
);

const CardContent = ({ children }) => (
  <div className="p-6">
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
      const chartResponse = await fetch('https://supermind-qlr6.onrender.com/api/navamsa-chart-info', {
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
    <div className="p-6 border rounded-xl shadow-sm bg-gradient-to-br from-white to-indigo-50 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold mb-3 text-center text-indigo-800">House {houseNumber}</h3>
      <div className="space-y-2">
        {planets.map((planet, idx) => (
          <div key={idx} className="text-sm text-center">
            <span className={`px-2 py-1 rounded-full ${planet.isRetro === "true" ? "bg-red-100 text-red-700" : "bg-indigo-100 text-indigo-700"}`}>
              {planet.name} {planet.isRetro === "true" ? "⟲" : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const InputGroup = ({ label, children }) => (
    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
      <h3 className="text-sm font-semibold text-gray-700">{label}</h3>
      <div className="grid grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );

  const Input = ({ label, ...props }) => (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      />
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
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold mb-3 text-indigo-800">Planetary Influences</h3>
                <p className="text-gray-700 leading-relaxed">{data.planetaryInfluences}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold mb-3 text-blue-800">Key Aspects</h3>
                <p className="text-gray-700 leading-relaxed">{data.keyAspects}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold mb-3 text-teal-800">House Positions</h3>
                <p className="text-gray-700 leading-relaxed">{data.housePositions}</p>
              </div>
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold mb-3 text-rose-800">Overall Reading</h3>
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
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Birth Data Input</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputGroup label="Date of Birth">
                <Input type="number" name="year" value={formData.year} onChange={handleChange} label="Year" />
                <Input type="number" name="month" value={formData.month} onChange={handleChange} label="Month" />
                <Input type="number" name="date" value={formData.date} onChange={handleChange} label="Date" />
              </InputGroup>

              <InputGroup label="Time of Birth">
                <Input type="number" name="hours" value={formData.hours} onChange={handleChange} label="Hours" />
                <Input type="number" name="minutes" value={formData.minutes} onChange={handleChange} label="Minutes" />
                <Input type="number" name="seconds" value={formData.seconds} onChange={handleChange} label="Seconds" />
              </InputGroup>

              <InputGroup label="Location">
                <Input type="number" name="latitude" value={formData.latitude} onChange={handleChange} label="Latitude" step="any" />
                <Input type="number" name="longitude" value={formData.longitude} onChange={handleChange} label="Longitude" step="any" />
                <Input type="number" name="timezone" value={formData.timezone} onChange={handleChange} label="Timezone" step="any" />
              </InputGroup>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Observation Point
                  </label>
                  <select
                    name="observation_point"
                    value={formData.observation_point}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
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
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
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
                <div className="text-red-500 text-sm p-4 bg-red-50 rounded-xl border border-red-100">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 font-medium shadow-sm hover:shadow transition-all"
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Calculating your celestial blueprint...</p>
              </div>
            ) : apiResponse ? (
              renderChart()
            ) : (
              <div className="text-center py-12 px-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <p className="text-gray-600">Enter your birth details to reveal your celestial chart</p>
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