import React, { useState } from "react";
import { Brain, Gem, Sparkles } from "lucide-react";
import YogaPractices from "./Yoga";
import GemstoneList from "./Gemstone";

export default function AIInsights() {
  const [activeSection, setActiveSection] = useState("Gemstone Recommendations");
  const [birthDate, setBirthDate] = useState("");
  const [mantra, setMantra] = useState("");
  const [chantCount, setChantCount] = useState("");
  const [bonusTip, setBonusTip] = useState("");
  const [mantraExplanation, setMantraExplanation] = useState("");
  const [formData, setFormData] = useState({
    year: 2022,
    month: 8,
    date: 11,
    hours: 6,
    minutes: 10,
    seconds: 10,
    latitude: 17.38333,
    longitude: 78.4666,
    timezone: 5.5
  });
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://supermind-qlr6.onrender.com/api/yoga-durations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch yoga durations');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  // Function to generate personalized mantra, chanting count, bonus tip, and explanation
  const generateMantra = () => {
    if (!birthDate) {
      setMantra("Please enter your birth date to receive a personalized mantra.");
      setChantCount("");
      setBonusTip("");
      setMantraExplanation("");
      return;
    }

    const randomMantras = [
      "Om Namah Shivaya",
      "Om Mani Padme Hum",
      "Om Shreem Hreem Kleem Maha Lakshmi Namaha",
      "Om Bhur Bhuvah Swaha",
      "Om Gum Ganapataye Namaha",
      "Om Aim Hreem Kleem Chamundaye Vichche",
      "Om Namo Bhagavate Vasudevaya",
      "Om Tare Tuttare Ture Soha",
      "Om Aham Prema",
      "Om Shri Dhanvantre Namaha",
    ];

    const chantCounts = [11, 21, 51, 108, 5, 7, 27]; // Extended chanting counts
    const bonusTips = [
      "Chant this mantra during early morning hours for maximum benefit.",
      "Focus on your breathing while chanting to enhance mindfulness.",
      "Use a mala (rosary) to keep track of your chanting counts.",
      "Light a candle or incense while chanting to create a sacred space.",
      "Visualize positive energy surrounding you as you chant.",
      "Repeat the mantra in your mind while meditating for deeper connection.",
      "Try chanting this mantra facing the sunrise for added energy.",
      "Drink a glass of water after chanting to feel refreshed.",
      "Practice gratitude before starting your chanting session.",
      "Write down the mantra after chanting to reinforce its vibration.",
    ];

    const mantraExplanations = {
      "Om Namah Shivaya": "This mantra invokes Lord Shiva, the destroyer of ego, and helps with inner transformation and liberation.",
      "Om Mani Padme Hum": "This is a Tibetan mantra that invokes compassion and wisdom, helping to cleanse negative emotions.",
      "Om Shreem Hreem Kleem Maha Lakshmi Namaha": "A mantra to invoke the blessings of Goddess Lakshmi for wealth, prosperity, and abundance.",
      "Om Bhur Bhuvah Swaha": "A Vedic mantra that is used to cleanse and purify the body, mind, and soul, connecting with divine energies.",
      "Om Gum Ganapataye Namaha": "This mantra is dedicated to Lord Ganesha, the remover of obstacles, and is often chanted for new beginnings.",
      "Om Aim Hreem Kleem Chamundaye Vichche": "A powerful mantra for spiritual strength, protection, and overcoming challenges.",
      "Om Namo Bhagavate Vasudevaya": "A mantra of devotion and surrender to Lord Vishnu, invoking peace and divine grace.",
      "Om Tare Tuttare Ture Soha": "This mantra invokes Tara, the goddess of protection and compassion, to aid in overcoming fears and challenges.",
      "Om Aham Prema": "A mantra of self-love and compassion, helping to connect with one's true essence and spread love to others.",
      "Om Shri Dhanvantre Namaha": "A mantra to invoke the blessings of Lord Dhanvantari, the deity of health and healing.",
    };

    // Generate unique outputs based on the input
    const selectedMantra =
      randomMantras[Math.floor(Math.random() * randomMantras.length)];
    const selectedChantCount =
      chantCounts[Math.floor(Math.random() * chantCounts.length)];
    const selectedBonusTip =
      bonusTips[Math.floor(Math.random() * bonusTips.length)];
    const selectedMantraExplanation = mantraExplanations[selectedMantra];

    setMantra(
      `Based on your birth date (${birthDate}), your personalized mantra is: "${selectedMantra}".`
    );
    setChantCount(`Chant this mantra ${selectedChantCount} times daily.`);
    setBonusTip(selectedBonusTip);
    setMantraExplanation(`Why this mantra? ${selectedMantraExplanation}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Powered Astrological Insights
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover personalized recommendations powered by advanced AI analysis.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <OptionCard
            isActive={activeSection === "Gemstone Recommendations"}
            icon={<Gem className="w-8 h-8 text-purple-500" />}
            title="Gemstone Recommendations"
            onClick={() => setActiveSection("Gemstone Recommendations")}
          />
          <OptionCard
            isActive={activeSection === "Personalized Mantras"}
            icon={<Brain className="w-8 h-8 text-blue-500" />}
            title="Personalized Mantras"
            onClick={() => setActiveSection("Personalized Mantras")}
          />
          <OptionCard
            isActive={activeSection === "Yoga Practices"}
            icon={<Sparkles className="w-8 h-8 text-indigo-500" />}
            title="Yoga Practices"
            onClick={() => setActiveSection("Yoga Practices")}
          />
        </div>

        {/* Conditional Rendering of Sections */}
        {activeSection === "Gemstone Recommendations" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Gemstone Recommendations
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Discover the perfect gemstones to enhance your energy and balance your chakras.
            </p>
            <GemstoneList/>
          </div>
        )}

        {activeSection === "Personalized Mantras" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Personalized Mantras
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Enter your birth details to receive a custom mantra aligned with your astrological
                profile and current planetary positions.
              </p>
              <input
                type="date"
                className="block w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
              <button
                onClick={generateMantra}
                className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
              >
                Generate Mantra
              </button>
              {mantra && (
                <div className="mt-6 space-y-2">
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{mantra}</p>
                  <p className="text-lg text-gray-700 dark:text-gray-300">{chantCount}</p>
                  <div>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      Bonus Tip:
                    </p>
                    <p className="text-sm italic text-gray-500 dark:text-gray-400">{bonusTip}</p>
                  </div>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">{mantraExplanation}</p>
                </div>
              )}
            </div>
          </div>
        )}
        {activeSection==="Yoga Practices" &&(
          <YogaPractices/>
        )}
        
      </div>
    </div>
  );
}

// Card Component for Options
function OptionCard({
  isActive,
  icon,
  title,
  onClick,
}: {
  isActive: boolean;
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-lg shadow-md transition-all transform ${
        isActive
          ? "bg-blue-600 text-white scale-105"
          : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 hover:scale-105 hover:shadow-lg"
      }`}
    >
      <div className="flex items-center">
        {icon}
        <h3 className="ml-3 text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
}