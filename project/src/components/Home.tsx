import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, Moon, Sun as SunIcon, Activity, ChevronRight, Menu, X } from 'lucide-react';

const CosmicBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900">
        <div className="stars"></div>
        <div className="shooting-stars"></div>
      </div>
      
      <div className="planet planet-1 hidden md:block"></div>
      <div className="planet planet-2 hidden md:block"></div>
      <div className="planet planet-3 hidden md:block"></div>
      <div className="zodiac-ring hidden lg:block"></div>
    </div>
  );
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rest of your component remains the same until the style tag

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <CosmicBackground />
      
      {/* Your existing navigation code */}
      
      <div className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto py-12 md:py-24 text-center z-10">
          {/* <div className="mystical-border p-1 inline-block mb-6">
            
          </div> */}
          <div className="animate-fade-in-up space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400 leading-tight magic-text">
              Discover Your Cosmic Journey
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto px-4 cosmic-glow">
              Unlock the secrets of the universe with AI-powered astrological insights tailored just for you
            </p>
            <Link
              to="/kundali"
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-700 text-white text-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 mystical-button"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Your Kundali
              <ChevronRight className="ml-2 -mr-1 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      {/* Responsive Feature Grid */}
      <div className="relative max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Responsive Daily Insights Section */}
      <div className="relative max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-purple-500/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Today's Cosmic Insights
            </h2>
            <Activity className="w-6 h-6 text-purple-400" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <InsightCard key={index} {...insight} />
            ))}
          </div>
        </div>
      </div>

      {/* Responsive Testimonials Section */}
      <div className="relative bg-gray-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 sm:mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .stars {
          background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
                           radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
                           radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
                           radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
                           radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0));
          background-size: 200px 200px;
          animation: twinkle 5s ease-in-out infinite alternate;
        }

        .shooting-stars {
          position: absolute;
          width: 100%;
          height: 100%;
          transform: rotate(-45deg);
        }

        .shooting-stars::before, .shooting-stars::after {
          content: "";
          position: absolute;
          background: linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0));
          width: 100px;
          height: 1px;
          animation: shooting 5s infinite linear;
          opacity: 0;
        }

        .shooting-stars::after {
          animation-delay: 2.5s;
        }

        .mystical-border {
          background: linear-gradient(45deg, #ff8a00, #e52e71, #4facfe, #00f2fe);
          border-radius: 1rem;
          padding: 2px;
          animation: border-pulse 3s infinite;
        }

        .cosmic-time {
          background: rgba(0, 0, 0, 0.3);
          padding: 0.5rem 2rem;
          border-radius: 1rem;
          backdrop-filter: blur(4px);
        }

        .zodiac-ring {
          position: absolute;
          width: 600px;
          height: 600px;
          border: 2px solid rgba(147, 51, 234, 0.3);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: rotate 60s linear infinite;
        }

        .zodiac-ring::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid rgba(147, 51, 234, 0.1);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .mystical-button {
          position: relative;
          overflow: hidden;
        }

        .mystical-button::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
          transform: rotate(45deg);
          animation: shimmer 3s infinite;
        }

        .magic-text {
          animation: colorChange 8s infinite;
        }

        .cosmic-glow {
          text-shadow: 0 0 10px rgba(147, 51, 234, 0.5);
        }

        @keyframes shooting {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(300px);
            opacity: 0;
          }
        }

        @keyframes border-pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes rotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.5;
          }
        }

        @keyframes shimmer {
          0% {
            transform: rotate(45deg) translateY(-100%);
          }
          100% {
            transform: rotate(45deg) translateY(100%);
          }
        }

        @keyframes colorChange {
          0%, 100% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(30deg);
          }
        }

        /* Enhanced planet animations */
        .planet {
          position: absolute;
          border-radius: 50%;
          opacity: 0.6;
          box-shadow: 0 0 20px rgba(255,255,255,0.2);
        }

        .planet-1 {
          width: 120px;
          height: 120px;
          background: radial-gradient(circle at 30% 30%, #ff8a00, #e52e71);
          top: 10%;
          right: 15%;
          animation: float 15s ease-in-out infinite, glow 3s ease-in-out infinite alternate;
        }

        .planet-2 {
          width: 80px;
          height: 80px;
          background: radial-gradient(circle at 30% 30%, #4facfe, #00f2fe);
          top: 60%;
          left: 10%;
          animation: float 20s ease-in-out infinite reverse, glow 4s ease-in-out infinite alternate;
        }

        .planet-3 {
          width: 60px;
          height: 60px;
          background: radial-gradient(circle at 30% 30%, #667eea, #764ba2);
          bottom: 20%;
          right: 25%;
          animation: float 25s ease-in-out infinite, glow 5s ease-in-out infinite alternate;
        }

        @keyframes glow {
          0% {
            box-shadow: 0 0 20px rgba(255,255,255,0.2);
          }
          100% {
            box-shadow: 0 0 40px rgba(255,255,255,0.4);
          }
        }
      `}</style>

    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-purple-500/20 shadow-xl transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          {icon}
        </div>
        <h3 className="ml-3 text-lg sm:text-xl font-semibold text-white">
          {title}
        </h3>
      </div>
      <p className="text-sm sm:text-base text-purple-200">{description}</p>
    </div>
  );
}

function InsightCard({ planet, position, effect }) {
  return (
    <div className="bg-gray-700/50 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-purple-500/20 transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center mb-4">
        <SunIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
        <h3 className="ml-3 text-base sm:text-lg font-semibold text-white">
          {planet} in {position}
        </h3>
      </div>
      <p className="text-sm sm:text-base text-purple-200">{effect}</p>
    </div>
  );
}

function TestimonialCard({ name, location, text }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-xl p-4 sm:p-6 rounded-xl border border-purple-500/20 shadow-xl">
      <div className="flex items-center mb-4">
        <div className="ml-3">
          <h4 className="text-base sm:text-lg font-semibold text-white">{name}</h4>
          <p className="text-xs sm:text-sm text-purple-300">{location}</p>
        </div>
      </div>
      <p className="text-sm sm:text-base text-purple-200">{text}</p>
    </div>
  );
}

const features = [
  {
    icon: <Star className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />,
    title: "Kundali Generation",
    description: "Get detailed birth chart analysis and personalized predictions based on your exact birth details"
  },
  {
    icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />,
    title: "AI Recommendations",
    description: "Receive personalized gemstone and ritual suggestions powered by advanced AI analysis"
  },
  {
    icon: <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />,
    title: "Spiritual Guidance",
    description: "Access meditation and spiritual content aligned with your unique birth chart"
  }
];

const insights = [
  {
    planet: "Sun",
    position: "Leo",
    effect: "Heightened creativity and leadership opportunities await. Trust your instincts."
  },
  {
    planet: "Moon",
    position: "Cancer",
    effect: "Enhanced emotional intelligence and intuition guide your path today."
  },
  {
    planet: "Mercury",
    position: "Virgo",
    effect: "Clear communication and analytical thinking lead to breakthrough moments."
  }
];

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