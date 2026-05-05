/* ===== REVIEWS PAGE ===== */
import { useState, useEffect } from 'react';
import { Star, ThumbsUp, CheckCircle2, Quote } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

/* ===== REVIEW DATA TYPE ===== */
interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  location: string;
  verified: boolean;
  created_at: string;
}

/* ===== DEFAULT REVIEWS ===== */
const defaultReviews: Review[] = [
  { id: '1', name: 'Priya Sharma', rating: 5, review: 'Absolutely breathtaking! The beach was steps away from our room. The staff were incredibly warm and the free breakfast was delightful. We will definitely be back — Andaman feels like a second home now!', location: 'Mumbai, India', verified: true, created_at: '2025-12-10' },
  { id: '2', name: 'Rajesh Kumar', rating: 5, review: 'Perfect family vacation. The rooms are spacious with a full kitchen which was great for our kids. The shuttle service made exploring Andaman very easy. Cannot recommend this place enough.', location: 'Delhi, India', verified: true, created_at: '2025-11-22' },
  { id: '3', name: 'Ananya Iyer', rating: 4, review: 'Beautiful resort near Dhani Nallah Beach. The nature surroundings are stunning. Peaceful, clean, and the hospitality was top-notch. Slight delay in room service but overall a wonderful stay.', location: 'Bangalore, India', verified: true, created_at: '2025-10-15' },
  { id: '4', name: 'Vikram Mehta', rating: 5, review: 'Stayed here for our honeymoon. Magical experience from start to finish. The ocean views were incredible, room service was prompt, and the front desk team was available round the clock. Thank you Bliss!', location: 'Hyderabad, India', verified: true, created_at: '2025-09-30' },
  { id: '5', name: 'Sunita Patel', rating: 4, review: 'Great value for money. Woke up to birdsong and ocean breeze every single morning. The restaurant serves delicious local Andamanese cuisine. Very child-friendly too. Would recommend for families.', location: 'Ahmedabad, India', verified: true, created_at: '2025-08-12' },
  { id: '6', name: 'Arjun Nair', rating: 5, review: 'One of the best resorts in Andaman. The Wi-Fi was surprisingly fast, rooms were immaculate, and the parking was convenient. The beachside view is worth every rupee. Will be back next year!', location: 'Chennai, India', verified: true, created_at: '2025-07-08' },
];

/* ===== STAR DISPLAY ===== */
function StarRow({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array(5).fill(0).map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < rating ? '#f59e0b' : 'none'}
          stroke={i < rating ? '#f59e0b' : '#d1d5db'}
        />
      ))}
    </div>
  );
}

/* ===== REVIEW CARD ===== */
function ReviewCard({ review }: { review: Review }) {
  const initials = review.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const colors = ['#0f766e', '#065f46', '#0e7490', '#c48b3f', '#7c3aed', '#dc2626'];
  const color = colors[review.name.charCodeAt(0) % colors.length];

  return (
    <div className="testimonial-card">
      <div className="flex items-start justify-between mb-3">
        <StarRow rating={review.rating} size={15} />
        {review.verified && (
          <span className="flex items-center gap-1 text-xs text-green-600">
            <CheckCircle2 size={12} /> Verified Guest
          </span>
        )}
      </div>
      <p className="text-gray-700 leading-relaxed text-sm mt-6 mb-5">
        "{review.review}"
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ background: color }}
        >
          {initials}
        </div>
        <div>
          <div className="font-medium text-sm text-gray-900">{review.name}</div>
          <div className="text-xs text-gray-400">{review.location}</div>
        </div>
        <div className="ml-auto text-xs text-gray-300">
          {new Date(review.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
        </div>
      </div>
    </div>
  );
}

/* ===== RATING STATS BAR ===== */
function RatingBar({ label, count, total }: { label: string; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-8 text-gray-600 text-right">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-6 text-gray-400 text-xs">{count}</span>
    </div>
  );
}

