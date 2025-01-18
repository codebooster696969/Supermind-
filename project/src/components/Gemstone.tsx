import React, { useState } from 'react';
import { Hexagon, Circle, Square, Sun, Moon, Star, Triangle } from 'lucide-react';

const GemstoneList = () => {
  const gemstones = [
    { name: 'Blue Sapphire', planet: 'Saturn', icon: <Hexagon className="w-6 h-6 text-blue-500" /> },
    { name: 'Yellow Sapphire', planet: 'Jupiter', icon: <Circle className="w-6 h-6 text-yellow-500" /> },
    { name: 'Emerald', planet: 'Mercury', icon: <Square className="w-6 h-6 text-green-500" /> },
    { name: 'Ruby', planet: 'Sun', icon: <Sun className="w-6 h-6 text-red-500" /> },
    { name: 'Pearl', planet: 'Moon', icon: <Moon className="w-6 h-6 text-gray-500" /> },
    { name: 'Opal', planet: 'Venus', icon: <Star className="w-6 h-6 text-pink-500" /> },
    { name: 'Red Coral', planet: 'Mars', icon: <Triangle className="w-6 h-6 text-orange-500" /> },
    { name: 'Cat’s Eye', planet: 'Ketu', icon: <Hexagon className="w-6 h-6 text-yellow-800" /> },
    { name: 'Hessonite', planet: 'Rahu', icon: <Circle className="w-6 h-6 text-brown-500" /> },
  ];

  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: ''
  });

  const [randomGemstone, setRandomGemstone] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCalculate = () => {
    const randomIndex = Math.floor(Math.random() * gemstones.length);
    const selectedGemstone = gemstones[randomIndex];
    setRandomGemstone(selectedGemstone);
  };

  return (
    <div className="space-y-4">
      <table className="w-full text-left table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Gemstone</th>
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Planet</th>
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Icon</th>
          </tr>
        </thead>
        <tbody>
          {gemstones.map((gem, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-gray-900 dark:text-gray-100">{gem.name}</td>
              <td className="border px-4 py-2 text-gray-900 dark:text-gray-100">{gem.planet}</td>
              <td className="border px-4 py-2">{gem.icon}</td>
              
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
        <input
          type="time"
          name="timeOfBirth"
          placeholder="Time of Birth"
          value={formData.timeOfBirth}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
        <input
          type="text"
          name="placeOfBirth"
          placeholder="Place of Birth"
          value={formData.placeOfBirth}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
      </div>

      <button
        onClick={handleCalculate}
        className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Calculate Your Gemstone
      </button>

      {randomGemstone && (
  <div className="mt-6 p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Your Recommended Gemstone
      </h2>
      <p className="mt-4 text-gray-700 dark:text-gray-300 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
        <strong>Gemstone:</strong> {randomGemstone.name} <br />
        <strong>Planet:</strong> {randomGemstone.planet}
      </p>
      <div className="mt-6 space-y-4">
        <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Importance:</h3>
          <p className="text-gray-700 dark:text-gray-300">
            {getImportance(randomGemstone.name)}
          </p>
        </div>
        <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">When to Wear:</h3>
          <p className="text-gray-700 dark:text-gray-300">
            {getWhenToWear(randomGemstone.name)}
          </p>
        </div>
        <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Do's and Don'ts:</h3>
          <p className="text-gray-700 dark:text-gray-300">
            {getDosAndDonts(randomGemstone.name)}
          </p>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-center">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative overflow-hidden rounded-lg ring-2 ring-purple-500 shadow-xl transform group-hover:scale-105 transition duration-300">
          <img
            src={`/${randomGemstone.name}.jpg`}
            alt={randomGemstone.name}
            className="w-64 h-64 object-cover"
          />
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

// Define a type for gemstone names
type GemstoneName = 
  | "Blue Sapphire"
  | "Yellow Sapphire"
  | "Emerald"
  | "Ruby"
  | "Pearl"
  | "Opal"
  | "Red Coral"
  | "Cat’s Eye"
  | "Hessonite";

function getImportance(gemstone: GemstoneName) {
  const importance: Record<GemstoneName, string> = {
    "Blue Sapphire": "Blue Sapphire boosts focus, clarity, and discipline, aligning with Saturn's energy.",
    "Yellow Sapphire": "Yellow Sapphire enhances wisdom, prosperity, and good fortune under Jupiter's influence.",
    "Emerald": "Emerald strengthens communication, intellect, and creativity by channeling Mercury's power.",
    "Ruby": "Ruby enhances vitality, leadership, and confidence, embodying the Sun's strength.",
    "Pearl": "Pearl calms emotions, promotes peace, and enhances intuition, reflecting the Moon's energies.",
    "Opal": "Opal enhances love, beauty, and harmony, radiating Venus's artistic and romantic qualities.",
    "Red Coral": "Red Coral provides courage, strength, and vitality, aligning with Mars's fiery energy.",
    "Cat’s Eye": "Cat’s Eye guards against misfortune and promotes spiritual growth, linked with Ketu.",
    "Hessonite": "Hessonite neutralizes negative energies and enhances success, under Rahu's influence."
  };
  return importance[gemstone] || "No information available.";
}

function getWhenToWear(gemstone: GemstoneName) {
  const timings: Record<GemstoneName, string> = {
    "Blue Sapphire": "Wear on a Saturday during Shani Hora or after consulting an astrologer.",
    "Yellow Sapphire": "Wear on a Thursday morning during Guru Hora, ideally on the index finger.",
    "Emerald": "Wear on a Wednesday morning during Budh Hora on the little finger.",
    "Ruby": "Wear on a Sunday morning during Ravi Hora on the ring finger.",
    "Pearl": "Wear on a Monday morning during Chandra Hora on the little finger.",
    "Opal": "Wear on a Friday morning during Shukra Hora on the ring finger.",
    "Red Coral": "Wear on a Tuesday morning during Mangal Hora on the ring finger.",
    "Cat’s Eye": "Wear on a Tuesday evening during Rahu Hora after proper purification.",
    "Hessonite": "Wear on a Saturday evening during Rahu Hora after proper consultation."
  };
  return timings[gemstone] || "Consult a qualified astrologer for the best time.";
}

function getDosAndDonts(gemstone: GemstoneName) {
  const dosAndDonts: Record<GemstoneName, string> = {
    "Blue Sapphire": "Do: Ensure proper purification before wearing. Don't: Wear without astrological guidance.",
    "Yellow Sapphire": "Do: Wear with a gold ring. Don't: Combine with diamonds or emeralds.",
    "Emerald": "Do: Wear with a silver ring. Don't: Combine with yellow sapphire or pearl.",
    "Ruby": "Do: Pair with gold. Don't: Wear with blue sapphire or diamonds.",
    "Pearl": "Do: Wear with silver. Don't: Wear with hessonite or blue sapphire.",
    "Opal": "Do: Pair with a gold or silver ring. Don't: Combine with red coral or ruby.",
    "Red Coral": "Do: Wear with a copper or gold ring. Don't: Combine with blue sapphire or emerald.",
    "Cat’s Eye": "Do: Wear after consulting an astrologer. Don't: Wear alongside hessonite or diamond.",
    "Hessonite": "Do: Pair with a silver or panchdhatu ring. Don't: Combine with pearl or coral."
  };
  return dosAndDonts[gemstone] || "Consult a qualified astrologer for do's and don'ts.";
}

export default GemstoneList;