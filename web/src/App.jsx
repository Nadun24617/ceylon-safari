// src/App.jsx
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <AppRoutes />
      </main>
    </>
  );
}

export default App;