/* ===== REVIEWS PAGE ===== */
export default function Reviews() {
  useScrollReveal();
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [filter, setFilter] = useState<number | 'all'>('all');

  useEffect(() => {
    supabase.from('reviews').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data && data.length > 0) setReviews(data as Review[]);
    });
  }, []);

  /* ===== RATING STATS ===== */
  const total = reviews.length;
  const avgRating = total > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;
  const ratingCounts = [5, 4, 3, 2, 1].map((r) => ({
    label: r,
    count: reviews.filter((rv) => rv.rating === r).length,
  }));

  const filtered = filter === 'all' ? reviews : reviews.filter((r) => r.rating === filter);

  return (
    <div className="page-enter">

      {/* ===== HERO ===== */}
      <section className="relative h-72 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Happy guests"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />
        </div>
        <div className="relative z-10 container-luxury pb-12">
          <div className="section-label" style={{ color: '#99f6e4' }}>Guest Experiences</div>
          <h1 className="font-serif text-4xl lg:text-6xl text-white" style={{ fontFamily: 'Georgia, serif' }}>
            Reviews & Testimonials
          </h1>
        </div>
      </section>

      {/* ===== RATING OVERVIEW ===== */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center max-w-4xl mx-auto">

            {/* Big Number */}
            <div className="text-center reveal">
              <div className="font-serif text-8xl font-semibold text-teal-700 leading-none mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                {avgRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-3">
                <StarRow rating={Math.round(avgRating)} size={28} />
              </div>
              <p className="text-gray-500 text-sm">Based on {total} reviews</p>
              <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#4285f4">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34a853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fbbc05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#ea4335"/>
                </svg>
                <span className="text-xs font-medium text-gray-700">Google Reviews</span>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="reveal" style={{ transitionDelay: '0.1s' }}>
              <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Rating Breakdown</h3>
              <div className="space-y-3">
                {ratingCounts.map(({ label, count }) => (
                  <RatingBar key={label} label={`${label}★`} count={count} total={total} />
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                {[
                  { value: '94%', label: 'Recommend' },
                  { value: '4.8', label: 'Cleanliness' },
                  { value: '4.9', label: 'Hospitality' },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-teal-50 rounded-xl p-3">
                    <div className="font-serif text-xl font-semibold text-teal-700" style={{ fontFamily: 'Georgia, serif' }}>{value}</div>
                    <div className="text-xs text-gray-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FILTER BY STARS ===== */}
      <div className="bg-gray-50 py-4 sticky top-20 z-20 border-y border-gray-100">
        <div className="container-luxury flex gap-3 flex-wrap justify-center">
          {(['all', 5, 4, 3] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-teal-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-teal-50'
              }`}
            >
              {f === 'all' ? `All (${total})` : `${f} Stars (${ratingCounts.find((r) => r.label === f)?.count ?? 0})`}
            </button>
          ))}
        </div>
      </div>

      {/* ===== REVIEWS GRID ===== */}
      <section className="section-padding" style={{ background: '#fdfaf5' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r, i) => (
              <div key={r.id} className="reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                <ReviewCard review={r} />
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-16">No reviews found for this rating.</p>
          )}
        </div>
      </section>

      {/* ===== FEATURED QUOTE ===== */}
      <section className="section-padding bg-teal-900" style={{ background: '#042f2e' }}>
        <div className="container-luxury max-w-3xl mx-auto text-center reveal">
          <Quote size={48} className="text-teal-600 mx-auto mb-6" />
          <blockquote className="font-serif text-2xl lg:text-3xl text-white italic leading-relaxed mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            "Waking up to the sound of the Andaman Sea, with breakfast ready and the beach calling — Bliss Holiday is exactly that. Bliss."
          </blockquote>
          <div className="text-teal-400 text-sm font-medium">— A valued guest, Mumbai</div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 bg-white text-center">
        <div className="container-luxury reveal">
          <h2 className="font-serif text-3xl text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Create Your Own Story
          </h2>
          <p className="text-gray-500 mb-6 text-sm">Join 214+ happy guests who chose Bliss Holiday Resort.</p>
          <Link to="/booking" className="btn-luxury btn-primary inline-flex">
            Book Your Stay <ThumbsUp size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
