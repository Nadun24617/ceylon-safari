import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PageNotFound from '../pages/PageNotFound';
import Map from '../pages/Map';
import Accommodation from '../pages/Accommodation';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/map" element={<Map />} />
      <Route path="/accommodation" element={<Accommodation />} />
    </Routes>
  );
};

export default AppRoutes;
