// import React, { useState } from 'react';

// const ZodiacWheel = ({ data }) => {
//   // Calculate planet positions (0 degrees = top, moving clockwise)
//   const getPosition = (degree, radius = 160) => {
//     const radian = (degree - 90) * (Math.PI / 180);
//     return {
//       x: 250 + radius * Math.cos(radian),
//       y: 250 + radius * Math.sin(radian)
//     };
//   };

//   // Get positions for planets if data exists
//   const planetPositions = data ? Object.entries(data).map(([planet, info]) => ({
//     planet,
//     symbol: planetSymbols[planet],
//     position: getPosition(info.fullDegree)
//   })) : [];

//   return (
//     <svg viewBox="0 0 500 500" className="w-full h-full">
//       {/* Outer circle */}
//       <circle cx="250" cy="250" r="200" fill="none" stroke="#333" strokeWidth="2"/>
      
//       {/* Zodiac divisions (30 degrees each) */}
//       <g stroke="#666" strokeWidth="1">
//         <line x1="250" y1="50" x2="250" y2="450"/>
//         <line x1="50" y1="250" x2="450" y2="250"/>
//         <line x1="93.3" y1="93.3" x2="406.7" y2="406.7"/>
//         <line x1="93.3" y1="406.7" x2="406.7" y2="93.3"/>
//       </g>

//       {/* Zodiac signs */}
//       <g fontSize="20">
//         <text x="250" y="80" textAnchor="middle">♈︎</text>
//         <text x="370" y="140" textAnchor="middle">♉︎</text>
//         <text x="420" y="250" textAnchor="middle">♊︎</text>
//         <text x="370" y="370" textAnchor="middle">♋︎</text>
//         <text x="250" y="420" textAnchor="middle">♌︎</text>
//         <text x="130" y="370" textAnchor="middle">♍︎</text>
//         <text x="80" y="250" textAnchor="middle">♎︎</text>
//         <text x="130" y="140" textAnchor="middle">♏︎</text>
//         <text x="250" y="130" textAnchor="middle">♐︎</text>
//         <text x="320" y="190" textAnchor="middle">♑︎</text>
//         <text x="370" y="250" textAnchor="middle">♒︎</text>
//         <text x="320" y="320" textAnchor="middle">♓︎</text>
//       </g>

//       {/* Planets */}
//       {data && planetPositions.map(({ planet, symbol, position }) => (
//         <g key={planet}>
//           <circle cx={position.x} cy={position.y} r="3" fill="#D00"/>
//           <text 
//             x={position.x} 
//             y={position.y} 
//             textAnchor="middle" 
//             dy="-10"
//             fill="#D00"
//             fontSize="14"
//           >
//             {symbol}
//           </text>
//         </g>
//       ))}

//       {/* Center point */}
//       <circle cx="250" cy="250" r="3" fill="#333"/>
//     </svg>
//   );
// };

// const planetSymbols = {
//   Sun: '☉',
//   Moon: '☽',
//   Mars: '♂',
//   Mercury: '☿',
//   Jupiter: '♃',
//   Venus: '♀',
//   Saturn: '♄',
//   Rahu: '☊',
//   Ketu: '☋',
//   Uranus: '♅',
//   Neptune: '♆',
//   Pluto: '♇',
// };

