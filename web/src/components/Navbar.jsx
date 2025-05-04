import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🌍 ExploreApp</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/map" className="hover:text-blue-500">Map</Link>
        <Link to="/weather" className="hover:text-blue-500">Weather</Link>
        <Link to="/news" className="hover:text-blue-500">News</Link>
        <Link to="/ai" className="hover:text-blue-500">AI</Link>
        <Link to="/accommodation" className="hover:text-blue-500">Stay & Eat</Link>
      </div>
    </nav>
  );
};

export default Navbar;
