import React, { useState } from 'react';
import axios from 'axios';

const Transit: React.FC = () => {
  const [formData, setFormData] = useState({
    year: 1990,
    month: 5,
    date: 25,
    hours: 15,
    minutes: 30,
    seconds: 0,
    latitude: 12.9716,
    longitude: 77.5946,
    timezone: 'Asia/Kolkata'
  });

  const [transitData, setTransitData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Fetch transit data from the backend API
  const handleFetchTransit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/transit-calculator', 
        formData
      );
      setTransitData(response.data); // Store the response data
      setError(''); // Reset error state if the request is successful
    } catch (error: any) {
      setError('An error occurred while fetching transit data.');
      console.error(error);
    }
  };

  return (
    <div className="container p-4">
      <h1 className="text-xl font-bold">Transit Calculator</h1>
      
      {/* Form to take user input */}
      <div className="my-4">
        <label>Year:</label>
        <input 
          type="number" 
          name="year" 
          value={formData.year} 
          onChange={handleChange} 
          className="border p-2 mx-2"
        />
        
        <label>Month:</label>
        <input 
          type="number" 
          name="month" 
          value={formData.month} 
          onChange={handleChange} 
          className="border p-2 mx-2"
        />
        
        <label>Date:</label>
        <input 
          type="number" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
          className="border p-2 mx-2"
        />
        
        <label>Hours:</label>
        <input 
          type="number" 
          name="hours" 
          value={formData.hours} 
          onChange={handleChange} 
          className="border p-2 mx-2"
        />
        
        <label>Minutes:</label>
        <input 
          type="number" 
          name="minutes" 
          value={formData.minutes} 
          onChange={handleChange} 
          className="border p-2 mx-2"
        />
        
        <label>Seconds:</label>
        <input 
          type="number" 
          name="seconds" 
          value={formData.seconds} 
          onChange={handleChange} 
          className="border p-2 mx-2"
        />
        
        <label>Latitude:</label>
        <input 
          type="number" 
          name="latitude" 
          value={formData.latitude} 
          onChange={handleChange} 
          className="border p-2 mx-2"
        />
        
        <label>Longitude:</label>
        <input 
          type="number" 
          name="longitude" 
          value={formData.longitude} 
          onChange={handleChange} 
          className="border p-2 mx-2"
        />
        
        <label>Timezone:</label>
        <input 
          type="text" 
          name="timezone" 
          value={formData.timezone} 
          onChange={handleChange} 
          className="border p-2 mx-2"
        />

        <button
          onClick={handleFetchTransit}
          className="bg-blue-500 text-white p-2 mt-4"
        >
          Fetch Transit Data
        </button>
      </div>

      {/* Display error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display transit data */}
      {transitData && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h2 className="text-lg font-bold">Transit Data</h2>
          <pre>{JSON.stringify(transitData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Transit;
