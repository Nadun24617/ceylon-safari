import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPassport, FaLock, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    passport: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email address";
    if (!formData.country) newErrors.country = "Please select a country";
    if (!formData.passport.trim()) newErrors.passport = "Passport number is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/tourists/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          country: formData.country,
          passport: formData.passport,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      toast.success("Signup successful! Please login");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-white to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-10 w-full max-w-xl transition-all duration-300 hover:shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          🌍 Tourist Sign-Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-blue-500" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className={`w-full pl-10 pr-4 py-3 border ${errors.fullName ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-400 outline-none`}
                onChange={handleChange}
                value={formData.fullName}
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-blue-500" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className={`w-full pl-10 pr-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-400 outline-none`}
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Country */}
          <div>
            <div className="relative">
              <select
                name="country"
                className={`w-full appearance-none px-4 py-3 border ${errors.country ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-400 outline-none`}
                onChange={handleChange}
                value={formData.country}
              >
                <option value="">🌐 Select Country</option>
                <option value="Sri Lanka">🇱🇰 Sri Lanka</option>
                <option value="India">🇮🇳 India</option>
                <option value="United States">🇺🇸 United States</option>
                <option value="United Kingdom">🇬🇧 United Kingdom</option>
                <option value="Germany">🇩🇪 Germany</option>
                <option value="Australia">🇦🇺 Australia</option>
                <option value="France">🇫🇷 France</option>
              </select>
            </div>
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>

          {/* Passport */}
          <div>
            <div className="relative">
              <FaPassport className="absolute left-3 top-3 text-blue-500" />
              <input
                type="text"
                name="passport"
                placeholder="Passport Number"
                className={`w-full pl-10 pr-4 py-3 border ${errors.passport ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-400 outline-none`}
                onChange={handleChange}
                value={formData.passport}
              />
            </div>
            {errors.passport && <p className="text-red-500 text-sm mt-1">{errors.passport}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-blue-500" />
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 characters)"
                className={`w-full pl-10 pr-4 py-3 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-400 outline-none`}
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-blue-500" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className={`w-full pl-10 pr-4 py-3 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-400 outline-none`}
                onChange={handleChange}
                value={formData.confirmPassword}
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md flex items-center justify-center ${loading ? "opacity-80 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;