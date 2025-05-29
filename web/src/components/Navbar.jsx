import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          Ceylon Safari
        </Link>

        {/* Nav Links */}
        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-400 transition duration-200">Home</Link>
          <Link to="/accommodation" className="hover:text-blue-400 transition duration-200">Accommodation</Link>
          <Link to="/ai-recommender" className="hover:text-blue-400 transition duration-200">AI Recommender</Link>
          <Link to="/map" className="hover:text-blue-400 transition duration-200">Map</Link>
          <Link to="/news" className="hover:text-blue-400 transition duration-200">News</Link>
          <Link to="/weather" className="hover:text-blue-400 transition duration-200">Weather</Link>

          {/* Login & Sign Up */}
          <div className="flex space-x-3 ml-4">
            <Link
              to="/login"
              className="bg-white text-black px-4 py-1.5 rounded-md text-sm hover:bg-blue-500 hover:text-white transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
