import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, Moon, Sun as SunIcon, Activity, ChevronRight, Menu, X } from 'lucide-react';

const CosmicBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900">
        <div className="stars"></div>
      </div>
      
      {/* Responsive planets - hidden on smaller screens */}
      <div className="planet planet-1 hidden md:block"></div>
      <div className="planet planet-2 hidden md:block"></div>
      <div className="planet planet-3 hidden md:block"></div>
    </div>
  );
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <CosmicBackground />
      
      {/* Mobile-friendly Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/95 shadow-xl' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold text-white">Cosmic Journey</span>
            </div> */}
            
            {/* Mobile menu button */}
            {/* <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div> */}

            {/* Desktop navigation */}
            {/* <div className="hidden md:flex items-center space-x-6">
              <Link to="/about" className="text-white hover:text-purple-400 transition-colors">About</Link>
              <Link to="/features" className="text-white hover:text-purple-400 transition-colors">Features</Link>
              <Link
                to="/kundali"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                Start Journey
              </Link>
            </div> */}
          </div>

          {/* Mobile menu */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
            <div className="flex flex-col space-y-4 pb-4">
              <Link to="/about" className="text-white hover:text-purple-400 transition-colors">About</Link>
              <Link to="/features" className="text-white hover:text-purple-400 transition-colors">Features</Link>
              <Link
                to="/kundali"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 text-center"
              >
                Start Journey
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Responsive Hero Section */}
      <div className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto py-12 md:py-24 text-center z-10">
          <div className="animate-fade-in-up space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 leading-tight">
              Discover Your Cosmic Journey
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto px-4">
              Unlock the secrets of the universe with AI-powered astrological insights tailored just for you
            </p>
            <Link
              to="/kundali"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-base sm:text-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
            >
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

        .planet {
          position: absolute;
          border-radius: 50%;
          opacity: 0.6;
        }

        .planet-1 {
          width: 120px;
          height: 120px;
          background: radial-gradient(circle at 30% 30%, #ff8a00, #e52e71);
          top: 10%;
          right: 15%;
          animation: float 15s ease-in-out infinite;
        }

        .planet-2 {
          width: 80px;
          height: 80px;
          background: radial-gradient(circle at 30% 30%, #4facfe, #00f2fe);
          top: 60%;
          left: 10%;
          animation: float 20s ease-in-out infinite reverse;
        }

        .planet-3 {
          width: 60px;
          height: 60px;
          background: radial-gradient(circle at 30% 30%, #667eea, #764ba2);
          bottom: 20%;
          right: 25%;
          animation: float 25s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, 20px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }

        @keyframes twinkle {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        @media (max-width: 640px) {
          .planet {
            transform: scale(0.7);
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