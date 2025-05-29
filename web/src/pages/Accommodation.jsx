import React, { useState } from "react";
import axios from "axios";

const AccommodationPage = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

  const fetchAccommodations = async () => {
    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates");
      return;
    }
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await axios.get(
        "https://booking-com.p.rapidapi.com/v1/hotels/search",
        {
          params: {
            dest_id: "-2174441", // Colombo city ID
            dest_type: "city",
            checkin_date: checkIn,
            checkout_date: checkOut,
            adults_number: adults.toString(),
            room_number: rooms.toString(),
            locale: "en-us",
            units: "metric",
            order_by: "popularity",
            filter_by_currency: "USD",
            page_number: "0",
            include_adjacency: "true",
          },
          headers: {
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
          },
        }
      );

      if (res.data && res.data.result) {
        setResults(res.data.result);
      } else {
        setError("No accommodations found.");
      }
    } catch (err) {
      setError("Error fetching data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={{ marginBottom: 20 }}>Sri Lanka Accommodations</h1>

        <div style={styles.formRow}>
          <label>
            Check-in:{" "}
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              style={styles.input}
            />
          </label>

          <label>
            Check-out:{" "}
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split("T")[0]}
              style={styles.input}
            />
          </label>
        </div>

        <div style={styles.formRow}>
          <label>
            Adults:{" "}
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              style={styles.select}
            >
              {[...Array(5)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>

          <label>
            Rooms:{" "}
            <select
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              style={styles.select}
            >
              {[...Array(5)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button onClick={fetchAccommodations} style={styles.button}>
          {loading ? "Loading..." : "Search"}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.resultsContainer}>
          {loading && (
            <div style={styles.loader} aria-label="Loading..."></div>
          )}

          {!loading && results.length === 0 && !error && (
            <p style={{ marginTop: 20 }}>No results to display</p>
          )}

          {results.map((hotel) => (
            <div key={hotel.hotel_id} style={styles.resultCard}>
              <img
                src={hotel.max_photo_url || "https://via.placeholder.com/150"}
                alt={hotel.hotel_name}
                style={styles.hotelImage}
              />
              <div style={styles.hotelInfo}>
                <h3>{hotel.hotel_name}</h3>
                <p>⭐ {hotel.review_score || "N/A"}</p>
                <p>
                  Price: {hotel.min_total_price ? `$${hotel.min_total_price}` : "N/A"}
                </p>
                <a
                  href={hotel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 30,
    maxWidth: 900,
    width: "100%",
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
  },
  formRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
    flexWrap: "wrap",
    gap: "15px",
  },
  input: {
    padding: 8,
    fontSize: 16,
    borderRadius: 5,
    border: "1px solid #ccc",
    minWidth: 150,
  },
  select: {
    padding: 8,
    fontSize: 16,
    borderRadius: 5,
    border: "1px solid #ccc",
    minWidth: 100,
  },
  button: {
    padding: "12px 25px",
    fontSize: 18,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#0077cc",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#005fa3",
  },
  error: {
    color: "red",
    marginTop: 15,
  },
  resultsContainer: {
    marginTop: 30,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
    gap: 25,
  },
  resultCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },
  hotelImage: {
    width: "100%",
    height: 160,
    objectFit: "cover",
  },
  hotelInfo: {
    padding: 15,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  link: {
    marginTop: 10,
    color: "#0077cc",
    textDecoration: "none",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  loader: {
    margin: "20px auto",
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #0077cc",
    borderRadius: "50%",
    width: 40,
    height: 40,
    animation: "spin 1s linear infinite",
  },

  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

export default AccommodationPage;
