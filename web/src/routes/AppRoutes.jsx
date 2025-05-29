import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PageNotFound from '../pages/PageNotFound';
import Map from '../pages/Map';
import Accommodation from '../pages/Accommodation';
import Weather from '../pages/Weather';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import AIRecommender from '../pages/AIRecommender';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/map" element={<Map />} />
      <Route path="/accommodation" element={<Accommodation />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ai-recommender" element={<AIRecommender />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;