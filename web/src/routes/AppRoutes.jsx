import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Map from '../pages/Map';
import Weather from '../pages/Weather';
import News from '../pages/News';
import AIRecommender from '../pages/AIRecommender';
import Accommodation from '../pages/Accommodation';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/news" element={<News />} />
      <Route path="/ai" element={<AIRecommender />} />
      <Route path="/accommodation" element={<Accommodation />} />
    </Routes>
  );
};

export default AppRoutes;
