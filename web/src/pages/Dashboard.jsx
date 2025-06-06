import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  MapPin,
  Newspaper,
  CloudSun,
  Brain,
  AlignJustify,
} from "lucide-react";
import classNames from "classnames";
import { AppContent } from "../context/AppContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Accomodation", icon: Home, path: "/accomodation" },
    { name: "AI Recommender", icon: Brain, path: "/ai-recommender" },
    { name: "Map", icon: MapPin, path: "/map" },
    { name: "News", icon: Newspaper, path: "/news" },
    { name: "Weather", icon: CloudSun, path: "/weather" },
  ];

  return (
    <div
      className={classNames(
        "h-screen bg-white shadow-lg transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {isOpen && (
          <h1 className="text-lightBlue-500 font-extrabold text-xl glitter-text">
            Ceylon Safari
          </h1>
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
  const { userdata, setUserData, setIsLoggedin } = useContext(AppContent);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    // Clear localStorage and context on logout
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUserData(null);
    setIsLoggedin(false);
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-lightBlue-100 via-white to-lightBlue-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center relative">
          <h2 className="text-xl font-bold text-lightBlue-600">Dashboard</h2>

          {/* Profile circle on top right */}
          {userdata && (
            <div className="relative">
              <div
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full bg-lightBlue-600 text-white flex items-center justify-center cursor-pointer select-none"
                title={userdata.fullName}
              >
                {userdata.fullName[0].toUpperCase()}
              </div>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </header>
        <main className="p-6 overflow-y-auto h-full">{children}</main>
      </div>
    </div>
  );
};

export default Dashboard;