// const PlanetDashboard = () => {
//   const [activeTab, setActiveTab] = useState('input');
//   const [formData, setFormData] = useState({
//     year: 2024,
//     month: 6,
//     date: 10,
//     hours: 15,
//     minutes: 10,
//     seconds: 0,
//     latitude: 18.9333,
//     longitude: 72.8166,
//     timezone: 5.5,
//     settings: {
//       observation_point: 'topocentric',
//       ayanamsha: 'lahiri',
//       language: 'en',
//     },
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name in formData) {
//       setFormData(prev => ({
//         ...prev,
//         [name]: isNaN(Number(value)) ? value : Number(value),
//       }));
//     } else if (name in formData.settings) {
//       setFormData(prev => ({
//         ...prev,
//         settings: {
//           ...prev.settings,
//           [name]: value,
//         },
//       }));
//     }
//   };

//   const fetchPlanetData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('https://supermind-qlr6.onrender.com/api/planets-extended', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const result = await response.json();
//       setData(result.output);
//       setActiveTab('results');
//     } catch (err) {
//       setError(err.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="p-6">
//           <h1 className="text-2xl font-bold mb-6">Planetary Positions Dashboard</h1>
          
//           <div className="mb-6">
//             <div className="flex space-x-4 border-b">
//               <button
//                 className={`px-4 py-2 ${activeTab === 'input' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
//                 onClick={() => setActiveTab('input')}
//               >
//                 Input Parameters
//               </button>
//               <button
//                 className={`px-4 py-2 ${activeTab === 'results' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
//                 onClick={() => setActiveTab('results')}
//               >
//                 Results
//               </button>
//             </div>
//           </div>

//           {activeTab === 'input' && (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="space-y-4">
//                 <h3 className="font-semibold">Date & Time</h3>
//                 <input
//                   type="number"
//                   name="year"
//                   value={formData.year}
//                   onChange={handleInputChange}
//                   placeholder="Year"
//                   className="w-full p-2 border rounded"
//                 />
//                 <div className="grid grid-cols-2 gap-2">
//                   <input
//                     type="number"
//                     name="month"
//                     value={formData.month}
//                     onChange={handleInputChange}
//                     placeholder="Month"
//                     className="p-2 border rounded"
//                   />
//                   <input
//                     type="number"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleInputChange}
//                     placeholder="Date"
//                     className="p-2 border rounded"
//                   />
//                 </div>
//                 <div className="grid grid-cols-3 gap-2">
//                   <input
//                     type="number"
//                     name="hours"
//                     value={formData.hours}
//                     onChange={handleInputChange}
//                     placeholder="Hours"
//                     className="p-2 border rounded"
//                   />
//                   <input
//                     type="number"
//                     name="minutes"
//                     value={formData.minutes}
//                     onChange={handleInputChange}
//                     placeholder="Minutes"
//                     className="p-2 border rounded"
//                   />
//                   <input
//                     type="number"
//                     name="seconds"
//                     value={formData.seconds}
//                     onChange={handleInputChange}
//                     placeholder="Seconds"
//                     className="p-2 border rounded"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="font-semibold">Location</h3>
//                 <input
//                   type="number"
//                   name="latitude"
//                   value={formData.latitude}
//                   onChange={handleInputChange}
//                   placeholder="Latitude"
//                   className="w-full p-2 border rounded"
//                 />
//                 <input
//                   type="number"
//                   name="longitude"
//                   value={formData.longitude}
//                   onChange={handleInputChange}
//                   placeholder="Longitude"
//                   className="w-full p-2 border rounded"
//                 />
//                 <input
//                   type="number"
//                   name="timezone"
//                   value={formData.timezone}
//                   onChange={handleInputChange}
//                   placeholder="Timezone"
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               <div className="space-y-4">
//                 <h3 className="font-semibold">Settings</h3>
//                 <input
//                   type="text"
//                   name="observation_point"
//                   value={formData.settings.observation_point}
//                   onChange={handleInputChange}
//                   placeholder="Observation Point"
//                   className="w-full p-2 border rounded"
//                 />
//                 <input
//                   type="text"
//                   name="ayanamsha"
//                   value={formData.settings.ayanamsha}
//                   onChange={handleInputChange}
//                   placeholder="Ayanamsha"
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               <button
//                 onClick={fetchPlanetData}
//                 className="col-span-3 mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//                 disabled={loading}
//               >
//                 {loading ? 'Loading...' : 'Calculate Positions'}
//               </button>
//             </div>
//           )}

//           {activeTab === 'results' && (
//             <>
//               {error && (
//                 <div className="text-red-500 mb-4">Error: {error}</div>
//               )}

//               {data && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     {Object.entries(data).map(([planet, info]) => (
//                       <div key={planet} className="bg-white border rounded-lg p-4 shadow">
//                         <div className="flex items-center space-x-2">
//                           <span className="text-xl">{planetSymbols[planet]}</span>
//                           <h3 className="font-semibold">{planet}</h3>
//                         </div>
//                         <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
//                           <div>Sign: {info.zodiac_sign_name}</div>
//                           <div>House: {info.house_number}</div>
//                           <div>Nakshatra: {info.nakshatra_name}</div>
//                           <div>Pada: {info.nakshatra_pada}</div>
//                           <div>Degree: {info.normDegree.toFixed(2)}°</div>
//                           <div>Retro: {info.isRetro}</div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
                  
//                   <div className="sticky top-0">
//                     <div className="bg-white border rounded-lg p-4 shadow">
//                       <div className="aspect-square">
//                         <ZodiacWheel data={data} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlanetDashboard;

import React, { useState } from 'react';
import { Info } from 'lucide-react';

const ZodiacWheel = ({ data }) => {
  // Calculate planet positions (0 degrees = top, moving clockwise)
  const getPosition = (degree, radius = 160) => {
    const radian = (degree - 90) * (Math.PI / 180);
    return {
      x: 250 + radius * Math.cos(radian),
      y: 250 + radius * Math.sin(radian)
    };
  };

  // Get positions for planets if data exists
  const planetPositions = data ? Object.entries(data).map(([planet, info]) => ({
    planet,
    symbol: planetSymbols[planet],
    position: getPosition(info.fullDegree)
  })) : [];

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full">
      {/* Outer circle */}
      <circle cx="250" cy="250" r="200" fill="none" stroke="#333" strokeWidth="2"/>
      
      {/* Zodiac divisions (30 degrees each) */}
      <g stroke="#666" strokeWidth="1">
        <line x1="250" y1="50" x2="250" y2="450"/>
        <line x1="50" y1="250" x2="450" y2="250"/>
        <line x1="93.3" y1="93.3" x2="406.7" y2="406.7"/>
        <line x1="93.3" y1="406.7" x2="406.7" y2="93.3"/>
      </g>

      {/* Zodiac signs */}
      <g fontSize="20">
        <text x="250" y="80" textAnchor="middle">♈</text>
        <text x="370" y="140" textAnchor="middle">♉</text>
        <text x="420" y="250" textAnchor="middle">♊</text>
        <text x="370" y="370" textAnchor="middle">♋</text>
        <text x="250" y="420" textAnchor="middle">♌</text>
        <text x="130" y="370" textAnchor="middle">♍</text>
        <text x="80" y="250" textAnchor="middle">♎</text>
        <text x="130" y="140" textAnchor="middle">♏</text>
        <text x="250" y="130" textAnchor="middle">♐</text>
        <text x="320" y="190" textAnchor="middle">♑</text>
        <text x="370" y="250" textAnchor="middle">♒</text>
        <text x="320" y="320" textAnchor="middle">♓</text>
      </g>

      {/* Planets */}
      {data && planetPositions.map(({ planet, symbol, position }) => (
        <g key={planet}>
          <circle cx={position.x} cy={position.y} r="3" fill="#D00"/>
          <text 
            x={position.x} 
            y={position.y} 
            textAnchor="middle" 
            dy="-10"
            fill="#D00"
            fontSize="14"
          >
            {symbol}
          </text>
        </g>
      ))}

      {/* Center point */}
      <circle cx="250" cy="250" r="3" fill="#333"/>
    </svg>
  );
};

