import React from "react";
import MemberBar from "../components/MemberBar";

const tips = [
  {
    title: "Respect Local Customs 🙏",
    description:
      "When visiting temples or sacred places, dress modestly and remove shoes. Be mindful of cultural norms and religious practices.",
    icon: "🛕",
  },
  {
    title: "Stay Hydrated 🥥",
    description:
      "Sri Lanka is warm and tropical. Drink bottled water and enjoy local options like king coconut for natural hydration.",
    icon: "💧",
  },
  {
    title: "Try Local Food 🍛",
    description:
      "Don't miss out on rice & curry, kottu, hoppers, and tropical fruits. Always ask for spice level if you're not used to hot food!",
    icon: "🌶️",
  },
  {
    title: "Respect Wildlife 🐘",
    description:
      "Observe elephants, leopards, and birds from a safe distance. Avoid feeding or touching wild animals during safaris.",
    icon: "🌿",
  },
  {
    title: "Negotiate Smartly 💬",
    description:
      "When shopping in local markets, bargaining is common—but be polite and friendly about it!",
    icon: "🛍️",
  },
  {
    title: "Use Trusted Transport 🚗",
    description:
      "Use PickMe or Uber for city rides. For tuk-tuks, agree on a price before starting the journey.",
    icon: "🛺",
  },
];

const TravelTips = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-100 flex">
      <MemberBar />
      <div className="flex-1 p-6 md:p-10">
        <h1 className="text-4xl font-bold text-center text-emerald-700 mb-10">
          ✈️ Essential Travel Tips for Sri Lanka
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-emerald-500"
            >
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">{tip.icon}</span>
                <h2 className="text-xl font-semibold text-emerald-800">
                  {tip.title}
                </h2>
              </div>
              <p className="text-gray-700">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelTips;
