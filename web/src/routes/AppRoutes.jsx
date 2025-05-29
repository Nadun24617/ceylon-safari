import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPassport, FaLock } from "react-icons/fa";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    passport: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    // Submit logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-white to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-xl transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          🌍 Tourist Sign-Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-blue-500" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-blue-500" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          {/* Country */}
          <div className="relative">
            <select
              name="country"
              className="w-full appearance-none px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={handleChange}
              required
            >
              <option value="">🌐 Select Country</option>
              <option value="Sri Lanka">🇱🇰 Sri Lanka</option>
              <option value="India">🇮🇳 India</option>
              <option value="United States">🇺🇸 United States</option>
              <option value="United Kingdom">🇬🇧 United Kingdom</option>
              <option value="Germany">🇩🇪 Germany</option>
              <option value="Australia">🇦🇺 Australia</option>
              <option value="France">🇫🇷 France</option>
              {/* Add more as needed */}
            </select>
          </div>

          {/* Passport */}
          <div className="relative">
            <FaPassport className="absolute left-3 top-3 text-blue-500" />
            <input
              type="text"
              name="passport"
              placeholder="Passport Number"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-blue-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-blue-500" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
