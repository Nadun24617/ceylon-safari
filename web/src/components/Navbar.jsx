import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Your Logo</Link>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/accommodations" className="hover:text-blue-200">Accommodation</Link>
          <Link to="/ai-recommender" className="hover:text-blue-200">AI Recommender</Link>
          <Link to="/map" className="hover:text-blue-200">Map</Link>
          <Link to="/news" className="hover:text-blue-200">News</Link>
          <Link to="/weather" className="hover:text-blue-200">Weather</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;