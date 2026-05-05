/* ===== BOOKING PAGE ===== */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Home, CheckCircle2, ChevronRight, X, Phone, MessageCircle, Info, Star } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { supabase } from '../lib/supabase';

/* ===== ROOM OPTIONS ===== */
const roomOptions = [
  { name: 'Deluxe Beach Room', price: 2092, maxGuests: 2 },
  { name: 'Luxury Family Suite', price: 3499, maxGuests: 4 },
  { name: 'Ocean View Premium Room', price: 4200, maxGuests: 2 },
];

/* ===== BOOKING FORM STATE ===== */
interface BookingForm {
  name: string;
  email: string;
  phone: string;
  room_type: string;
  check_in: string;
  check_out: string;
  guests: number;
  notes: string;
}

const emptyForm: BookingForm = {
  name: '', email: '', phone: '',
  room_type: 'Deluxe Beach Room',
  check_in: '', check_out: '',
  guests: 1, notes: '',
};

/* ===== NIGHT COUNT CALCULATOR ===== */
function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const d1 = new Date(checkIn).getTime();
  const d2 = new Date(checkOut).getTime();
  const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

/* ===== SUCCESS MODAL ===== */
function SuccessModal({ name, room, onClose }: { name: string; room: string; onClose: () => void }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={32} className="text-green-500" />
        </div>
        <h2 className="font-serif text-2xl text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Booking Received!
        </h2>
        <p className="text-gray-600 mb-2">
          Thank you, <strong>{name}</strong>. Your reservation request for the <strong>{room}</strong> has been submitted.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Our team will contact you within 2 hours to confirm your booking. Feel free to WhatsApp us for faster confirmation.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="https://wa.me/919472765743?text=Hi! I just submitted a booking request. My name is "
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury btn-primary w-full justify-center"
          >
            <MessageCircle size={16} />
            Confirm via WhatsApp
          </a>
          <button onClick={onClose} className="text-gray-500 text-sm hover:text-gray-700 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== BOOKING PAGE COMPONENT ===== */
export default function Booking() {
  useScrollReveal();
  const [form, setForm] = useState<BookingForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<BookingForm>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  /* ===== GET SELECTED ROOM ===== */
  const selectedRoom = roomOptions.find((r) => r.name === form.room_type) || roomOptions[0];
  const nights = nightsBetween(form.check_in, form.check_out);
  const baseTotal = selectedRoom.price * Math.max(nights, 1);
  const breakfastValue = 450 * Math.max(nights, 1) * form.guests;
  const taxes = Math.round(baseTotal * 0.12);
  const grandTotal = baseTotal + taxes;

  /* ===== VALIDATE FORM ===== */
  const validate = (): boolean => {
    const errs: Partial<BookingForm> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) errs.phone = 'Valid 10-digit phone required';
    if (!form.check_in) errs.check_in = 'Check-in date required';
    if (!form.check_out) errs.check_out = 'Check-out date required';
    if (form.check_in && form.check_out && form.check_in >= form.check_out) {
      errs.check_out = 'Check-out must be after check-in';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ===== SUBMIT BOOKING ===== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const { error } = await supabase.from('bookings').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      room_type: form.room_type,
      check_in: form.check_in,
      check_out: form.check_out,
      guests: form.guests,
      notes: form.notes,
      status: 'pending',
    });
    setSubmitting(false);
    if (!error) {
      setShowModal(true);
      setSubmitted(true);
      setForm(emptyForm);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="page-enter">

      {/* ===== HERO ===== */}
      <section className="relative h-72 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Booking hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />
        </div>
        <div className="relative z-10 container-luxury pb-12">
          <div className="section-label" style={{ color: '#99f6e4' }}>Reserve Your Escape</div>
          <h1 className="font-serif text-4xl lg:text-6xl text-white" style={{ fontFamily: 'Georgia, serif' }}>
            Book Your Stay
          </h1>
        </div>
      </section>

      {/* ===== BOOKING SECTION ===== */}
      <section className="section-padding" style={{ background: '#fdfaf5' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ===== BOOKING FORM ===== */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="font-serif text-2xl text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                  Reservation Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Guest Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase mb-4">
                      Guest Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Full Name *</label>
                        <input
                          type="text"
                          className="luxury-input"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Email Address *</label>
                        <input
                          type="email"
                          className="luxury-input"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          className="luxury-input"
                          placeholder="10-digit mobile number"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Number of Guests *</label>
                        <select
                          className="luxury-input"
                          value={form.guests}
                          onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                        >
                          {Array.from({ length: selectedRoom.maxGuests }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Stay Details */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase mb-4">
                      Stay Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Check-in Date *</label>
                        <input
                          type="date"
                          className="luxury-input"
                          min={today}
                          value={form.check_in}
                          onChange={(e) => setForm({ ...form, check_in: e.target.value })}
                        />
                        {errors.check_in && <p className="text-red-500 text-xs mt-1">{errors.check_in}</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Check-out Date *</label>
                        <input
                          type="date"
                          className="luxury-input"
                          min={form.check_in || today}
                          value={form.check_out}
                          onChange={(e) => setForm({ ...form, check_out: e.target.value })}
                        />
                        {errors.check_out && <p className="text-red-500 text-xs mt-1">{errors.check_out}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Room Selection */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase mb-4">
                      Select Room
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {roomOptions.map((room) => (
                        <label
                          key={room.name}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            form.room_type === room.name
                              ? 'border-teal-500 bg-teal-50'
                              : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="room_type"
                            value={room.name}
                            checked={form.room_type === room.name}
                            onChange={() => setForm({ ...form, room_type: room.name, guests: Math.min(form.guests, room.maxGuests) })}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            form.room_type === room.name ? 'border-teal-500' : 'border-gray-300'
                          }`}>
                            {form.room_type === room.name && (
                              <div className="w-2 h-2 rounded-full bg-teal-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm text-gray-800">{room.name}</div>
                            <div className="text-xs text-gray-500">Up to {room.maxGuests} guests</div>
                          </div>
                          <div className="text-teal-700 font-semibold text-sm">
                            ₹{room.price.toLocaleString('en-IN')}<span className="text-gray-400 font-normal">/night</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Special Requests (optional)</label>
                    <textarea
                      className="luxury-input resize-none"
                      rows={3}
                      placeholder="Any special requirements or requests..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-luxury btn-primary w-full justify-center py-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="15 25" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      <>Reserve Now <ChevronRight size={16} /></>
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    By booking you agree to our cancellation policy. No payment required now.
                  </p>
                </form>
              </div>
            </div>

            {/* ===== BOOKING SIDEBAR ===== */}
            <div className="space-y-5">

              {/* Price Summary Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-serif text-lg text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  Price Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{selectedRoom.name}</span>
                    <span className="font-medium">₹{selectedRoom.price.toLocaleString('en-IN')}/night</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{nights > 0 ? `${nights} night${nights > 1 ? 's' : ''}` : '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{(selectedRoom.price * Math.max(nights, 1)).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1"><CheckCircle2 size={13} /> Free Breakfast</span>
                    <span className="font-medium">₹{breakfastValue.toLocaleString('en-IN')} value</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Taxes & Fees (12%)</span>
                    <span>₹{taxes.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-teal-700 font-bold text-lg">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3 flex items-start gap-1">
                  <Info size={12} className="mt-0.5 flex-shrink-0" />
                  Final amount payable at property. Free cancellation 48hrs before check-in.
                </p>
              </div>

              {/* Quick Contact */}
              <div className="bg-teal-800 rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #0f766e, #065f46)' }}>
                <h3 className="font-serif text-lg mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                  Need Help?
                </h3>
                <p className="text-teal-200 text-sm mb-4">
                  Our team is available 24/7 to help with your booking.
                </p>
                <a
                  href="tel:9472765743"
                  className="flex items-center gap-2 text-sm hover:text-teal-200 transition-colors mb-3"
                >
                  <Phone size={14} /> +91 9472765743
                </a>
                <a
                  href="https://wa.me/919472765743?text=Hi! I need help with a booking."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-400 transition-colors w-full justify-center"
                >
                  <MessageCircle size={14} /> WhatsApp Us
                </a>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Why Book Direct</h4>
                {[
                  'Best available rates', 'Free complimentary breakfast', 'Flexible cancellation',
                  '24hr front desk support', 'Kitchen in every room',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                    <CheckCircle2 size={13} className="text-green-500" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Rating */}
              <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-amber-400">
                    {Array(5).fill(0).map((_, i) => <Star key={i} size={14} fill="#f59e0b" stroke="none" />)}
                  </div>
                  <span className="font-bold text-gray-900">4.7</span>
                </div>
                <p className="text-xs text-gray-600">
                  Rated 4.7/5 by 214+ guests on Google. Ranked among the best resorts near Dhani Nallah Beach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SUCCESS MODAL ===== */}
      {showModal && (
        <SuccessModal
          name={form.name || 'Guest'}
          room={form.room_type}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
}
