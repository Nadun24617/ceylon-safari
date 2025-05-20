import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PageNotFound from '../pages/PageNotFound';
import Map from '../pages/Map';

=======
import Accommodations from '../pages/Accommodations'; // Adjust the import path as necessary
import Weather from '../pages/Weather';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/map" element={<Map />} />
      

    
=======
      <Route path="/home" element={<Home />} />
      <Route path="/ai" element={<div>AI Page</div>} /> {/* Placeholder for AI page */}
      {/* Add more routes here as needed */}
      <Route path="/accommodations" element={<Accommodations />} /> {/* Fixed the typo here */}
      <Route path="/Weather" element={<Weather />} /> {/* Fixed the typo here */}
      <Route path="*" element={<PageNotFound />} /> {/* Added 404 route for unknown pages */}
    </Routes>
  );
};

export default AppRoutes;
