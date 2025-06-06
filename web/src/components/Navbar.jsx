import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  const [touristName, setTouristName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setTouristName(user.fullName);
    } else {
      setTouristName("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setTouristName("");
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent px-6 py-4 flex items-center justify-between">
        {/* Left - Light Blue "Ceylon Safari" */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-lightBlue-500 cursor-pointer select-none"
          style={{ color: "#3caaff" }}
        >
          Ceylon Safari
        </Link>

        {/* Right - Conditional: Show SignUp button if NOT logged in, else Logout */}
        {touristName ? (
          <div className="flex items-center space-x-4">
            <span className="text-white font-medium text-sm hidden sm:block">
              Logged in as <span className="font-semibold">{touristName}</span>
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-[#3caaff] text-[#3caaff] rounded-md hover:bg-[#3caaff] hover:text-white transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/signup")}
            className="flex items-center justify-center gap-2 text-[#3caaff] border border-[#3caaff] rounded-full text-lg font-semibold px-6 py-3
                       hover:text-white transition-colors duration-300"
            style={{
              backgroundColor: "transparent",
              width: "140px",
              height: "50px",
              transitionProperty: "background-color, color",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(90deg, #6bc1ff, #33aaff, #6bc1ff, #33aaff)";
              e.currentTarget.style.backgroundSize = "200% 200%";
              e.currentTarget.style.animation = "glitterGradient 3s ease-in-out infinite";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.animation = "none";
              e.currentTarget.style.color = "#3caaff";
            }}
          >
            SignUp
            <ArrowRight
              size={22}
              className="motion-safe:animate-moveRight opacity-90"
              strokeWidth={2}
            />
          </button>
        )}
      </nav>

      {/* Glitter animation keyframes */}
      <style>{`
        @keyframes glitterGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
