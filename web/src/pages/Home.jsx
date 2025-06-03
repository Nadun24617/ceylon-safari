import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import heroBg from '../assets/hero-bg.jpg';
import feature1 from '../assets/feature1.jpg';
import feature2 from '../assets/feature2.jpg';
import feature3 from '../assets/feature3.jpg';

const Home = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from backend API
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

  // Hide notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const notificationVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  // Get latest event (assuming events have a date property)
  const latestEvent = events.length > 0
    ? events.reduce((latest, event) => {
        return new Date(event.date) > new Date(latest.date) ? event : latest;
      }, events[0])
    : null;

  return (
    <div className="overflow-hidden bg-gray-900 text-gray-100 relative">
      
      {/* Notification - top right */}
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

      {/* Hero Section with Dark Overlay */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Darker overlay for better contrast in dark mode */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Hero content with animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover <span className="text-yellow-300">Sri Lanka</span> Like Never Before
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Your AI-powered travel companion for the Pearl of the Indian Ocean
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/ai"
                className="inline-block bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300"
              >
                Create My Plan
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/accommodation"
                className="inline-block border-2 border-gray-300 text-gray-300 hover:bg-white/10 font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300"
              >
                Explore Stays
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scrolling indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Sri Lanka Introduction - Dark Theme */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-16 px-4 bg-gradient-to-b from-gray-800 to-gray-900"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-300">Welcome to Sri Lanka</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4 text-gray-300">
                For centuries, Sri Lanka has captivated travelers from Fa-Hien in 410 AD to Marco Polo who called it{' '}
                <span className="italic text-gray-200">"the best island of its size in the world"</span>.
              </p>
              <p className="text-lg mb-4 text-gray-300">
                In 2024, we welcomed 2 million visitors, and in 2025 we aim for 2.5 million. Ceylon Safari helps independent travelers
                discover the real Sri Lanka beyond the guidebooks.
              </p>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-xl border border-gray-700">
              <img
                src="https://images.unsplash.com/photo-1564501049412-61c2a3083791"
                alt="Sri Lanka landscape"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Key Features - Dark Theme */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-300">Your Complete Travel Companion</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden border border-gray-600">
                <img src={feature1} alt="AI Recommendations" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-300">AI-Powered Personalization</h3>
              <p className="text-gray-300">Get custom travel plans tailored to your budget, interests, and duration of stay.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden border border-gray-600">
                <img src={feature2} alt="Real-time data" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-300">Real-Time Intelligence</h3>
              <p className="text-gray-300">Access live updates on weather, local events, and transportation for seamless travel.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden border border-gray-600">
                <img src={feature3} alt="Accommodation" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-300">Curated Accommodation</h3>
              <p className="text-gray-300">Discover perfect stays from luxury resorts to authentic homestays, handpicked for you.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="py-12 px-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Start Planning Your Sri Lanka Adventure Today</h2>
        <p className="mb-6 text-lg max-w-xl mx-auto">
          Join thousands of travelers who have experienced the magic of Sri Lanka with Ceylon Safari.
        </p>
        <Link
          to="/ai"
          className="inline-block bg-gray-900 hover:bg-gray-800 text-yellow-400 font-semibold py-3 px-10 rounded-full transition-all duration-300"
        >
          Create My Plan Now
        </Link>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-500 text-center py-6 mt-16">
        &copy; {new Date().getFullYear()} Ceylon Safari. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
