/* ===== FOOTER COMPONENT ===== */
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* ===== MAIN FOOTER ===== */}
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ===== BRAND COLUMN ===== */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <div className="font-serif text-white text-xl tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
                BLISS HOLIDAY
              </div>
              <div className="text-teal-400 text-xs tracking-[0.22em] uppercase">
                Resort & Restaurants
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              A serene luxury beach resort nestled near Dhani Nallah Beach, Andaman &amp; Nicobar Islands.
              Your paradise awaits.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:border-teal-400 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ===== QUICK LINKS ===== */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-[0.15em] uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'About Resort', path: '/about' },
                { label: 'Rooms & Suites', path: '/rooms' },
                { label: 'Amenities', path: '/amenities' },
                { label: 'Gallery', path: '/gallery' },
                { label: 'Guest Reviews', path: '/reviews' },
                { label: 'Book a Stay', path: '/booking' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-gray-600 group-hover:bg-teal-400 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== CONTACT INFO ===== */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-[0.15em] uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-teal-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400 leading-relaxed">
                  Near Dhani Nallah Beach,<br />
                  Andaman and Nicobar Islands,<br />
                  India – 744205
                </span>
              </li>
              <li>
                <a href="tel:9472765743" className="flex items-center gap-3 text-sm text-gray-400 hover:text-teal-400 transition-colors">
                  <Phone size={15} className="text-teal-400 flex-shrink-0" />
                  +91 9472765743
                </a>
              </li>
              <li>
                <a href="mailto:info@blissholidayresort.in" className="flex items-center gap-3 text-sm text-gray-400 hover:text-teal-400 transition-colors">
                  <Mail size={15} className="text-teal-400 flex-shrink-0" />
                  info@blissholidayresort.in
                </a>
              </li>
            </ul>
          </div>

          {/* ===== BOOKING CTA ===== */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-[0.15em] uppercase mb-5">
              Reserve Your Stay
            </h4>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Starting from <span className="text-teal-400 font-semibold text-base">₹2,092</span> per night.
              Free breakfast included.
            </p>
            <Link to="/booking" className="btn-luxury btn-primary w-full justify-center mb-3 text-xs py-3">
              Book Now
            </Link>
            <a
              href="https://wa.me/919472765743?text=Hello! I'd like to book a room at Bliss Holiday Resort."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded text-sm font-medium border border-green-600 text-green-400 hover:bg-green-900/30 transition-all"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* ===== COPYRIGHT BAR ===== */}
      <div className="border-t border-gray-800">
        <div className="container-luxury py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Bliss Holiday Resort &amp; Restaurants. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400">
              {Array(5).fill(0).map((_, i) => (
                <span key={i} className="text-xs">★</span>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">4.7 · 214 reviews on Google</span>
          </div>
          <p className="text-xs text-gray-600">
            Near Dhani Nallah Beach, Andaman · PIN 744205
          </p>
        </div>
      </div>
    </footer>
  );
}
