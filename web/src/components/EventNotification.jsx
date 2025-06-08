// components/EventNotification.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EventNotification = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/events');
        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const notificationVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  const latestEvent = events.length > 0
    ? events.reduce((latest, event) => {
        return new Date(event.date) > new Date(latest.date) ? event : latest;
      }, events[0])
    : null;

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={notificationVariants}
          transition={{ duration: 0.5 }}
          className="fixed top-5 right-5 z-50 bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg shadow-lg cursor-pointer select-none max-w-xs"
        >
          {loadingEvents && <span>Loading latest event...</span>}
          {error && <span>Error: {error}</span>}
          {!loadingEvents && !error && latestEvent && (
            <>
              <strong>Latest Event:</strong> {latestEvent.text} - <em>{new Date(latestEvent.date).toLocaleDateString()}</em>
            </>
          )}
          {!loadingEvents && !error && !latestEvent && (
            <span>No upcoming events</span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventNotification;
