import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Ceylon Safari</Link>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/accommodation" className="hover:text-blue-400">Accommodation</Link>
          <Link to="/ai-recommender" className="hover:text-blue-400">AI Recommender</Link>
          <Link to="/map" className="hover:text-blue-400">Map</Link>
          <Link to="/news" className="hover:text-blue-400">News</Link>
          <Link to="/weather" className="hover:text-blue-400">Weather</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;