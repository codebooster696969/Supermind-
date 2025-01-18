import React from 'react';
import { Sparkles, Star, Moon, Sun as SunIcon, Activity } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Discover Your Cosmic Journey
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Unlock the secrets of the universe with AI-powered astrological insights
        </p>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Star className="w-8 h-8 text-indigo-500" />}
          title="Kundali Generation"
          description="Get detailed birth chart analysis and personalized predictions"
          image="https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=80&w=500"
        />
        <FeatureCard
          icon={<Sparkles className="w-8 h-8 text-purple-500" />}
          title="AI Recommendations"
          description="Receive personalized gemstone and ritual suggestions"
          image="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=500"
        />
        <FeatureCard
          icon={<Moon className="w-8 h-8 text-blue-500" />}
          title="Spiritual Guidance"
          description="Access meditation and spiritual content aligned with your chart"
          image="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=500"
        />
      </div>

      {/* Daily Insights Section */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Today's Cosmic Insights
            </h2>
            <Activity className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InsightCard
              planet="Sun"
              position="Leo"
              effect="Heightened creativity and leadership opportunities"
            />
            <InsightCard
              planet="Moon"
              position="Cancer"
              effect="Enhanced emotional intelligence and intuition"
            />
            <InsightCard
              planet="Mercury"
              position="Virgo"
              effect="Clear communication and analytical thinking"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  image,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          {icon}
          <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}

function InsightCard({
  planet,
  position,
  effect,
}: {
  planet: string;
  position: string;
  effect: string;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <SunIcon className="w-6 h-6 text-indigo-500" />
        <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
          {planet} in {position}
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{effect}</p>
    </div>
  );
}