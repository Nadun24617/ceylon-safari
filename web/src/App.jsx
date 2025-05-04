import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <Navbar />
      <AppRoutes/>
    </div>
  );
}

export default App
