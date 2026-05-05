/* ===== CONTACT PAGE ===== */
import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* ===== CONTACT FORM STATE ===== */
interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  useScrollReveal();
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    /* Simulate a small delay for UX — no backend for contact form */
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="page-enter">

      {/* ===== HERO ===== */}
      <section className="relative h-72 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Resort contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />
        </div>
        <div className="relative z-10 container-luxury pb-12">
          <div className="section-label" style={{ color: '#99f6e4' }}>Reach Out</div>
          <h1 className="font-serif text-4xl lg:text-6xl text-white" style={{ fontFamily: 'Georgia, serif' }}>
            Contact Us
          </h1>
        </div>
      </section>

      {/* ===== CONTACT MAIN ===== */}
      <section className="section-padding" style={{ background: '#fdfaf5' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ===== CONTACT INFO ===== */}
            <div className="space-y-6">

              {/* Address */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 reveal">
                <h3 className="font-serif text-lg text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  Find Us
                </h3>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-teal-600" />
                  </div>
                  <address className="not-italic text-gray-600 text-sm leading-relaxed">
                    <strong className="text-gray-900">Bliss Holiday Resort & Restaurants</strong><br />
                    Near Dhani Nallah Beach,<br />
                    Andaman and Nicobar Islands,<br />
                    India – 744205
                  </address>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 reveal" style={{ transitionDelay: '0.1s' }}>
                <h3 className="font-serif text-lg text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  Call Us
                </h3>
                <a
                  href="tel:9472765743"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 transition-colors">
                    <Phone size={18} className="text-teal-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-gray-900 font-semibold group-hover:text-teal-600 transition-colors">+91 9472765743</div>
                    <div className="text-gray-400 text-xs">Available 24/7 for guests</div>
                  </div>
                </a>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 reveal" style={{ transitionDelay: '0.15s' }}>
                <h3 className="font-serif text-lg text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  Email
                </h3>
                <a
                  href="mailto:info@blissholidayresort.in"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 transition-colors">
                    <Mail size={18} className="text-teal-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-gray-900 font-semibold text-sm group-hover:text-teal-600 transition-colors">info@blissholidayresort.in</div>
                    <div className="text-gray-400 text-xs">Reply within 4 hours</div>
                  </div>
                </a>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919472765743?text=Hello! I'd like to know more about Bliss Holiday Resort."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500 text-white p-5 rounded-2xl hover:bg-green-600 transition-colors reveal"
                style={{ transitionDelay: '0.2s' }}
              >
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div className="font-semibold">Chat on WhatsApp</div>
                  <div className="text-green-100 text-xs">Fastest response · Usually within minutes</div>
                </div>
                <ChevronRight size={18} className="ml-auto" />
              </a>

              {/* Hours */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 reveal" style={{ transitionDelay: '0.25s' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-teal-600" />
                  <h4 className="text-sm font-semibold text-gray-800">Front Desk Hours</h4>
                </div>
                <div className="text-xs text-gray-500 space-y-1.5">
                  <div className="flex justify-between">
                    <span>Reception</span>
                    <span className="text-green-600 font-medium">Open 24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Restaurant</span>
                    <span>7:00 AM – 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Room Service</span>
                    <span>24 Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shuttle Service</span>
                    <span>8:00 AM – 8:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== CONTACT FORM ===== */}
            <div className="lg:col-span-2 reveal-right">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="font-serif text-2xl text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  Send a Message
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Have a question about your stay? We'd love to hear from you.
                </p>

                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-green-500" />
                    </div>
                    <h3 className="font-serif text-xl text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                      Message Sent!
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      Thank you for reaching out. Our team will respond within a few hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                      className="text-teal-600 text-sm font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          className="luxury-input"
                          placeholder="Full name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          className="luxury-input"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          className="luxury-input"
                          placeholder="Mobile number"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Subject *</label>
                        <select
                          required
                          className="luxury-input"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        >
                          <option value="">Select topic...</option>
                          <option>Booking Inquiry</option>
                          <option>Room Information</option>
                          <option>Check-in / Check-out</option>
                          <option>Special Requests</option>
                          <option>General Inquiry</option>
                          <option>Feedback</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Message *</label>
                      <textarea
                        required
                        className="luxury-input resize-none"
                        rows={5}
                        placeholder="How can we help you?"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-luxury btn-primary w-full justify-center py-4 text-sm disabled:opacity-60"
                    >
                      {submitting ? 'Sending...' : <>Send Message <ChevronRight size={16} /></>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAP SECTION ===== */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="text-center mb-10 reveal">
            <div className="section-label justify-center">Location</div>
            <h2 className="font-serif text-3xl text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              Find Bliss Holiday Resort
            </h2>
          </div>

          <div className="reveal">
            {/* Embedded Google Map for Andaman */}
            <div className="rounded-2xl overflow-hidden shadow-md h-96 bg-gray-100">
              <iframe
                title="Bliss Holiday Resort Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29963.453953938895!2d92.71396!3d11.63344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x308813cde71f0f71%3A0x25b1ed7cfcd10b63!2sAndaman%20and%20Nicobar%20Islands%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-4 justify-center text-sm text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={14} className="text-teal-500" /> Near Dhani Nallah Beach, Andaman</span>
              <a
                href="https://www.google.com/maps/search/Dhani+Nallah+Beach,+Andaman"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-teal-600 hover:underline font-medium"
              >
                Open in Google Maps <ChevronRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
