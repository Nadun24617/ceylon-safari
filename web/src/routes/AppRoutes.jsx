import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PageNotFound from '../pages/PageNotFound';
import Map from '../pages/Map';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/map" element={<Map />} />
      

    
    </Routes>
  );
};

export default AppRoutes;
