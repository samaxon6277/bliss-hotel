/* ===== ROOMS & SUITES PAGE ===== */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Maximize, Wifi, Wind, Coffee, Utensils, ChevronRight, CheckCircle2, X } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { supabase } from '../lib/supabase';

/* ===== FEATURE ICON MAP ===== */
function FeatureIcon({ feature }: { feature: string }) {
  const lower = feature.toLowerCase();
  if (lower.includes('wi-fi') || lower.includes('wifi')) return <Wifi size={14} />;
  if (lower.includes('condition') || lower.includes('ac')) return <Wind size={14} />;
  if (lower.includes('breakfast') || lower.includes('coffee')) return <Coffee size={14} />;
  if (lower.includes('kitchen') || lower.includes('service')) return <Utensils size={14} />;
  return <CheckCircle2 size={14} />;
}

/* ===== ROOM DETAIL MODAL ===== */
function RoomModal({ room, onClose }: {
  room: {
    id: string; name: string; description: string; price: number;
    features: string[]; image_url: string; available: boolean;
    max_guests: number; size_sqft: number;
  };
  onClose: () => void;
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X size={16} />
        </button>
        <div className="img-overlay rounded-xl overflow-hidden h-56 -mx-8 -mt-8 mb-6" style={{ margin: '-40px -40px 24px' }}>
          <img src={room.image_url} alt={room.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4">
            <span className={room.available ? 'badge-available' : 'badge-limited'}>
              {room.available ? 'Available' : 'Limited'}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif text-2xl text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>{room.name}</h2>
          <div className="price-tag">₹{room.price.toLocaleString('en-IN')}<span>/night</span></div>
        </div>
        <div className="flex gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1"><Users size={14} /> Up to {room.max_guests} guests</span>
          <span className="flex items-center gap-1"><Maximize size={14} /> {room.size_sqft} sq ft</span>
        </div>
        <p className="text-gray-600 leading-relaxed text-sm mb-5">{room.description}</p>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {room.features.map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
              <FeatureIcon feature={f} />
              {f}
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <Link to="/booking" className="btn-luxury btn-primary flex-1 justify-center">
            Reserve This Room
          </Link>
          <a
            href={`https://wa.me/919472765743?text=Hi! I'm interested in booking the ${room.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury btn-dark px-5"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

/* ===== ROOM CARD ===== */
function RoomCard({ room, onSelect }: {
  room: {
    id: string; name: string; description: string; price: number;
    features: string[]; image_url: string; available: boolean;
    max_guests: number; size_sqft: number;
  };
  onSelect: () => void;
}) {
  return (
    <div className="luxury-card">
      <div className="img-overlay h-64 group cursor-pointer" onClick={onSelect}>
        <img src={room.image_url} alt={room.name} loading="lazy" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-400 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium tracking-wider bg-black/40 px-4 py-2 rounded-full">
            View Details
          </span>
        </div>
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={room.available ? 'badge-available' : 'badge-limited'}>
            {room.available ? 'Available' : 'Limited Rooms'}
          </span>
        </div>
        <div className="absolute top-4 right-4 glass text-white text-xs px-3 py-1 rounded-full">
          {room.size_sqft} sq ft
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-serif text-xl font-semibold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
            {room.name}
          </h3>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Users size={13} /> {room.max_guests}
          </div>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{room.description}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-5">
          {room.features.slice(0, 4).map((f) => (
            <span key={f} className="flex items-center gap-1 text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full">
              <FeatureIcon feature={f} />
              {f}
            </span>
          ))}
          {room.features.length > 4 && (
            <span className="text-xs text-teal-500 px-2 py-1">+{room.features.length - 4} more</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="price-tag">₹{room.price.toLocaleString('en-IN')}</span>
            <span className="text-gray-400 text-sm"> /night</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onSelect}
              className="text-teal-600 text-sm font-medium hover:text-teal-800 flex items-center gap-1 transition-colors"
            >
              Details <ChevronRight size={14} />
            </button>
            <Link to="/booking" className="btn-luxury btn-primary text-xs px-4 py-2">
              Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== COMPARISON TABLE ===== */
function ComparisonTable({ rooms }: { rooms: { name: string; price: number; max_guests: number; size_sqft: number; features: string[] }[] }) {
  const allFeatures = ['Air Conditioning', 'Full Kitchen', 'Free Wi-Fi', 'Room Service', 'Beach View', 'Ocean View', 'Garden View', 'Rain Shower', 'King Bed', 'Living Room'];

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
      <table className="luxury-table">
        <thead>
          <tr>
            <th className="w-48">Feature</th>
            {rooms.map((r) => (
              <th key={r.name} className="text-center">{r.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-sm font-medium text-gray-700">Price / Night</td>
            {rooms.map((r) => (
              <td key={r.name} className="text-center font-semibold text-teal-700">
                ₹{r.price.toLocaleString('en-IN')}
              </td>
            ))}
          </tr>
          <tr>
            <td className="text-sm font-medium text-gray-700">Max Guests</td>
            {rooms.map((r) => (
              <td key={r.name} className="text-center text-sm">{r.max_guests}</td>
            ))}
          </tr>
          <tr>
            <td className="text-sm font-medium text-gray-700">Room Size</td>
            {rooms.map((r) => (
              <td key={r.name} className="text-center text-sm">{r.size_sqft} sq ft</td>
            ))}
          </tr>
          {allFeatures.map((feature) => (
            <tr key={feature}>
              <td className="text-sm text-gray-600">{feature}</td>
              {rooms.map((r) => (
                <td key={r.name} className="text-center">
                  {r.features.some((f) => f.toLowerCase().includes(feature.toLowerCase().split(' ')[0])) ? (
                    <span className="text-green-500 text-lg">✓</span>
                  ) : (
                    <span className="text-gray-300 text-lg">—</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ===== DEFAULT ROOMS (fallback) ===== */
const defaultRooms = [
  {
    id: '1', name: 'Deluxe Beach Room', available: true, price: 2092, max_guests: 2, size_sqft: 380,
    image_url: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Wake up to the sound of waves in our elegantly appointed beach-facing room. Featuring floor-to-ceiling windows with stunning ocean panoramas.',
    features: ['Air Conditioning', 'Full Kitchen', 'Free Wi-Fi', 'Room Service', 'Beach View', 'King Bed'],
  },
  {
    id: '2', name: 'Luxury Family Suite', available: true, price: 3499, max_guests: 4, size_sqft: 620,
    image_url: 'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Designed for families seeking space and comfort. Two connected rooms with a shared living area, full kitchen, and private balcony.',
    features: ['Air Conditioning', 'Full Kitchen', 'Free Wi-Fi', 'Room Service', 'Garden View', '2 Bedrooms', 'Living Room'],
  },
  {
    id: '3', name: 'Ocean View Premium Room', available: false, price: 4200, max_guests: 2, size_sqft: 450,
    image_url: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Our most sought-after room category. Panoramic ocean vistas from every angle with premium furnishings and rain shower.',
    features: ['Air Conditioning', 'Full Kitchen', 'Free Wi-Fi', '24/7 Room Service', 'Ocean View', 'Rain Shower', 'Premium Amenities'],
  },
];

/* ===== ROOMS PAGE ===== */
export default function Rooms() {
  useScrollReveal();
  const [rooms, setRooms] = useState(defaultRooms);
  const [selectedRoom, setSelectedRoom] = useState<typeof defaultRooms[0] | null>(null);

  useEffect(() => {
    supabase.from('rooms').select('*').then(({ data }) => {
      if (data && data.length > 0) setRooms(data as typeof defaultRooms);
    });
  }, []);

  return (
    <div className="page-enter">

      {/* ===== HERO ===== */}
      <section className="relative h-80 lg:h-96 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Luxury room ocean view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />
        </div>
        <div className="relative z-10 container-luxury pb-14">
          <div className="section-label" style={{ color: '#99f6e4' }}>Accommodations</div>
          <h1 className="font-serif text-4xl lg:text-6xl text-white" style={{ fontFamily: 'Georgia, serif' }}>
            Rooms & Suites
          </h1>
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <section className="py-14 bg-white">
        <div className="container-luxury text-center max-w-2xl mx-auto reveal">
          <div className="section-label justify-center">Curated Comfort</div>
          <h2 className="font-serif text-3xl text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Spaces Designed for Serenity
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Each of our rooms is thoughtfully designed to maximize comfort while letting the natural beauty
            of Andaman take center stage. From beach-facing rooms to family suites, every stay includes a
            fully equipped kitchen, free Wi-Fi, and complimentary breakfast.
          </p>
        </div>
      </section>

      {/* ===== ROOM CARDS ===== */}
      <section className="section-padding" style={{ background: '#fdfaf5' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, i) => (
              <div key={room.id} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <RoomCard room={room} onSelect={() => setSelectedRoom(room)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ROOM COMPARISON TABLE ===== */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="text-center mb-12 reveal">
            <div className="section-label justify-center">Side by Side</div>
            <h2 className="font-serif text-3xl text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              Room Comparison
            </h2>
            <div className="luxury-divider" />
          </div>
          <div className="reveal">
            <ComparisonTable rooms={rooms} />
          </div>
        </div>
      </section>

      {/* ===== INCLUDED FEATURES ===== */}
      <section className="section-padding" style={{ background: '#fdfaf5' }}>
        <div className="container-luxury">
          <div className="bg-teal-800 rounded-3xl p-10 lg:p-16 text-center reveal" style={{ background: 'linear-gradient(135deg, #0f766e, #065f46)' }}>
            <div className="section-label justify-center" style={{ color: '#99f6e4' }}>In Every Room</div>
            <h2 className="font-serif text-3xl text-white mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              Everything Included
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {[
                { icon: Coffee, label: 'Free Breakfast', sub: 'Daily complimentary breakfast' },
                { icon: Wifi, label: 'High-Speed Wi-Fi', sub: 'Fast & reliable connection' },
                { icon: Utensils, label: 'Full Kitchen', sub: 'Cook your own meals' },
                { icon: CheckCircle2, label: 'Daily Housekeeping', sub: 'Fresh towels & clean rooms' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-white">
                    <Icon size={22} />
                  </div>
                  <div className="text-white font-medium text-sm mb-1">{label}</div>
                  <div className="text-teal-200 text-xs">{sub}</div>
                </div>
              ))}
            </div>
            <Link to="/booking" className="btn-luxury btn-sand inline-flex">
              Book Your Perfect Room <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ROOM DETAIL MODAL ===== */}
      {selectedRoom && (
        <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}

    </div>
  );
}
