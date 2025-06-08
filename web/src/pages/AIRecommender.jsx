import React, { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MemberBar from "../components/MemberBar"; // ✅ Correct placement

const AIRecommender = () => {
  const [form, setForm] = useState({
    age_group: "",
    gender: "",
    employment_status: "",
    country_of_residence: "",
    occupation: "",
    transport_modes: "",
    accommodation_type: "",
    travel_budget: "",
    booking_method: "",
    travel_apps_used: "",
    interested_in_new_app: "",
    features_liked: "",
    challenges: "",
    trip_satisfaction_level: "",
  });
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventText, setEventText] = useState("");

  const quickOptions = ["beaches", "nature", "hills", "adventure"];

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        const formattedEvents = data.map((ev) => ({
          ...ev,
          date: new Date(ev.date).toDateString(),
        }));
        setEvents(formattedEvents);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      });
  }, []);

  const handleGenerate = async () => {
  setLoading(true);
  setRecommendation("");

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (data.recommended_destination) {
      let message = `🌍 Recommended Destination Category: ${data.recommended_destination}`;

      if (data.places && Array.isArray(data.places)) {
        message += `\n\n📍 Suggested Places:\n` + data.places.map(
          place =>
            `• ${place.name} (${place.location}): ${place.description}`
        ).join("\n");
      }

      setRecommendation(message);
    } else if (data.error) {
      setRecommendation(`⚠️ Error: ${data.error}`);
    } else {
      setRecommendation("⚠️ Unknown error.");
    }
  } catch (error) {
    setRecommendation("⚠️ Server error while getting recommendation.");
    console.error("Error fetching recommendation:", error);
  }

  setLoading(false);
 };


  const handleQuickOptionClick = (option) => {
    setForm((prev) => ({
      ...prev,
      features_liked: option,
    }));
    setRecommendation("");
  };

  const handleAddEvent = () => {
    if (!eventText.trim()) return;

    const newEvent = {
      date: date.toISOString(),
      text: eventText.trim(),
      createdBy: "User",
    };

    fetch("http://localhost:5000/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add event");
        return res.json();
      })
      .then((savedEvent) => {
        setEvents((prev) => [
          ...prev,
          { ...savedEvent, date: new Date(savedEvent.date).toDateString() },
        ]);
        setEventText("");
      })
      .catch((err) => {
        console.error("Error adding event:", err);
      });
  };

  const hasEvent = (dateToCheck) => {
    return events.some((e) => new Date(e.date).toDateString() === dateToCheck.toDateString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6 flex">
      <MemberBar />
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-center text-blue-700 flex items-center justify-center gap-3 mb-10">
          <FaRobot className="text-blue-500" /> AI Travel Recommender & Scheduler
        </h1>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Panel: Recommender */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-xl rounded-3xl p-6"
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-4">🤖 Get Travel Suggestions</h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {quickOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleQuickOptionClick(option)}
                  className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full transition"
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {Object.entries(form).map(([key, value]) => (
                <input
                  key={key}
                  type={key === "travel_budget" ? "number" : "text"}
                  placeholder={key.replaceAll("_", " ")}
                  className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={value}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                />
              ))}
            </div>

            <button
              onClick={handleGenerate}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
            >
              <FiSend /> Recommend
            </button>

            <div className="bg-blue-50 rounded-xl p-4 min-h-[130px] mt-4">
              {loading ? (
                <motion.p
                  className="text-blue-600 font-medium"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  🧠 Thinking...
                </motion.p>
              ) : recommendation ? (
                <motion.pre
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-700 whitespace-pre-wrap"
                >
                  {recommendation}
                </motion.pre>
              ) : (
                <p className="text-gray-400">Your recommendations will appear here.</p>
              )}
            </div>
          </motion.div>

          {/* Right Panel: Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white shadow-xl rounded-3xl p-6"
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-4">📅 Plan Your Travel</h2>
            <Calendar
              value={date}
              onChange={setDate}
              className="mb-4 w-full rounded-lg border border-gray-300"
              tileContent={({ date: tileDate, view }) =>
                view === "month" && hasEvent(tileDate) ? (
                  <div className="mt-1 flex justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                ) : null
              }
            />

            <div className="max-h-48 overflow-auto border border-gray-200 rounded-md p-2 bg-gray-50">
              <h3 className="font-semibold mb-2">Events on {date.toDateString()}:</h3>
              {events.filter((ev) => ev.date === date.toDateString()).length === 0 && (
                <p className="text-gray-500">No events for this day.</p>
              )}
              <ul>
                {events
                  .filter((ev) => ev.date === date.toDateString())
                  .map((ev, i) => (
                    <li key={i} className="text-gray-700 text-sm mb-1">
                      • {ev.text}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Add event for this day"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
                value={eventText}
                onChange={(e) => setEventText(e.target.value)}
              />
              <button
                onClick={handleAddEvent}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Add
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommender;
