/* ===== HOME PAGE ===== */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronDown, ArrowRight, Wifi, Coffee, Car, UtensilsCrossed, Clock, Baby, MapPin, CheckCircle2, Quote } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { supabase } from '../lib/supabase';

/* ===== ANIMATED COUNTER ===== */
function Counter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = Date.now();
        const tick = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(end * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ===== STAR DISPLAY ===== */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="stars">
      {Array(5).fill(0).map((_, i) => (
        <Star key={i} size={14} fill={i < rating ? '#f59e0b' : 'none'} stroke={i < rating ? '#f59e0b' : '#d1d5db'} />
      ))}
    </div>
  );
}

/* ===== ROOM CARD ===== */
function RoomCard({ name, price, image, features, available }: {
  name: string; price: number; image: string; features: string[]; available: boolean;
}) {
  return (
    <div className="luxury-card group">
      <div className="img-overlay h-64">
        <img src={image} alt={name} loading="lazy" />
        <div className="absolute top-4 left-4">
          <span className={available ? 'badge-available' : 'badge-limited'}>
            {available ? 'Available' : 'Limited'}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          {name}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {features.slice(0, 3).map((f) => (
            <span key={f} className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full">{f}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="price-tag">₹{price.toLocaleString('en-IN')}</span>
            <span className="text-gray-500 text-sm"> /night</span>
          </div>
          <Link to="/booking" className="btn-luxury btn-primary text-xs px-4 py-2">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ===== HOME PAGE MAIN ===== */
export default function Home() {
  useScrollReveal();
  const [reviews, setReviews] = useState<{ id: string; name: string; rating: number; review: string; location: string }[]>([]);
  const [rooms, setRooms] = useState<{ id: string; name: string; price: number; image_url: string; features: string[]; available: boolean }[]>([]);
  const [heroSlide, setHeroSlide] = useState(0);

  /* ===== HERO IMAGES ===== */
  const heroImages = [
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];

  /* ===== AUTO-SLIDE HERO ===== */
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ===== FETCH DATA ===== */
  useEffect(() => {
    supabase.from('reviews').select('id,name,rating,review,location').limit(3).then(({ data }) => {
      if (data) setReviews(data);
    });
    supabase.from('rooms').select('id,name,price,image_url,features,available').limit(3).then(({ data }) => {
      if (data) setRooms(data);
    });
  }, []);

  const amenityIcons = [
    { icon: Coffee, label: 'Free Breakfast' },
    { icon: Wifi, label: 'Free Wi-Fi' },
    { icon: Car, label: 'Free Parking' },
    { icon: UtensilsCrossed, label: 'Restaurant' },
    { icon: Clock, label: '24hr Front Desk' },
    { icon: Baby, label: 'Child Friendly' },
  ];

  return (
    <div className="page-enter">

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background images */}
        {heroImages.map((img, i) => (
          <div
            key={img}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === heroSlide ? 1 : 0 }}
          >
            <img
              src={img}
              alt="Bliss Holiday Resort hero"
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/55 z-10" />

        {/* Hero content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          {/* Rating badge */}
          <div className="inline-flex items-center gap-2 glass text-white px-4 py-2 rounded-full text-sm mb-8 fade-in-up">
            <div className="flex text-amber-400">
              {Array(5).fill(0).map((_, i) => <Star key={i} size={12} fill="#f59e0b" stroke="none" />)}
            </div>
            <span>4.7 · 214 Reviews on Google</span>
          </div>

          <h1 className="hero-title text-white mb-5 fade-in-up" style={{ animationDelay: '0.15s' }}>
            Escape Into<br />
            <em>Paradise</em>
          </h1>

          <p className="hero-subtitle text-white/90 max-w-xl mx-auto mb-10 fade-in-up" style={{ animationDelay: '0.3s' }}>
            Experience luxury beachside comfort in the heart of Andaman.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up" style={{ animationDelay: '0.45s' }}>
            <Link to="/booking" className="btn-luxury btn-primary px-8 py-4 text-sm">
              Book Your Stay
            </Link>
            <Link to="/rooms" className="btn-luxury btn-outline px-8 py-4 text-sm">
              Explore Rooms
            </Link>
          </div>

          {/* Price badge */}
          <div className="mt-8 fade-in-up" style={{ animationDelay: '0.6s' }}>
            <span className="text-white/70 text-sm">Stays from</span>
            <span className="text-teal-300 text-xl font-semibold ml-2" style={{ fontFamily: 'Georgia, serif' }}>₹2,092</span>
            <span className="text-white/70 text-sm"> / night · Free Breakfast Included</span>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === heroSlide ? 'w-8 h-2 bg-teal-400' : 'w-2 h-2 bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-1 text-white/60 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* ===== QUICK AMENITIES STRIP ===== */}
      <section className="bg-teal-800 py-5">
        <div className="container-luxury">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {amenityIcons.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-teal-100 text-sm">
                <Icon size={16} className="text-teal-300" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INTRO SECTION ===== */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <div className="section-label">Welcome to Bliss Holiday</div>
              <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 leading-tight mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Where the Ocean<br />Meets Luxury
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Nestled along the pristine shores of Dhani Nallah Beach in the Andaman &amp; Nicobar Islands,
                Bliss Holiday Resort offers an unparalleled escape where tropical nature and genuine hospitality converge.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Every detail is thoughtfully curated — from complimentary sunrise breakfasts to kitchen-equipped rooms
                that feel like a second home, all within steps of one of India's most coveted island destinations.
              </p>
              <div className="flex items-center gap-4">
                <Link to="/about" className="btn-luxury btn-primary">
                  Our Story <ArrowRight size={16} />
                </Link>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={14} className="text-teal-600" />
                  Andaman & Nicobar Islands
                </div>
              </div>
            </div>

            <div className="reveal-right">
              <div className="grid grid-cols-2 gap-4">
                <div className="img-overlay rounded-2xl overflow-hidden h-64">
                  <img
                    src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Resort beachfront"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="img-overlay rounded-2xl overflow-hidden h-64 mt-8">
                  <img
                    src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Resort pool area"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="img-overlay rounded-2xl overflow-hidden h-48 -mt-4">
                  <img
                    src="https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Palm beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="img-overlay rounded-2xl overflow-hidden h-48">
                  <img
                    src="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Luxury room"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS COUNTER ===== */}
      <section className="py-20 bg-resort-gradient" style={{ background: 'linear-gradient(135deg, #0f766e 0%, #065f46 50%, #134e4a 100%)' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { end: 214, suffix: '+', label: 'Happy Guests' },
              { end: 4, suffix: '.7★', label: 'Google Rating' },
              { end: 3, suffix: '', label: 'Room Categories' },
              { end: 10, suffix: '+', label: 'Amenities' },
            ].map(({ end, suffix, label }) => (
              <div key={label} className="reveal">
                <div className="counter-value mb-2">
                  <Counter end={end} suffix={suffix} />
                </div>
                <div className="text-teal-200 text-sm tracking-wider uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED ROOMS ===== */}
      <section className="section-padding bg-sand-50" style={{ background: '#fdfaf5' }}>
        <div className="container-luxury">
          <div className="text-center mb-14 reveal">
            <div className="section-label justify-center">Our Accommodations</div>
            <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
              Rooms & Suites
            </h2>
            <div className="luxury-divider" />
          </div>

          {rooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room, i) => (
                <div key={room.id} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <RoomCard
                    name={room.name}
                    price={room.price}
                    image={room.image_url}
                    features={room.features}
                    available={room.available}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Deluxe Beach Room', price: 2092, image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', features: ['Air Conditioning', 'Kitchen', 'Wi-Fi'], available: true },
                { name: 'Luxury Family Suite', price: 3499, image: 'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', features: ['2 Bedrooms', 'Kitchen', 'Garden View'], available: true },
                { name: 'Ocean View Room', price: 4200, image: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', features: ['Ocean View', 'Rain Shower', 'Butler Service'], available: false },
              ].map((room, i) => (
                <div key={room.name} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <RoomCard {...room} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12 reveal">
            <Link to="/rooms" className="btn-luxury btn-dark inline-flex items-center gap-2">
              View All Rooms <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== AMENITIES PREVIEW ===== */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="section-label">Resort Features</div>
              <h2 className="font-serif text-4xl text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Everything You Need
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                From complimentary breakfasts to 24-hour front desk service, every amenity is designed to ensure
                your stay is effortless, comfortable, and truly memorable.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Free Breakfast Daily', 'High-Speed Wi-Fi', 'On-site Restaurant',
                  'Free Parking', 'Local Shuttle Service', 'Kitchen in All Rooms',
                  '24hr Front Desk', 'Child-Friendly Resort',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-teal-600 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <Link to="/amenities" className="btn-luxury btn-primary mt-8 inline-flex">
                View All Amenities <ArrowRight size={16} />
              </Link>
            </div>

            <div className="reveal-right">
              <div className="img-overlay rounded-3xl overflow-hidden h-[500px]">
                <img
                  src="https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Resort aerial view"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="section-padding-sm" style={{ background: '#fdfaf5' }}>
        <div className="container-luxury">
          <div className="text-center mb-10 reveal">
            <div className="section-label justify-center">Visual Journey</div>
            <h2 className="font-serif text-4xl text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              A Glimpse of Paradise
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 reveal">
            {[
              { img: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', tall: true },
              { img: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', tall: false },
              { img: 'https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', tall: false },
              { img: 'https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', tall: true },
            ].map(({ img, tall }, i) => (
              <div key={i} className={`img-overlay rounded-2xl overflow-hidden ${tall ? 'row-span-2 h-80 lg:h-96' : 'h-44 lg:h-44'}`}>
                <img src={img} alt="Resort gallery" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="text-center mt-8 reveal">
            <Link to="/gallery" className="btn-luxury btn-dark inline-flex items-center gap-2">
              Explore Gallery <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding bg-teal-950" style={{ background: '#042f2e' }}>
        <div className="container-luxury">
          <div className="text-center mb-14 reveal">
            <div className="section-label justify-center" style={{ color: '#2dd4bf' }}>
              Guest Experiences
            </div>
            <h2 className="font-serif text-4xl text-white mt-2" style={{ fontFamily: 'Georgia, serif' }}>
              What Our Guests Say
            </h2>
            <div className="luxury-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(reviews.length > 0 ? reviews : [
              { id: '1', name: 'Priya Sharma', rating: 5, review: 'Absolutely breathtaking! The beach was steps away. Staff were incredibly warm and free breakfast was delightful.', location: 'Mumbai, India' },
              { id: '2', name: 'Rajesh Kumar', rating: 5, review: 'Perfect family vacation. Spacious rooms with full kitchen. Shuttle service made exploring Andaman very easy.', location: 'Delhi, India' },
              { id: '3', name: 'Ananya Iyer', rating: 4, review: 'Beautiful resort near Dhani Nallah Beach. Nature surroundings are stunning. Peaceful and top-notch hospitality.', location: 'Bangalore, India' },
            ]).map((r, i) => (
              <div key={r.id} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <Stars rating={r.rating} />
                  <p className="text-gray-300 text-sm leading-relaxed my-4">"{r.review}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center text-white font-semibold text-sm">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{r.name}</div>
                      <div className="text-teal-400 text-xs">{r.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal">
            <Link to="/reviews" className="btn-luxury btn-outline inline-flex items-center gap-2">
              All Guest Reviews <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BOOKING CTA SECTION ===== */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="bg-teal-800 rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0f766e, #065f46)' }}>
            <div className="absolute inset-0 opacity-10">
              <img
                src="https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 text-center py-20 px-8">
              <div className="section-label justify-center" style={{ color: '#99f6e4' }}>
                Start Your Journey
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl text-white mt-3 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Your Paradise Awaits
              </h2>
              <p className="text-teal-200 max-w-lg mx-auto mb-8 text-lg">
                Book directly with us and enjoy complimentary breakfast, free Wi-Fi, and the best available rates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/booking" className="btn-luxury btn-sand text-sm px-10 py-4">
                  Reserve Now
                </Link>
                <a
                  href="https://wa.me/919472765743?text=Hello! I'd like to book a room at Bliss Holiday Resort."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury btn-outline text-sm px-10 py-4"
                >
                  Chat on WhatsApp
                </a>
              </div>
              <p className="text-teal-300/70 text-sm mt-6">Starting from ₹2,092 / night · Free cancellation available</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