const planetSymbols = {
  Sun: '☉',
  Moon: '☽',
  Mars: '♂',
  Mercury: '☿',
  Jupiter: '♃',
  Venus: '♀',
  Saturn: '♄',
  Rahu: '☊',
  Ketu: '☋',
  Uranus: '♅',
  Neptune: '♆',
  Pluto: '♇',
};
const PlanetDashboard = () => {
  const [activeTab, setActiveTab] = useState('input');
  const [formData, setFormData] = useState({
    year: 2024,
    month: 6,
    date: 10,
    hours: 15,
    minutes: 10,
    seconds: 0,
    latitude: 18.9333,
    longitude: 72.8166,
    timezone: 5.5,
    settings: {
      observation_point: 'topocentric',
      ayanamsha: 'lahiri',
      language: 'en',
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData(prev => ({
        ...prev,
        [name]: isNaN(Number(value)) ? value : Number(value),
      }));
    } else if (name in formData.settings) {
      setFormData(prev => ({
        ...prev,
        settings: {
          ...prev.settings,
          [name]: value,
        },
      }));
    }
  };

  const fetchPlanetData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://supermind-qlr6.onrender.com/api/planets-extended', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setData(result.output);
      setActiveTab('results');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const InfoTooltip = ({ text }) => (
    <div className="group relative inline-block ml-1">
      <Info className="w-4 h-4 text-gray-400 inline cursor-help" />
      <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-800 text-white text-sm rounded-lg -mt-1 ml-2">
        {text}
      </div>
    </div>
  );

  const InputField = ({ label, name, value, onChange, type = "number", tooltip, min, max, placeholder, step }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {tooltip && <InfoTooltip text={tooltip} />}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Planetary Positions Dashboard</h1>
          
          <div className="mb-8">
            <div className="flex space-x-4 border-b">
              <button
                className={`px-4 py-2 text-sm sm:text-base transition-colors ${
                  activeTab === 'input' 
                    ? 'border-b-2 border-blue-500 text-blue-500 font-medium' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('input')}
              >
                Input Parameters
              </button>
              <button
                className={`px-4 py-2 text-sm sm:text-base transition-colors ${
                  activeTab === 'results'
                    ? 'border-b-2 border-blue-500 text-blue-500 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('results')}
              >
                Results
              </button>
            </div>
          </div>

          {activeTab === 'input' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Date & Time</h3>
                <InputField
                  label="Year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="1900"
                  max="2100"
                  tooltip="Enter a year between 1900 and 2100"
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Month"
                    name="month"
                    value={formData.month}
                    onChange={handleInputChange}
                    min="1"
                    max="12"
                    tooltip="Enter a month (1-12)"
                  />
                  <InputField
                    label="Date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min="1"
                    max="31"
                    tooltip="Enter a date (1-31)"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <InputField
                    label="Hours"
                    name="hours"
                    value={formData.hours}
                    onChange={handleInputChange}
                    min="0"
                    max="23"
                    tooltip="Enter hours in 24-hour format (0-23)"
                  />
                  <InputField
                    label="Minutes"
                    name="minutes"
                    value={formData.minutes}
                    onChange={handleInputChange}
                    min="0"
                    max="59"
                    tooltip="Enter minutes (0-59)"
                  />
                  <InputField
                    label="Seconds"
                    name="seconds"
                    value={formData.seconds}
                    onChange={handleInputChange}
                    min="0"
                    max="59"
                    tooltip="Enter seconds (0-59)"
                  />
                </div>
              </div>

              <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Location</h3>
                <InputField
                  label="Latitude"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  step="0.0001"
                  min="-90"
                  max="90"
                  tooltip="Enter latitude (-90° to +90°). Positive for North, negative for South."
                />
                <InputField
                  label="Longitude"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  step="0.0001"
                  min="-180"
                  max="180"
                  tooltip="Enter longitude (-180° to +180°). Positive for East, negative for West."
                />
                <InputField
                  label="Timezone"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  step="0.5"
                  min="-12"
                  max="14"
                  tooltip="Enter timezone offset from UTC (-12 to +14). E.g., IST is +5.5"
                />
              </div>

              <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Settings</h3>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Observation Point
                    <InfoTooltip text="Choose between topocentric (observer's location on Earth's surface) or geocentric (Earth's center)" />
                  </label>
                  <select
                    name="observation_point"
                    value={formData.settings.observation_point}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="topocentric">Topocentric</option>
                    <option value="geocentric">Geocentric</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Ayanamsha
                    <InfoTooltip text="Select the ayanamsha system for calculating the zodiacal positions" />
                  </label>
                  <select
                    name="ayanamsha"
                    value={formData.settings.ayanamsha}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="lahiri">Lahiri</option>
                    <option value="raman">Raman</option>
                    <option value="krishnamurti">Krishnamurti</option>
                  </select>
                </div>
              </div>

              <div className="lg:col-span-3">
                <button
                  onClick={fetchPlanetData}
                  className="w-full sm:w-auto px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Calculating...
                    </span>
                  ) : (
                    'Calculate Positions'
                  )}
                </button>
              </div>
            </div>
          )}

{activeTab === 'results' && (
            <>
              {error && (
                <div className="text-red-500 mb-4">Error: {error}</div>
              )}

              {data && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {Object.entries(data).map(([planet, info]) => (
                      <div key={planet} className="bg-white border rounded-lg p-4 shadow">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{planetSymbols[planet]}</span>
                          <h3 className="font-semibold">{planet}</h3>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                          <div>Sign: {info.zodiac_sign_name}</div>
                          <div>House: {info.house_number}</div>
                          <div>Nakshatra: {info.nakshatra_name}</div>
                          <div>Pada: {info.nakshatra_pada}</div>
                          <div>Degree: {info.normDegree.toFixed(2)}°</div>
                          <div>Retro: {info.isRetro}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="sticky top-0">
                    <div className="bg-white border rounded-lg p-4 shadow">
                      <div className="aspect-square">
                        <ZodiacWheel data={data} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanetDashboard;