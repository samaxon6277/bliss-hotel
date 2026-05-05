/* ===== APP ROOT - ROUTING ===== */
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import About from './pages/About';
import Rooms from './pages/Rooms';
import Amenities from './pages/Amenities';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

/* ===== LAYOUT WRAPPER (navbar + footer) ===== */
function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  /* ===== NAVIGATE TO ADMIN ON 5 LOGO CLICKS ===== */
  const handleLogoClick = () => {
    window.location.href = '/admin';
  };

  /* ===== SCROLL TO TOP ON ROUTE CHANGE ===== */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Navbar — transparent on home hero, solid elsewhere */}
      <Navbar transparent={isHome} onLogoClick={handleLogoClick} />

      {/* Page content */}
      <main className={`flex-1 ${!isHome ? 'pt-20' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

/* ===== APP ===== */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin — full screen, no navbar/footer */}
        <Route path="/admin" element={<Admin />} />
        {/* All other routes — wrapped in layout */}
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
