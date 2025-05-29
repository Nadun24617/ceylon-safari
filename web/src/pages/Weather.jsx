import React, { useEffect, useState } from "react";
import { color, motion } from "framer-motion";

const WeatherCard = () => {
  const [city, setCity] = useState("Colombo");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usingLocation, setUsingLocation] = useState(false);

  const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  const fetchWeather = async (query) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        console.error("API error:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    setUsingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(`lat=${latitude}&lon=${longitude}`);
      },
      (error) => {
        console.error("Location error:", error);
        setUsingLocation(false);
      }
    );
  };

  useEffect(() => {
    if (!usingLocation) {
      fetchWeather(`q=${city},LK`);
    }
  }, [city, usingLocation]);

  const handleCityChange = (e) => {
    setUsingLocation(false);
    setCity(e.target.value);
  };

  return (
    <div style={styles.background}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={styles.card}
      >
        <h2 style={styles.heading}>🌍 Weather Forecast</h2>

        <div style={styles.controls}>
          <select onChange={handleCityChange} value={city} style={styles.select}>
            <option value="Colombo">Colombo</option>
            <option value="Kandy">Kandy</option>
            <option value="Galle">Galle</option>
            <option value="Jaffna">Jaffna</option>
            <option value="Nuwara Eliya">Nuwara Eliya</option>
          </select>
          <button onClick={getCurrentLocation} style={styles.button}>
            📍 Use My Location
          </button>
        </div>

        {loading && <p style={styles.text}>Loading weather data...</p>}

        {!loading && weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={styles.text}
          >
            <h3 style={styles.location}>{weather.name}, {weather.sys.country}</h3>
            <p style={styles.description}>
              <strong>{weather.weather[0].main} - {weather.weather[0].description}</strong>
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="weather icon"
              style={{ width: "120px" }}
            />
            <p>🌡️ Temp: <strong>{weather.main.temp} °C</strong></p>
            <p>💧 Humidity: <strong>{weather.main.humidity}%</strong></p>
            <p>🌬️ Wind: <strong>{weather.wind.speed} m/s</strong></p>
          </motion.div>
        )}

        {!loading && !weather && <p style={styles.text}>Could not fetch weather data.</p>}
      </motion.div>
    </div>
  );
};

const styles = {
  background: {
    backgroundImage: `url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backdropFilter: "blur(16px)",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: "50px",
    borderRadius: "24px",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    color: "#fff",
    width: "100%",
    maxWidth: "600px",
    animation: "pulse 3s ease-in-out infinite",
  },

  controls: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    fontSize: "16px",
    border: "none",
    color: "#333",
  },
  button: {
    padding: "10px 16px",
    background: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  text: {
    color: "#fff",
    fontSize: "18px",
    marginTop: "10px",
  },
};

export default WeatherCard;
