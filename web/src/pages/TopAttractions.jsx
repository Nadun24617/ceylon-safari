import React from "react";
import MemberBar from "../components/MemberBar";


const attractions = [
  {
    name: "Sigiriya Rock Fortress",
    location: "Central Province",
    description: "A UNESCO World Heritage Site, this ancient fortress offers panoramic views and historical significance.",
    image:
      "src/assets/Sigiriya-Rock-Sri-Lanka.jpg",
  },
  {
    name: "Ella",
    location: "Uva Province",
    description: "A beautiful mountain town known for hiking trails, Nine Arches Bridge, and tea plantations.",
    image:
      "src/assets/nine-arches-bridge-in-ella-1200_orig.jpg",
  },
  {
    name: "Yala National Park",
    location: "Southern Province",
    description: "Sri Lanka’s most famous wildlife sanctuary with leopards, elephants, and more.",
    image:
      "src/assets/5f.jpg",
  },
  {
    name: "Galle Fort",
    location: "Southern Province",
    description: "A Dutch colonial fortress with charming streets, boutiques, and ocean views.",
    image:
      "src/assets/galle-fort-1050x700-1.jpg",
  },
  {
    name: "Temple of the Tooth",
    location: "Kandy",
    description: "A sacred Buddhist site in Kandy that houses the relic of Buddha’s tooth.",
    image:
      "src/assets/Kandy-toothrelictemple-dawn.jpg",
  },
];

const TopAttractions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-sky-100 flex">
      <MemberBar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-extrabold text-lightBlue-600 mb-6 text-center">
          🌴 Top Attractions in Sri Lanka 🌺
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attr, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={attr.image}
                alt={attr.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-lightBlue-700 mb-1">
                  {attr.name}
                </h2>
                <p className="text-sm text-gray-500 mb-2">{attr.location}</p>
                <p className="text-gray-700 text-sm">{attr.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopAttractions;
