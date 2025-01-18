import React, { useState } from 'react';
import { Sparkles, MapPin, Star, Moon } from 'lucide-react';

interface KundaliData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  gender: string;
  city: string;
  state: string;
}

// Card Components
const Card = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

// Alert Components
const Alert = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    role="alert"
    className={`relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const AlertDescription = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <div className={`text-sm [&_p]:leading-relaxed ${className}`} {...props}>
    {children}
  </div>
);

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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6 space-x-4">
            <Star className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
            <Moon className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold text-indigo-900 dark:text-white mb-4">
            Discover Your Celestial Path
          </h1>
          <p className="text-lg text-indigo-600 dark:text-indigo-300">
            Explore your astrological destiny through a personalized birth chart analysis
          </p>
        </div>

        <Card className="shadow-xl border-t-4 border-t-indigo-500">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-t-lg">
            <CardTitle className="text-2xl text-indigo-900 dark:text-white">Your Birth Details</CardTitle>
            <CardDescription className="text-indigo-600 dark:text-indigo-300">
              Enter your details for an accurate astrological reading
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
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
                      className="w-full px-4 py-3 rounded-lg border-2 border-indigo-100 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Enter your full name"
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
                      className="w-full px-4 py-3 rounded-lg border-2 border-indigo-100 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
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
                      className="w-full px-4 py-3 rounded-lg border-2 border-indigo-100 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-indigo-100 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
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
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-10 rounded-lg border-2 border-indigo-100 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                        placeholder="Enter city name"
                      />
                    </div>
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
                      className="w-full px-4 py-3 rounded-lg border-2 border-indigo-100 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Enter state/province"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                >
                  {loading ? (
                    <>
                      <Sparkles className="animate-spin -ml-1 mr-3 h-5 w-5" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Star className="mr-2 h-5 w-5" />
                      <span>Generate Birth Chart</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {kundaliResult && (
              <div className="mt-8">
                <Alert className="bg-indigo-50 dark:bg-gray-800 border-indigo-200 dark:border-indigo-800">
                  <AlertDescription>
                    <h3 className="text-2xl font-semibold text-indigo-900 dark:text-white mb-4">
                      Your Astrological Insights
                    </h3>
                    <div className="prose prose-indigo dark:prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-base bg-white dark:bg-gray-900 p-6 rounded-lg">
                        {kundaliResult}
                      </pre>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}