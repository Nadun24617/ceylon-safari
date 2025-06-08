import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaNewspaper } from "react-icons/fa";
import axios from "axios";
import MemberBar from "../components/MemberBar";
const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&pageSize=6&apiKey=3c7e654bb4d6427e8293c07a97bd1ec5`
        );
        setNewsData(res.data.articles);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-sky-100 py-10 px-6 flex">
      <MemberBar /> {/* <-- Add this line for the navbar/sidebar */}
      <div className="flex-1 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-3 mb-8">
          <FaNewspaper className="text-4xl text-blue-600" />
          Latest News
        </h2>

        {loading ? (
          <p className="text-center text-blue-500">Loading latest news...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {newsData.map((news, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
              >
                <img
                  src={news.urlToImage || "https://via.placeholder.com/400x200"}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{news.description}</p>
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm hover:underline"
                  >
                    Read more →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
