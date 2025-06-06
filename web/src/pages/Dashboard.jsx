// DashboardLayout.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, MapPin, Newspaper, CloudSun, Sparkles, Brain, AlignJustify } from 'lucide-react';
import classNames from 'classnames';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: 'Accomodation', icon: Home, path: '/accomodation' },
    { name: 'AI Recommender', icon: Brain, path: '/ai-recommender' },
    { name: 'Map', icon: MapPin, path: '/map' },
    { name: 'News', icon: Newspaper, path: '/news' },
    { name: 'Weather', icon: CloudSun, path: '/weather' },
  ];

  return (
    <div
      className={classNames(
        'h-screen bg-white shadow-lg transition-all duration-300 flex flex-col',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {isOpen && (
          <h1 className="text-lightBlue-500 font-extrabold text-xl glitter-text">Ceylon Safari</h1>
        )}
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500">
          <AlignJustify />
        </button>
      </div>
      <nav className="flex flex-col gap-2 mt-4 px-2">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <Link
            key={name}
            to={path}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition"
          >
            <Icon className="text-lightBlue-500" />
            {isOpen && <span className="text-gray-700 font-medium">{name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

const Dashboard = ({ children }) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-lightBlue-100 via-white to-lightBlue-200">
      <Sidebar />
      <div className="flex-1">
        <header className="bg-white shadow p-4">
          <h2 className="text-xl font-bold text-lightBlue-600">Dashboard</h2>
        </header>
        <main className="p-6 overflow-y-auto h-full">{children}</main>
      </div>
    </div>
  );
};

export default Dashboard;

// tailwind.config.js addition (for custom colors & glitter effect)
/*
  theme: {
    extend: {
      colors: {
        lightBlue: {
          100: '#e0f7fa',
          200: '#b2ebf2',
          500: '#03a9f4',
          600: '#0288d1',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
*/

// Add glitter effect to your CSS (e.g., in App.css or a separate styles.css)
/*
.glitter-text {
  background: linear-gradient(90deg, #a0e9ff, #cbf1ff, #a0e9ff);
  background-size: 200% auto;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  animation: shimmer 2s linear infinite;
}

@keyframes shimmer {
  to {
    background-position: 200% center;
  }
}
*/
