// components/MemberBar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  MapPin,
  Newspaper,
  CloudSun,
  Brain,
  AlignJustify,
  Landmark,
  BookOpenCheck,
  PartyPopper,
} from "lucide-react";
import classNames from "classnames";

const MemberBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Accommodation", icon: Home, path: "/accommodation" },
    { name: "AI Recommender", icon: Brain, path: "/ai-recommender" },
    { name: "Map", icon: MapPin, path: "/map" },
    { name: "News", icon: Newspaper, path: "/news" },
    { name: "Weather", icon: CloudSun, path: "/weather" },
    { name: "Top Attractions", icon: Landmark, path: "/attractions" },
    { name: "Travel Tips", icon: BookOpenCheck, path: "/tips" },
    { name: "Culture & Festivals", icon: PartyPopper, path: "/cultural" },
  ];

  return (
    <div
      className={classNames(
        "h-screen bg-white shadow-xl transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {isOpen && (
          <h1 className="text-lightBlue-500 font-extrabold text-xl glitter-text tracking-wide">
            Ceylon Safari
          </h1>
        )}
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500">
          <AlignJustify />
        </button>
      </div>
      <nav className="flex flex-col gap-2 mt-4 px-2">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <Link
            key={name}
            to={path}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition"
          >
            <Icon className="text-lightBlue-500" />
            {isOpen && <span className="text-gray-700 font-medium">{name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MemberBar;
