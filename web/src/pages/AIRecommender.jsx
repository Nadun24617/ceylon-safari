import React, { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AIRecommender = () => {
  const [input, setInput] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventText, setEventText] = useState("");

  // Your static recommendation map
  const recommendationsMap = {
    beaches: `🏖️ Top Sri Lankan Beaches:
- Mirissa: Perfect for whale watching & surfing.
- Unawatuna: Calm waters and golden sands.
- Arugam Bay: Surfer’s paradise with lively vibes.
- Nilaveli: Serene and less crowded for relaxation.`,
    nature: `🌿 Nature Destinations in Sri Lanka:
- Sinharaja Forest Reserve: UNESCO World Heritage rainforest.
- Yala National Park: Spot leopards and elephants.
- Udawalawe: Famous for wild elephant sightings.
- Horton Plains: Scenic trails and World's End cliff.`,
    hills: `⛰️ Hill Country Highlights:
- Nuwara Eliya: Colonial charm & tea plantations.
- Ella: Hike Little Adam’s Peak & visit Nine Arches Bridge.
- Haputale: Stunning mountain views and lipton seat.
- Kandy: Cultural capital with Temple of the Tooth.`,
    adventure: `🚵‍♂️ Adventure Spots:
- Kitulgala: White water rafting and jungle treks.
- Knuckles Range: Mountain trekking & biodiversity.
- Ella Rock: Adventurous hike with panoramic views.
- Kalpitiya: Kitesurfing and dolphin watching.`,
  };

  // Fetch events from backend on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/events") // change to your backend URL
      .then((res) => res.json())
      .then((data) => {
        // Convert event dates from backend ISO string to Date string for matching
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

  const handleGenerate = () => {
    let topic = input.trim().toLowerCase();
    if (!topic) topic = "beaches";
    setLoading(true);
    setRecommendation("");

    setTimeout(() => {
      const response =
        recommendationsMap[topic] ||
        `🤔 Sorry, I don't have recommendations for "${topic}". Try beaches, nature, hills, or adventure.`;
      setRecommendation(response);
      setLoading(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setRecommendation("");
  };

  const handleQuickOptionClick = (option) => {
    const trimmedOption = option.trim().toLowerCase();
    setInput(trimmedOption);
    setRecommendation("");
    setLoading(true);

    setTimeout(() => {
      const response =
        recommendationsMap[trimmedOption] ||
        `🤔 Sorry, I don't have recommendations for "${trimmedOption}". Try beaches, nature, hills, or adventure.`;
      setRecommendation(response);
      setLoading(false);
    }, 500);
  };

  // Add event: POST to backend and update state on success
  const handleAddEvent = () => {
    if (!eventText.trim()) return;

    const newEvent = {
      date: date.toISOString(), // backend expects ISO string date
      text: eventText.trim(),
      createdBy: "User", // you can change this or make dynamic
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
        // Append new event with formatted date to state
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

  const quickOptions = ["beaches", "nature", "hills", "adventure"];

  // Check if date has an event to mark it in calendar
  const hasEvent = (dateToCheck) => {
    return events.some((e) => new Date(e.date).toDateString() === dateToCheck.toDateString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 flex items-center justify-center gap-3 mb-10">
        <FaRobot className="text-blue-500" /> AI Travel Recommender & Scheduler
      </h1>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* AI Recommender Section */}
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

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="e.g. beaches, nature, adventure"
              className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={input}
              onChange={handleInputChange}
            />
            <button
              onClick={handleGenerate}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
            >
              <FiSend /> Recommend
            </button>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 min-h-[130px]">
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

        {/* Calendar Section */}
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
        </motion.div>
      </div>
    </div>
  );
};

export default AIRecommender;
