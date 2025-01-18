import React, { useState } from 'react';
import { Sparkles, MapPin, Star, Moon, Clock, Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';

// Types remain the same
interface KundaliData {
  personName: string;
  birthYear: number;
  birthMonth: number;
  birthDate: number;
  birthHour: number;
  birthMinutes: number;
  birthSeconds: number;
  timeZone: number;
  sex: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  ayanamsa: string;
}

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl border bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 shadow-xl ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-8 border-b border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <div className="flex items-center gap-2">
    <Sparkles className="h-6 w-6 text-indigo-600" />
    <h3 className={`text-3xl font-bold text-gray-900 dark:text-white ${className}`}>
      {children}
    </h3>
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-8 ${className}`}>
    {children}
  </div>
);

const FormInput = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-3">
    <label className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300">
      {Icon && <Icon className="h-5 w-5 text-indigo-600" />}
      {label}
    </label>
    <input
      className="block w-full h-12 rounded-lg border-gray-300 bg-white/50 shadow-sm 
                 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 
                 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white text-base px-4"
      {...props}
    />
  </div>
);

// StepIndicator component remains the same
const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="flex items-center justify-between mb-12">
    {[...Array(totalSteps)].map((_, index) => (
      <div key={index} className={`flex items-center ${index !== totalSteps - 1 ? 'flex-1' : ''}`}>
        <div className={`relative w-10 h-10 rounded-full flex items-center justify-center 
                        transition-all duration-200 ${
          index < currentStep
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
            : index === currentStep
            ? 'bg-indigo-100 text-indigo-800 ring-4 ring-indigo-50'
            : 'bg-gray-100 text-gray-400'
        }`}>
          <span className="text-sm font-semibold">{index + 1}</span>
          {index < currentStep && (
            <div className="absolute -top-8 w-max text-xs font-medium text-indigo-600">
              {['Personal Info', 'Birth Details', 'Location', 'Generate'][index]}
            </div>
          )}
        </div>
        {index !== totalSteps - 1 && (
          <div className={`flex-1 h-0.5 mx-4 rounded transition-colors duration-200 ${
            index < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
          }`} />
        )}
      </div>
    ))}
  </div>
);

// Main component
export default function KundaliForm() {
  // State management remains the same
  const [formData, setFormData] = useState<KundaliData>({
    personName: '',
    birthYear: 2024,
    birthMonth: 6,
    birthDate: 10,
    birthHour: 15,
    birthMinutes: 10,
    birthSeconds: 10,
    timeZone: 5.5,
    sex: '',
    city: '',
    state: '',
    country: '',
    latitude: 18.9333,
    longitude: 72.8166,
    ayanamsa: 'KRISHNAMURTHI'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  // Event handlers remain the same
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/horoscope-chart-svg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          year: formData.birthYear,
          month: formData.birthMonth,
          date: formData.birthDate,
          hours: formData.birthHour,
          minutes: formData.birthMinutes,
          seconds: formData.birthSeconds,
          latitude: formData.latitude,
          longitude: formData.longitude,
          timezone: formData.timeZone,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate horoscope');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const renderPersonalInfo = () => (
    <div className="space-y-8">
      <FormInput
        label="Full Name"
        icon={User}
        type="text"
        name="personName"
        value={formData.personName}
        onChange={handleInputChange}
        placeholder="Enter your full name"
        required
      />
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300">
          <User className="h-5 w-5 text-indigo-600" />
          Gender
        </label>
        <select
          name="sex"
          value={formData.sex}
          onChange={handleInputChange}
          className="block w-full h-12 rounded-lg border-gray-300 bg-white/50 
                   transition-colors focus:border-indigo-500 focus:ring-2 
                   focus:ring-indigo-500 dark:bg-gray-700/50 dark:border-gray-600 
                   dark:text-white text-base px-4"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );

  const renderBirthDetails = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          <Calendar className="h-5 w-5 text-indigo-600" />
          Date of Birth
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormInput
            label="Year"
            type="number"
            name="birthYear"
            value={formData.birthYear}
            onChange={handleInputChange}
            min="1900"
            max="2100"
            required
          />
          <FormInput
            label="Month"
            type="number"
            name="birthMonth"
            value={formData.birthMonth}
            onChange={handleInputChange}
            min="1"
            max="12"
            required
          />
          <FormInput
            label="Date"
            type="number"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            min="1"
            max="31"
            required
          />
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          <Clock className="h-5 w-5 text-indigo-600" />
          Time of Birth
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormInput
            label="Hour (24-hour)"
            type="number"
            name="birthHour"
            value={formData.birthHour}
            onChange={handleInputChange}
            min="0"
            max="23"
            required
          />
          <FormInput
            label="Minutes"
            type="number"
            name="birthMinutes"
            value={formData.birthMinutes}
            onChange={handleInputChange}
            min="0"
            max="59"
            required
          />
          <FormInput
            label="Seconds"
            type="number"
            name="birthSeconds"
            value={formData.birthSeconds}
            onChange={handleInputChange}
            min="0"
            max="59"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderLocationDetails = () => (
    <div className="space-y-8">
      <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
        <MapPin className="h-5 w-5 text-indigo-600" />
        Birth Location
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="City"
          icon={MapPin}
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="Enter city name"
          required
        />
        <FormInput
          label="State"
          icon={MapPin}
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          placeholder="Enter state name"
          required
        />
      </div>
      <FormInput
        label="Country"
        icon={MapPin}
        type="text"
        name="country"
        value={formData.country}
        onChange={handleInputChange}
        placeholder="Enter country name"
        required
      />
    </div>
  );

  const renderResult = () => {
    if (result) {
      return (
        <div className="mt-8 space-y-4">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            <Star className="h-5 w-5 text-indigo-600" />
            Your Horoscope Chart
          </h4>
          <div className="flex justify-center rounded-lg border border-gray-200 p-4 bg-white dark:bg-gray-700 dark:border-gray-600"
               dangerouslySetInnerHTML={{ __html: result }} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Kundali Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <StepIndicator currentStep={currentStep} totalSteps={4} />
          <form onSubmit={handleSubmit} className="space-y-8">
            {currentStep === 1 && renderPersonalInfo()}
            {currentStep === 2 && renderBirthDetails()}
            {currentStep === 3 && renderLocationDetails()}
            {currentStep === 4 && (
              <div className="space-y-8">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 
                           text-white text-lg font-semibold rounded-lg shadow-lg 
                           shadow-indigo-200 transition-all duration-200 
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Moon className="h-5 w-5 animate-spin" />
                      Generating Your Horoscope...
                    </div>
                  ) : (
                    'Generate Horoscope'
                  )}
                </button>
                {error && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600">
                    {error}
                  </div>
                )}
                {renderResult()}
              </div>
            )}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex items-center gap-2 py-3 px-6 text-gray-600 
                           hover:text-gray-900 font-medium rounded-lg 
                           transition-colors duration-200"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </button>
              )}
              {currentStep < 4 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 py-3 px-6 bg-indigo-600 
                           hover:bg-indigo-700 text-white font-medium rounded-lg 
                           shadow-md shadow-indigo-200 transition-all duration-200"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}