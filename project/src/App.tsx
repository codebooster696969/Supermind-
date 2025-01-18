import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import KundaliForm from './components/KundaliForm';
import AIInsights from './components/AIInsights';
import Chat from './components/Chat';
import BirthChart from './components/BirthChart';
import { ThemeProvider } from './components/ThemeContext';
import Transit from './components/Transit';
import Planets from './components/Planets';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-200">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kundali" element={<KundaliForm />} />
            <Route path="/ai-insights" element={<AIInsights />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/chat" element={<Chat />} />
            <Route path='/transits' element={<Transit/>}/>
            <Route path="/birth-chart" element={<BirthChart />} />
            {/* Add routes for other features */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;