import React, { useState, useContext } from "react";
import { AppContent } from "../context/AppContext";
import MemberBar from "../components/MemberBar";
import EventNOtofication from "../components/EventNotification"; // ✅ Import the component

const Dashboard = ({ children }) => {
  const { userdata, setUserData, setIsLoggedin } = useContext(AppContent);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUserData(null);
    setIsLoggedin(false);
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-lightBlue-100 via-white to-lightBlue-200">
      <MemberBar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center relative">
          <h2 className="text-xl font-bold text-lightBlue-600">
            Welcome to Sri Lanka 🇱🇰
          </h2>

          {userdata && (
            <div className="relative">
              <div
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full bg-lightBlue-600 text-white flex items-center justify-center cursor-pointer"
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

        {/* ✅ Event Notification inserted here */}
        <div className="p-4">
          <EventNOtofication />
        </div>

        <main className="p-6 overflow-y-auto h-full">
          {!children && (
            <div className="space-y-6">
              <img
                src="src/assets/0_5YtayrKm8V4KndMd.jpg"
                alt="Sri Lanka Banner"
                className="rounded-xl shadow-md w-full h-64 object-cover"
              />
              <h3 className="text-2xl font-bold text-lightBlue-700">
                Explore the Wonders of Sri Lanka
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Welcome to Ceylon Safari – your personalized guide to discovering
                the rich culture, breathtaking nature, and unforgettable
                experiences Sri Lanka has to offer. From the misty mountains of
                Ella to the golden beaches of Mirissa, explore hidden gems,
                receive AI travel suggestions, view real-time weather and news,
                and immerse yourself in our festivals and traditions.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition">
                  <h4 className="text-lg font-semibold text-lightBlue-600">
                    🌴 Top Destinations
                  </h4>
                  <p className="text-gray-500">
                    Sigiriya, Kandy, Ella, Nuwara Eliya, Galle, and more.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition">
                  <h4 className="text-lg font-semibold text-lightBlue-600">
                    📅 Travel Tips
                  </h4>
                  <p className="text-gray-500">
                    Best time to travel, visa info, safety guidelines, do’s and
                    don’ts.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition">
                  <h4 className="text-lg font-semibold text-lightBlue-600">
                    🎉 Culture & Festivals
                  </h4>
                  <p className="text-gray-500">
                    Experience Vesak, Perahera, Sinhala & Tamil New Year.
                  </p>
                </div>
              </div>
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
