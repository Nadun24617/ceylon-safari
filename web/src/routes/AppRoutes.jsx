import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PageNotFound from '../pages/PageNotFound';
import Map from '../pages/Map';
import Accommodation from '../pages/Accommodation';
import Weather from '../pages/Weather';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import AIRecommender from '../pages/AIRecommender';
import Admin from '../pages/Admin';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/map" element={<Map />} />
      <Route path="/accommodation" element={<Accommodation />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/ai-recommender" element={<AIRecommender />} />
      <Route path="/admin" element={<Admin />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;