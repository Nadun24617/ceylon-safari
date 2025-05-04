// src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-[url('/src/assets/hero-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Discover Your Perfect Stay</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find hand-picked accommodations tailored to your preferences with our AI-powered recommendation engine
          </p>
          <Link 
            to="/ai-recommender" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition duration-300"
          >
            Get Personalized Recommendations
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-blue-600 text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Matching</h3>
            <p className="text-gray-600">Our advanced algorithm learns your preferences to suggest perfect stays.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-blue-600 text-4xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold mb-2">Interactive Maps</h3>
            <p className="text-gray-600">Explore locations visually and find exactly what you're looking for.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-blue-600 text-4xl mb-4">⏱️</div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
            <p className="text-gray-600">Get live weather and availability information for your destinations.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Ideal Accommodation?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/accommodation" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              Browse All Options
            </Link>
            <Link 
              to="/ai-recommender" 
              className="border-2 border-white text-white hover:bg-blue-700 font-semibold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              Try AI Recommender
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}