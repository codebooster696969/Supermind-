import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface KundaliData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  gender: string;
  city: string;
  state: string;
}

export default function KundaliForm() {
  const [formData, setFormData] = useState<KundaliData>({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    gender: '',
    city: '',
    state: '',
  });

  const [loading, setLoading] = useState(false);
  const [kundaliResult, setKundaliResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setKundaliResult(
        `Based on your birth details (${formData.dateOfBirth}, ${formData.timeOfBirth}), 
        here are your key astrological insights:
        
        1. Rising Sign (Ascendant): Leo
           - Natural leadership abilities
           - Creative expression is key to your growth
        
        2. Moon Sign: Cancer
           - Deep emotional sensitivity
           - Strong intuitive abilities
        
        3. Key Planetary Positions:
           - Sun in Virgo: Analytical mind, attention to detail
           - Mercury in Libra: Balanced communication style
           - Venus in Leo: Charismatic personality
        
        4. Life Path Insights:
           - Career: Strong period for professional growth in 2024
           - Relationships: Favorable time for strengthening bonds
           - Personal Growth: Focus on spiritual development
        
        5. Recommended Remedies:
           - Gemstone: Ruby
           - Mantra: Om Suryaya Namaha
           - Best Days: Sunday for important initiatives`
      );
      setLoading(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Generate Your Kundali
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Enter your birth details to receive personalized astrological insights
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time of Birth
                </label>
                <input
                  type="time"
                  name="timeOfBirth"
                  required
                  value={formData.timeOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City of Birth
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  State/Province
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Sparkles className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Generating...
                  </>
                ) : (
                  'Generate Kundali'
                )}
              </button>
            </div>
          </form>

          {kundaliResult && (
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Kundali Analysis
              </h3>
              <pre className="whitespace-pre-wrap text-gray-600 dark:text-gray-300 font-mono text-sm">
                {kundaliResult}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}