import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [touristName, setTouristName] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // to detect URL changes

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setTouristName(user.fullName); // assuming user object has fullName
    } else {
      setTouristName("");
    }
  }, [location]); // re-run this effect whenever URL changes

  const handleLogout = () => {
    localStorage.removeItem("user");
    setTouristName("");
    navigate("/"); // redirect after logout
  };

  return (
    <nav className="bg-black text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          Ceylon Safari
        </Link>

        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/accommodation" className="hover:text-blue-400 transition duration-200">Accommodation</Link>
          <Link to="/ai-recommender" className="hover:text-blue-400 transition duration-200">AI Recommender</Link>
          <Link to="/map" className="hover:text-blue-400 transition duration-200">Map</Link>
          <Link to="/news" className="hover:text-blue-400 transition duration-200">News</Link>
          <Link to="/weather" className="hover:text-blue-400 transition duration-200">Weather</Link>
        </div>

        {touristName && (
          <div className="ml-6 flex items-center space-x-3 text-sm font-medium">
            <span>
              Logged in As <span className="font-semibold">{touristName}</span>
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 transition px-3 py-1 rounded text-white text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
