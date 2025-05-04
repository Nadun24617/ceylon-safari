// src/App.jsx
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <AppRoutes />
      </main>
    </>
  );
}

export default App;