import React from "react";
import MemberBar from "../components/MemberBar";
const festivals = [
  {
    title: "Vesak Festival 🪷",
    description:
      "Celebrate the birth, enlightenment, and death of Lord Buddha with lanterns, sil programs, and dansals across the island.",
    image: "src/assets/vesak.jpg",
  },
  {
    title: "Kandy Esala Perahera 🐘",
    description:
      "One of the oldest Buddhist festivals in Sri Lanka, featuring a grand procession with dancers, drummers, and elephants.",
    image: "src/assets/Kandy-Perahera-header.jpg",
  },
  {
    title: "Sinhala & Tamil New Year 🎉",
    description:
      "A colorful celebration in April filled with traditional games, sweets, rituals, and family gatherings.",
    image: "src/assets/images (5).jpg",
  },
];

const traditions = [
  "Traditional Kandyan Dance",
  "Ayurvedic Healing & Herbal Baths",
  "Sri Lankan Mask Carving",
  "Harvest Rituals & Paddy Culture",
];

const foods = [
  "Rice & Curry 🍛",
  "Hoppers & String Hoppers 🥞",
  "Kottu Roti 🔪",
  "Watalappan 🍮",
  "King Coconut 🥥",
];

const Cultural = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex">
      <MemberBar />
      <div className="flex-1 p-6 md:p-10">
        <h1 className="text-4xl font-bold text-center text-amber-700 mb-10">
          🇱🇰 Sri Lankan Culture & Festivals
        </h1>

        {/* Festivals Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-amber-800 mb-4">
            🌟 Vibrant Festivals
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {festivals.map((festival, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={festival.image}
                  alt={festival.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-amber-700">
                    {festival.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{festival.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Traditions Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-amber-800 mb-4">
            🧘 Cultural Traditions
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
            {traditions.map((tradition, index) => (
              <li key={index} className="text-lg">
                {tradition}
              </li>
            ))}
          </ul>
        </section>

        {/* Food Section */}
        <section>
          <h2 className="text-2xl font-semibold text-amber-800 mb-4">
            🍽️ Traditional Food & Drinks
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-gray-700">
            {foods.map((food, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 text-center hover:shadow-xl transition"
              >
                <p className="text-xl font-medium">{food}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cultural;
