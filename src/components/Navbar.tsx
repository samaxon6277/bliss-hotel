/* ===== NAVBAR COMPONENT ===== */
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Rooms', path: '/rooms' },
  { label: 'Amenities', path: '/amenities' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Contact', path: '/contact' },
];

interface NavbarProps {
  transparent?: boolean;
  onLogoClick?: () => void;
}

export default function Navbar({ transparent = false, onLogoClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const logoClickCount = useRef(0);
  const logoClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ===== SCROLL HANDLER ===== */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  /* ===== LOGO 5-CLICK HANDLER FOR ADMIN ===== */
  const handleLogoClick = () => {
    logoClickCount.current += 1;
    if (logoClickTimer.current) clearTimeout(logoClickTimer.current);
    if (logoClickCount.current >= 5) {
      logoClickCount.current = 0;
      if (onLogoClick) onLogoClick();
    } else {
      logoClickTimer.current = setTimeout(() => { logoClickCount.current = 0; }, 2000);
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const isTransparentMode = transparent && !scrolled;

  return (
    <>
      {/* ===== MAIN NAVBAR ===== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparentMode ? 'bg-transparent' : 'navbar-scrolled'
        }`}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20">

            {/* ===== LOGO ===== */}
            <button
              onClick={handleLogoClick}
              className="flex flex-col items-start cursor-pointer bg-transparent border-none p-0 select-none"
              aria-label="Bliss Holiday Resort - Click logo 5 times for admin access"
            >
              <span
                className={`font-serif text-xl font-semibold tracking-wider transition-colors duration-300 ${
                  isTransparentMode ? 'text-white' : 'text-teal-800'
                }`}
                style={{ fontFamily: 'Georgia, serif' }}
              >
                BLISS HOLIDAY
              </span>
              <span
                className={`text-xs tracking-[0.25em] uppercase transition-colors duration-300 ${
                  isTransparentMode ? 'text-teal-200' : 'text-teal-600'
                }`}
              >
                Resort & Restaurants
              </span>
            </button>

            {/* ===== DESKTOP NAV LINKS ===== */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link text-sm font-medium tracking-wider transition-all duration-300 relative group ${
                    isTransparentMode
                      ? isActive(link.path) ? 'text-teal-300' : 'text-white hover:text-teal-200'
                      : isActive(link.path) ? 'text-teal-700' : 'text-gray-700 hover:text-teal-600'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-teal-400 transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </div>

            {/* ===== CTA + PHONE ===== */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:9472765743"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isTransparentMode ? 'text-white hover:text-teal-200' : 'text-gray-700 hover:text-teal-600'
                }`}
              >
                <Phone size={14} />
                +91 9472765743
              </a>
              <Link to="/booking" className="btn-luxury btn-primary text-xs px-5 py-3">
                Book Now
              </Link>
            </div>

            {/* ===== MOBILE HAMBURGER ===== */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isTransparentMode ? 'text-white' : 'text-gray-800'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ===== MOBILE MENU ===== */}
        <div className={`lg:hidden transition-all duration-400 overflow-hidden ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-lg border-t border-gray-100 px-6 py-4 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-3 text-sm font-medium tracking-wide border-b border-gray-50 transition-colors ${
                  isActive(link.path) ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="tel:9472765743"
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <Phone size={14} />
                +91 9472765743
              </a>
              <Link to="/booking" className="btn-luxury btn-primary w-full justify-center text-xs py-3">
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

/* ===== DROPDOWN MENU HOOK (unused placeholder for future) ===== */
export function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return scrolled;
}
