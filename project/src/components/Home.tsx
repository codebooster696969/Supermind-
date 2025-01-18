import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, Moon, Sun as SunIcon, Activity, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?auto=format&fit=crop&q=80&w=2000"
            alt="Cosmos"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Discover Your Cosmic Journey
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Unlock the secrets of the universe with AI-powered astrological insights tailored just for you
          </p>
          <Link
            to="/kundali"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg"
          >
            Generate Your Kundali
            <ChevronRight className="ml-2 -mr-1 w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Star className="w-8 h-8 text-indigo-500" />}
            title="Kundali Generation"
            description="Get detailed birth chart analysis and personalized predictions based on your exact birth details"
            image="https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=80&w=500"
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8 text-purple-500" />}
            title="AI Recommendations"
            description="Receive personalized gemstone and ritual suggestions powered by advanced AI analysis"
            image="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=500"
          />
          <FeatureCard
            icon={<Moon className="w-8 h-8 text-blue-500" />}
            title="Spiritual Guidance"
            description="Access meditation and spiritual content aligned with your unique birth chart"
            image="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=500"
          />
        </div>
      </div>

      {/* Daily Insights Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
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
              effect="Heightened creativity and leadership opportunities await. Trust your instincts."
            />
            <InsightCard
              planet="Moon"
              position="Cancer"
              effect="Enhanced emotional intelligence and intuition guide your path today."
            />
            <InsightCard
              planet="Mercury"
              position="Virgo"
              effect="Clear communication and analytical thinking lead to breakthrough moments."
            />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
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
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transform hover:scale-105 transition-all duration-300">
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

function TestimonialCard({
  name,
  location,
  text,
}: {
  name: string;
  location: string;
  text: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <div className="ml-3">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{text}</p>
    </div>
  );
}

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "The Kundali insights have been incredibly accurate and helpful in making important life decisions."
  },
  {
    name: "Raj Patel",
    location: "Mumbai, India",
    text: "The AI recommendations perfectly align with traditional astrological principles. Truly impressive!"
  },
  {
    name: "Maria Garcia",
    location: "Barcelona, Spain",
    text: "The spiritual guidance has helped me find inner peace and direction in my life journey."
  }
];