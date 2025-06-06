import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSpinner } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",      // renamed from username to email for clarity
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);  // optional

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/tourists/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data and token
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
        });

        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
        toast.error(data.message || "Login failed", {
          position: "top-right",
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
      toast.error("Server error. Please try again later.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-white to-blue-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          🔐 Tourist Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Email */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-blue-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              onChange={handleChange}
              value={formData.email}
              autoComplete="username"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-blue-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              onChange={handleChange}
              value={formData.password}
              autoComplete="current-password"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-blue-500 hover:text-blue-700 transition-colors"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md ${
              loading ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 font-medium"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
