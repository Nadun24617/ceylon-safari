import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

const AIRecommender = () => {
  const [input, setInput] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!input.trim()) return;
    setLoading(true);
    setRecommendation("");

    setTimeout(() => {
      setRecommendation(
        `✈️ Based on your interest in "${input}", we recommend:\n\n📍 Sigiriya Rock Fortress\n🏝️ Maldives for luxury\n🌄 Ella for hiking\n\nEnjoy your trip!`
      );
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-200 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600 flex items-center justify-center gap-2">
          <FaRobot /> AI Travel Recommender
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="e.g. beaches, nature, adventure"
            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FiSend /> Recommend
          </button>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 min-h-[120px]">
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
      </div>
    </div>
  );
};

export default AIRecommender;
