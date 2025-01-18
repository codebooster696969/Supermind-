import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { 
  Sun, 
  Moon,
  Home,
  User,
  Brain,
  MessageCircle,
  ChevronDown,
  Globe,
  Calendar,
  Clock,
  Map,
  Menu,
  X
} from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Create a reference for the dropdown

  const isActive = (path: string) => location.pathname === path;

  const features = [
    {
      title: 'Birth Chart Analysis',
      path: '/birth-chart',
      icon: <Calendar size={20} />,
      description: 'Detailed planetary positions and house analysis'
    },
    {
      title: 'Planetary Information',
      path: '/planets',
      icon: <Globe size={20} />,
      description: 'Learn about planetary influences and transits'
    }
    // {
    //   title: 'Transit Calculator',
    //   path: '/transits',
    //   icon: <Clock size={20} />,
    //   description: 'Calculate planetary transits and their effects'
    // },
    // {
    //   title: 'Location-based Charts',
    //   path: '/location',
    //   icon: <Map size={20} />,
    //   description: 'Charts based on geographical coordinates'
    // }
  ];

  const closeAllMenus = () => {
    setIsOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the dropdown if click is outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center" onClick={closeAllMenus}>
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              AstroGuide
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink to="/" icon={<Home size={20} />} text="Home" isActive={isActive('/')} />
            <NavLink to="/kundali" icon={<User size={20} />} text="Kundali" isActive={isActive('/kundali')} />
            
            {/* Features Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <span>Features</span>
                <ChevronDown size={20} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-10">
                  {features.map((feature, index) => (
                    <Link
                      key={index}
                      to={feature.path}
                      className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                      onClick={closeAllMenus}
                    >
                      <div className="flex items-center">
                        <div className="text-indigo-600 dark:text-indigo-400">
                          {feature.icon}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {feature.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {feature.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/ai-insights" icon={<Brain size={20} />} text="AI Insights" isActive={isActive('/ai-insights')} />
            <NavLink to="/chat" icon={<MessageCircle size={20} />} text="Chat" isActive={isActive('/chat')} />
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavLink to="/" icon={<Home size={20} />} text="Home" isActive={isActive('/')} onClick={closeAllMenus} />
              <MobileNavLink to="/kundali" icon={<User size={20} />} text="Kundali" isActive={isActive('/kundali')} onClick={closeAllMenus} />
              
              {/* Mobile Features */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Features
                </div>
                {features.map((feature, index) => (
                  <MobileNavLink
                    key={index}
                    to={feature.path}
                    icon={feature.icon}
                    text={feature.title}
                    isActive={isActive(feature.path)}
                    onClick={closeAllMenus}
                  />
                ))}
              </div>

              <MobileNavLink to="/ai-insights" icon={<Brain size={20} />} text="AI Insights" isActive={isActive('/ai-insights')} onClick={closeAllMenus} />
              <MobileNavLink to="/chat" icon={<MessageCircle size={20} />} text="Chat" isActive={isActive('/chat')} onClick={closeAllMenus} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text, isActive }: { to: string; icon: React.ReactNode; text: string; isActive: boolean }) {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

function MobileNavLink({ 
  to, 
  icon, 
  text, 
  isActive, 
  onClick 
}: { 
  to: string; 
  icon: React.ReactNode; 
  text: string; 
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
    >
      <div className="flex items-center space-x-2">
        {icon}
        <span>{text}</span>
      </div>
    </Link>
  );
}
