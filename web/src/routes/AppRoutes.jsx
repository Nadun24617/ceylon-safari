import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PageNotFound from '../pages/PageNotFound';
import Map from '../pages/Map';
import Accommodation from '../pages/Accommodation';
import WeatherCard from '../pages/Weather';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/map" element={<Map />} />
      <Route path="/accommodation" element={<Accommodation />} />
      <Route path="/weather" element={<WeatherCard />} />
    </Routes>
  );
};

export default AppRoutes;
