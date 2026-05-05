/* ===== AMENITIES PAGE ===== */
import { Wifi, Coffee, Car, UtensilsCrossed, Clock, Baby, MapPin, ChefHat, Dumbbell, Waves, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';

/* ===== AMENITY DATA ===== */
const amenities = [
  {
    icon: Coffee, label: 'Free Breakfast',
    desc: 'Start every morning with a complimentary breakfast. Fresh tropical fruits, local delicacies and hot beverages included.',
    highlight: true,
  },
  {
    icon: Wifi, label: 'High-Speed Wi-Fi',
    desc: 'Stay connected with reliable, high-speed wireless internet available throughout the resort — even in your room.',
    highlight: false,
  },
  {
    icon: UtensilsCrossed, label: 'Restaurant',
    desc: 'Our on-site restaurant serves authentic Andamanese cuisine alongside continental favorites, open for all three meals.',
    highlight: true,
  },
  {
    icon: Car, label: 'Free Parking',
    desc: 'Complimentary secured parking for all guests with round-the-clock surveillance and easy access.',
    highlight: false,
  },
  {
    icon: MapPin, label: 'Local Shuttle',
    desc: 'Convenient shuttle service to major beaches, markets, and ferry ports in the Andaman region.',
    highlight: false,
  },
  {
    icon: ChefHat, label: 'Kitchen in Rooms',
    desc: 'Every room comes equipped with a full kitchen — perfect for families who prefer home-cooked meals.',
    highlight: true,
  },
  {
    icon: Clock, label: '24hr Front Desk',
    desc: 'Our hospitable team is available round-the-clock to assist with anything you need during your stay.',
    highlight: false,
  },
  {
    icon: Baby, label: 'Child Friendly',
    desc: 'A safe, welcoming resort for families. We have child-safe amenities and activities for younger guests.',
    highlight: false,
  },
];

/* ===== NOT AVAILABLE ===== */
const unavailable = [
  { icon: Sparkles, label: 'Spa', reason: 'Currently not available. We recommend local wellness centers nearby.' },
  { icon: Waves, label: 'Hot Tub', reason: 'Not available at this time. The natural ocean is your best bet!' },
  { icon: Dumbbell, label: 'Fitness Centre', reason: 'Not available on-site. The beach offers perfect morning exercise routes.' },
];

export default function Amenities() {
  useScrollReveal();

  return (
    <div className="page-enter">

      {/* ===== HERO ===== */}
      <section className="relative h-80 lg:h-96 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Resort amenities"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />
        </div>
        <div className="relative z-10 container-luxury pb-14">
          <div className="section-label" style={{ color: '#99f6e4' }}>Resort Features</div>
          <h1 className="font-serif text-4xl lg:text-6xl text-white" style={{ fontFamily: 'Georgia, serif' }}>
            Amenities
          </h1>
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <section className="py-14 bg-white">
        <div className="container-luxury max-w-2xl mx-auto text-center reveal">
          <div className="section-label justify-center">What We Offer</div>
          <h2 className="font-serif text-3xl text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Every Comfort, Thoughtfully Provided
          </h2>
          <p className="text-gray-600 leading-relaxed">
            At Bliss Holiday Resort, we believe genuine hospitality means anticipating your needs before you
            realize them. Every amenity is selected to enhance your island experience.
          </p>
        </div>
      </section>

      {/* ===== AVAILABLE AMENITIES GRID ===== */}
      <section className="section-padding" style={{ background: '#fdfaf5' }}>
        <div className="container-luxury">
          <div className="text-center mb-12 reveal">
            <div className="section-label justify-center">Included For Every Guest</div>
            <h2 className="font-serif text-3xl text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              Available Amenities
            </h2>
            <div className="luxury-divider" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map(({ icon: Icon, label, desc, highlight }, i) => (
              <div
                key={label}
                className={`amenity-card reveal relative ${highlight ? 'border-teal-200 bg-teal-50/50' : ''}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                {highlight && (
                  <div className="absolute top-3 right-3 bg-teal-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Popular
                  </div>
                )}
                <div className="amenity-icon">
                  <Icon size={26} />
                </div>
                <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  {label}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                <div className="mt-4 flex items-center gap-1 text-green-600 text-xs font-medium">
                  <CheckCircle2 size={13} />
                  Included at no extra charge
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HIGHLIGHTS FEATURE BLOCK ===== */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                img: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                title: 'Beachside Restaurant',
                desc: 'Savor fresh seafood and local Andamanese dishes with ocean views. Open for breakfast, lunch, and dinner.',
              },
              {
                img: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                title: 'Kitchen-Equipped Rooms',
                desc: 'Every single room at Bliss Holiday comes with a fully functional kitchen — a rare luxury in island resorts.',
              },
              {
                img: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                title: 'Island Shuttle Service',
                desc: 'Explore Ross Island, Neil Island, and Radhanagar Beach with our convenient resort shuttle service.',
              },
            ].map(({ img, title, desc }, i) => (
              <div key={title} className="luxury-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="img-overlay h-48">
                  <img src={img} alt={title} loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NOT AVAILABLE SECTION ===== */}
      <section className="section-padding" style={{ background: '#fdfaf5' }}>
        <div className="container-luxury">
          <div className="text-center mb-10 reveal">
            <div className="section-label justify-center" style={{ color: '#6b7280' }}>Transparency First</div>
            <h2 className="font-serif text-3xl text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              What We Currently Don't Offer
            </h2>
            <p className="text-gray-500 text-sm mt-3 max-w-lg mx-auto">
              We believe in honest transparency. These amenities are not available on-site, but we're happy to recommend alternatives nearby.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {unavailable.map(({ icon: Icon, label, reason }, i) => (
              <div
                key={label}
                className="bg-gray-50 rounded-2xl p-6 text-center border border-dashed border-gray-200 reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                  <Icon size={22} />
                </div>
                <h4 className="text-gray-600 font-medium mb-2 flex items-center justify-center gap-1">
                  <XCircle size={14} className="text-gray-400" />
                  {label}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-teal-800 text-center" style={{ background: 'linear-gradient(135deg, #0f766e, #065f46)' }}>
        <div className="container-luxury reveal">
          <h2 className="font-serif text-3xl text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            All Amenities Included in Every Stay
          </h2>
          <p className="text-teal-200 mb-6 text-sm">Starting from ₹2,092/night with free breakfast.</p>
          <Link to="/booking" className="btn-luxury btn-sand inline-flex">
            Book Your Stay
          </Link>
        </div>
      </section>

    </div>
  );
}
