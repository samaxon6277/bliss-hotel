/* ===== ABOUT PAGE ===== */
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Heart, Star, Shield, Users } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
  useScrollReveal();

  return (
    <div className="page-enter">

      {/* ===== HERO ===== */}
      <section className="relative h-80 lg:h-96 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Andaman sunset beach"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
        </div>
        <div className="relative z-10 container-luxury pb-14">
          <div className="section-label" style={{ color: '#99f6e4' }}>Our Story</div>
          <h1 className="font-serif text-4xl lg:text-6xl text-white" style={{ fontFamily: 'Georgia, serif' }}>
            About Bliss Holiday
          </h1>
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <div className="section-label">Who We Are</div>
              <h2 className="font-serif text-4xl text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                A Sanctuary of<br />Peace & Luxury
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Bliss Holiday Resort & Restaurants was born from a simple dream: to create the most authentic,
                restful luxury retreat in the Andaman & Nicobar Islands. Situated near the serene Dhani Nallah
                Beach, we offer a rare blend of tropical paradise and heartfelt hospitality.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Our resort is nestled within a lush natural landscape of coconut palms and tropical flora,
                just steps from the crystal-clear waters of the Andaman Sea. We believe every guest deserves
                to feel completely at ease — which is why we provide kitchen-equipped rooms, complimentary
                breakfasts, and attentive 24-hour service.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you're a couple seeking a romantic escape, a family on an adventure, or a solo traveler
                yearning for solitude, Bliss Holiday is your home away from home.
              </p>
            </div>
            <div className="reveal-right">
              <div className="relative">
                <div className="img-overlay rounded-3xl overflow-hidden h-[480px]">
                  <img
                    src="https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Dhani Nallah Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Rating badge overlay */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl float-anim">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center">
                      <Star fill="white" stroke="white" size={22} />
                    </div>
                    <div>
                      <div className="font-serif text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>4.7</div>
                      <div className="text-gray-500 text-xs">Google Rating · 214 Reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE / VALUES ===== */}
      <section className="section-padding" style={{ background: '#fdfaf5' }}>
        <div className="container-luxury">
          <div className="text-center mb-16 reveal">
            <div className="section-label justify-center">Our Journey</div>
            <h2 className="font-serif text-4xl text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              Built on Values
            </h2>
            <div className="luxury-divider" />
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-teal-200" />

            {[
              {
                side: 'left',
                year: 'Our Beginning',
                title: 'A Dream by the Sea',
                text: 'Founded with the vision of sharing the raw, untouched beauty of the Andaman Islands with travelers from across India and the world.',
                img: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              },
              {
                side: 'right',
                year: 'Our Philosophy',
                title: 'Nature-First Hospitality',
                text: 'Every design choice, every service we offer respects and celebrates the incredible natural environment that makes Andaman so special.',
                img: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              },
              {
                side: 'left',
                year: 'Our Promise',
                title: 'Unforgettable Experiences',
                text: 'From sunrise breakfast on your private terrace to late-night ocean breeze — we curate every moment to become a cherished memory.',
                img: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              },
              {
                side: 'right',
                year: 'Our Community',
                title: 'Family-Friendly Haven',
                text: 'With 4.7 stars and 214+ glowing Google reviews, families and couples trust Bliss Holiday to deliver genuine island joy year after year.',
                img: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              },
            ].map(({ side, year, title, text, img }, i) => (
              <div
                key={i}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center ${
                  side === 'right' ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`${side === 'left' ? 'md:text-right md:pr-12 reveal-left' : 'md:pl-12 reveal-right md:col-start-2'}`}>
                  <span className="text-teal-500 text-xs font-semibold tracking-widest uppercase">{year}</span>
                  <h3 className="font-serif text-2xl text-gray-900 mt-2 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                    {title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{text}</p>
                </div>

                {/* Dot */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-teal-500 border-4 border-white shadow-md z-10" />

                {/* Image */}
                <div className={`${side === 'left' ? 'md:col-start-2 reveal-right' : 'reveal-left'}`}>
                  <div className="img-overlay rounded-2xl overflow-hidden h-56">
                    <img src={img} alt={title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES CARDS ===== */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="text-center mb-14 reveal">
            <div className="section-label justify-center">Why Choose Us</div>
            <h2 className="font-serif text-4xl text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              The Bliss Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: 'Nature Immersed', desc: 'Tropical gardens, ocean breezes and pristine beaches at your doorstep.' },
              { icon: Heart, title: 'Heartfelt Service', desc: '24/7 front desk team ready to make every moment of your stay special.' },
              { icon: Shield, title: 'Safe & Secure', desc: 'Family-safe environment with professional security and clean facilities.' },
              { icon: Users, title: 'Family Friendly', desc: 'Spacious family suites, child-friendly amenities and a welcoming atmosphere.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="amenity-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="amenity-icon">
                  <Icon size={26} />
                </div>
                <h4 className="font-serif text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  {title}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOCATION SECTION ===== */}
      <section className="section-padding" style={{ background: '#fdfaf5' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="section-label">Our Location</div>
              <h2 className="font-serif text-4xl text-gray-900 mb-5" style={{ fontFamily: 'Georgia, serif' }}>
                Gateway to the<br />Andaman Islands
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Our resort is located near the breathtaking Dhani Nallah Beach — one of the most serene,
                less-commercialized stretches of coastline in the Andaman Islands. Away from crowds but
                close to everything worth exploring.
              </p>
              <address className="not-italic text-gray-700 text-sm bg-teal-50 rounded-xl p-5 border border-teal-100">
                <strong className="text-teal-800 block mb-2">Bliss Holiday Resort & Restaurants</strong>
                Near Dhani Nallah Beach,<br />
                Andaman and Nicobar Islands,<br />
                India – 744205
              </address>
              <div className="flex gap-4 mt-6">
                <Link to="/contact" className="btn-luxury btn-primary">
                  Get Directions <ArrowRight size={16} />
                </Link>
                <a href="tel:9472765743" className="btn-luxury btn-dark">
                  Call Us
                </a>
              </div>
            </div>
            <div className="reveal-right">
              <div className="img-overlay rounded-3xl overflow-hidden h-[400px]">
                <img
                  src="https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Andaman island beach"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-teal-800 text-center" style={{ background: 'linear-gradient(135deg, #0f766e, #065f46)' }}>
        <div className="container-luxury reveal">
          <h2 className="font-serif text-4xl text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Ready for Your Escape?
          </h2>
          <p className="text-teal-200 mb-8 max-w-lg mx-auto">
            Join over 214 happy guests who discovered paradise at Bliss Holiday Resort.
          </p>
          <Link to="/booking" className="btn-luxury btn-sand">
            Book Your Stay <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
