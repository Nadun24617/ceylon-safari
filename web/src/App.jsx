// src/App.jsx
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <main className="w-full">
        <AppRoutes />
      </main>
    </>
  );
}

export default App;