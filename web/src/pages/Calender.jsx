import React, { useEffect, useState } from "react";

const Calendar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check user role
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") {
      setIsAdmin(true);
    }

    // Fetch events from backend
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Calendar</h1>
      {isAdmin ? (
        <p className="mb-4 text-green-700 font-semibold">
          Welcome Admin! You have full access to calendar features.
        </p>
      ) : (
        <p className="mb-4 text-blue-700 font-semibold">
          Welcome User! Your calendar access is limited.
        </p>
      )}

      {loading && <p>Loading events...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && events.length === 0 && (
        <p>No events found.</p>
      )}

      {!loading && !error && events.length > 0 && (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event._id} className="border p-4 rounded shadow-sm">
              <p>
                <strong>Date:</strong> {event.date}
              </p>
              <p>
                <strong>Event:</strong> {event.text}
              </p>
              <p className="text-sm text-gray-500">
                Created by: {event.createdBy} on {new Date(event.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Calendar;
