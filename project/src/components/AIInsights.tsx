import React from 'react';
import { Brain, Gem, Sparkles } from 'lucide-react';

export default function AIInsights() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Powered Astrological Insights
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover personalized recommendations powered by advanced AI analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <InsightCard
            icon={<Gem className="w-8 h-8 text-purple-500" />}
            title="Gemstone Recommendations"
            description="Discover the perfect gemstones to enhance your energy and balance your chakras."
          />
          <InsightCard
            icon={<Brain className="w-8 h-8 text-blue-500" />}
            title="Personalized Mantras"
            description="Receive custom mantras aligned with your birth chart and current planetary positions."
          />
          <InsightCard
            icon={<Sparkles className="w-8 h-8 text-indigo-500" />}
            title="Ritual Guidance"
            description="Learn about specific rituals and practices that can help you harness cosmic energy."
          />
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Your Personal AI Assistant
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Our AI system analyzes your birth chart and current planetary positions to provide:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Daily personalized predictions</li>
              <li>Compatible gemstone suggestions</li>
              <li>Customized meditation techniques</li>
              <li>Auspicious timing for important activities</li>
              <li>Relationship compatibility insights</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}