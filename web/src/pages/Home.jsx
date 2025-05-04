import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero-bg.jpg';
import feature1 from '../assets/feature1.jpg';
import feature2 from '../assets/feature2.jpg';
import feature3 from '../assets/feature3.jpg';

const Home = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="overflow-hidden bg-gray-900 text-gray-100">
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/ai" 
                className="inline-block bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300"
              >
                Create My Plan
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
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
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-300">
            Welcome to Sri Lanka
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4 text-gray-300">
                For centuries, Sri Lanka has captivated travelers from Fa-Hien in 410 AD to Marco Polo who called it 
                <span className="italic text-gray-200"> "the best island of its size in the world"</span>.
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
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-300">
            Your Complete Travel Companion
          </h2>
          
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
              <p className="text-gray-300">
                Get custom travel plans tailored to your budget, interests, and duration of stay.
              </p>
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
              <p className="text-gray-300">
                Access live updates on weather, local events, and transportation for seamless travel.
              </p>
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
              <p className="text-gray-300">
                Discover perfect stays from luxury resorts to authentic homestays.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Feature List - Dark Theme */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-300">
            Everything You Need for the Perfect Trip
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "AI-Powered Attraction Recommendations",
              "Interactive Map Navigation",
              "Community Reviews & Ratings",
              "Dining & Culinary Experiences",
              "Budget Management Tools",
              "Cultural Insights & Safety Tips"
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="bg-blue-900 p-2 rounded-full">
                  <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">{feature}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Dark Theme */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Experience Sri Lanka?
          </motion.h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Let Ceylon Safari craft your perfect adventure in the Pearl of the Indian Ocean
          </p>
          <Link 
            to="/ai" 
            className="inline-block bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Planning Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;