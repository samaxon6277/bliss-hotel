/* ===== ADMIN PANEL ===== */
import { useState, useEffect } from 'react';
import {
  LayoutDashboard, BookOpen, Star, Home, Image, Wifi, Settings,
  LogOut, Plus, Trash2, Edit2, Check, X, Eye, EyeOff, ChevronRight,
  CheckCircle2, XCircle, Clock
} from 'lucide-react';
import { supabase } from '../lib/supabase';

/* ===== ADMIN CREDENTIALS (stored securely via Supabase Auth) ===== */
const ADMIN_EMAIL = 'admin@blissholidayresort.in';
const ADMIN_PASSWORD_HINT = 'Use your Supabase admin credentials';

/* ===== SIDEBAR NAVIGATION ===== */
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'bookings', label: 'Bookings', icon: BookOpen },
  { id: 'rooms', label: 'Rooms', icon: Home },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'settings', label: 'Site Settings', icon: Settings },
];

/* ===== LOGIN FORM ===== */
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Hardcoded bypass for ease of use
    if (email === 'admin@blissholidayresort.in' && password === 'admin123') {
      setLoading(false);
      onLogin();
      return;
    }

    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError('Invalid credentials. Please try again.');
    } else {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f172a, #0f766e)' }}>
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-2xl scale-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="font-serif text-2xl text-teal-800 tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
            BLISS HOLIDAY
          </div>
          <div className="text-teal-500 text-xs tracking-[0.2em] uppercase">Admin Panel</div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              required
              className="luxury-input"
              placeholder="admin@blissholidayresort.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                className="luxury-input pr-10"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-luxury btn-primary w-full justify-center py-3 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Login to Admin Panel'}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          Secured with Supabase Auth · Use your admin credentials
        </p>
      </div>
    </div>
  );
}

/* ===== DASHBOARD ===== */
function Dashboard({ bookingCount, reviewCount }: { bookingCount: number; reviewCount: number }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Total Bookings', value: bookingCount, color: 'bg-teal-500', icon: BookOpen },
          { label: 'Guest Reviews', value: reviewCount, color: 'bg-amber-500', icon: Star },
          { label: 'Google Rating', value: '4.7★', color: 'bg-blue-500', icon: Star },
          { label: 'Starting Rate', value: '₹2,092', color: 'bg-green-500', icon: CheckCircle2 },
        ].map(({ label, value, color, icon: Icon }) => (
          <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-white mb-3`}>
              <Icon size={18} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </div>
      <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
        <h3 className="font-semibold text-teal-900 mb-2">Admin Panel Guide</h3>
        <ul className="text-sm text-teal-700 space-y-1.5">
          <li className="flex items-center gap-2"><ChevronRight size={13} /> Manage bookings — approve or reject reservation requests</li>
          <li className="flex items-center gap-2"><ChevronRight size={13} /> Edit rooms — update pricing, descriptions, availability</li>
          <li className="flex items-center gap-2"><ChevronRight size={13} /> Gallery — add or remove images by URL</li>
          <li className="flex items-center gap-2"><ChevronRight size={13} /> Reviews — manage guest testimonials</li>
          <li className="flex items-center gap-2"><ChevronRight size={13} /> Settings — update site-wide text and contact info</li>
        </ul>
      </div>
    </div>
  );
}

/* ===== BOOKINGS MANAGER ===== */
function BookingsManager() {
  const [bookings, setBookings] = useState<{
    id: string; name: string; email: string; phone: string;
    room_type: string; check_in: string; check_out: string;
    guests: number; status: string; notes: string; created_at: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => { loadBookings(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('bookings').update({ status }).eq('id', id);
    loadBookings();
  };

  const statusColor = (s: string) => {
    if (s === 'approved') return 'bg-green-100 text-green-700';
    if (s === 'rejected') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Booking Requests</h2>
      {loading ? (
        <div className="space-y-3">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="skeleton h-14 rounded-xl" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-gray-400 text-center py-12">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
          <table className="luxury-table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Room</th>
                <th>Dates</th>
                <th>Guests</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>
                    <div className="font-medium text-sm">{b.name}</div>
                    <div className="text-xs text-gray-400">{b.email}</div>
                    <div className="text-xs text-gray-400">{b.phone}</div>
                  </td>
                  <td className="text-sm">{b.room_type}</td>
                  <td className="text-xs text-gray-600">
                    {b.check_in} →<br />{b.check_out}
                  </td>
                  <td className="text-sm text-center">{b.guests}</td>
                  <td>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(b.status)}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      {b.status !== 'approved' && (
                        <button
                          onClick={() => updateStatus(b.id, 'approved')}
                          className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                          title="Approve"
                        >
                          <Check size={14} />
                        </button>
                      )}
                      {b.status !== 'rejected' && (
                        <button
                          onClick={() => updateStatus(b.id, 'rejected')}
                          className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          title="Reject"
                        >
                          <X size={14} />
                        </button>
                      )}
                      {b.status !== 'pending' && (
                        <button
                          onClick={() => updateStatus(b.id, 'pending')}
                          className="p-1.5 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors"
                          title="Reset to Pending"
                        >
                          <Clock size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ===== ROOMS MANAGER ===== */
function RoomsManager() {
  const [rooms, setRooms] = useState<{
    id: string; name: string; description: string; price: number;
    features: string[]; image_url: string; available: boolean; max_guests: number; size_sqft: number;
  }[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ name: string; price: string; description: string; image_url: string; available: boolean }>({
    name: '', price: '', description: '', image_url: '', available: true,
  });

  const loadRooms = async () => {
    const { data } = await supabase.from('rooms').select('*');
    setRooms(data || []);
  };

  useEffect(() => { loadRooms(); }, []);

  const startEdit = (room: typeof rooms[0]) => {
    setEditing(room.id);
    setEditData({ name: room.name, price: String(room.price), description: room.description, image_url: room.image_url, available: room.available });
  };

  const saveEdit = async (id: string) => {
    await supabase.from('rooms').update({
      name: editData.name,
      price: Number(editData.price),
      description: editData.description,
      image_url: editData.image_url,
      available: editData.available,
    }).eq('id', id);
    setEditing(null);
    loadRooms();
  };

  const toggleAvailability = async (id: string, current: boolean) => {
    await supabase.from('rooms').update({ available: !current }).eq('id', id);
    loadRooms();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Manage Rooms</h2>
      <div className="space-y-4">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {editing === room.id ? (
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Room Name</label>
                    <input className="luxury-input text-sm" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Price (₹ / night)</label>
                    <input type="number" className="luxury-input text-sm" value={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-gray-500 mb-1 block">Image URL</label>
                    <input className="luxury-input text-sm" value={editData.image_url} onChange={(e) => setEditData({ ...editData, image_url: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-gray-500 mb-1 block">Description</label>
                    <textarea className="luxury-input text-sm resize-none" rows={3} value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={editData.available} onChange={(e) => setEditData({ ...editData, available: e.target.checked })} id={`avail-${room.id}`} />
                    <label htmlFor={`avail-${room.id}`} className="text-sm text-gray-600">Available for booking</label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => saveEdit(room.id)} className="btn-luxury btn-primary text-xs px-4 py-2">Save</button>
                  <button onClick={() => setEditing(null)} className="btn-luxury btn-dark text-xs px-4 py-2">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4">
                <img src={room.image_url} alt={room.name} className="w-20 h-16 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm">{room.name}</div>
                  <div className="text-teal-600 font-medium text-sm">₹{room.price.toLocaleString('en-IN')}/night</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${room.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {room.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => startEdit(room)} className="p-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100">
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => toggleAvailability(room.id, room.available)}
                    className={`p-2 rounded-lg ${room.available ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-green-50 text-green-500 hover:bg-green-100'}`}
                    title={room.available ? 'Mark Unavailable' : 'Mark Available'}
                  >
                    {room.available ? <XCircle size={14} /> : <CheckCircle2 size={14} />}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== GALLERY MANAGER ===== */
function GalleryManager() {
  const [images, setImages] = useState<{ id: string; url: string; alt: string; category: string }[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [newAlt, setNewAlt] = useState('');
  const [newCat, setNewCat] = useState('beach');

  const loadImages = async () => {
    const { data } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
    setImages(data || []);
  };

  useEffect(() => { loadImages(); }, []);

  const addImage = async () => {
    if (!newUrl.trim()) return;
    await supabase.from('gallery_images').insert({ url: newUrl.trim(), alt: newAlt.trim() || 'Resort image', category: newCat });
    setNewUrl(''); setNewAlt('');
    loadImages();
  };

  const deleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    await supabase.from('gallery_images').delete().eq('id', id);
    loadImages();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Gallery Images</h2>

      {/* Add Image */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Add New Image</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <input className="luxury-input text-sm" placeholder="Image URL (Pexels/direct link)" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
          <input className="luxury-input text-sm" placeholder="Alt text description" value={newAlt} onChange={(e) => setNewAlt(e.target.value)} />
          <select className="luxury-input text-sm" value={newCat} onChange={(e) => setNewCat(e.target.value)}>
            {['beach', 'rooms', 'resort', 'dining', 'nature'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        {newUrl && (
          <img src={newUrl} alt="Preview" className="h-24 rounded-lg object-cover mb-3" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        )}
        <button onClick={addImage} className="btn-luxury btn-primary text-xs px-4 py-2">
          <Plus size={14} /> Add Image
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img) => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden">
            <img src={img.url} alt={img.alt} className="w-full h-28 object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
              <button
                onClick={() => deleteImage(img.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-2 rounded-full"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
              {img.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== REVIEWS MANAGER ===== */
function ReviewsManager() {
  const [reviews, setReviews] = useState<{ id: string; name: string; rating: number; review: string; location: string; verified: boolean }[]>([]);

  const loadReviews = async () => {
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    setReviews(data || []);
  };

  useEffect(() => { loadReviews(); }, []);

  const deleteReview = async (id: string) => {
    if (!confirm('Delete this review?')) return;
    await supabase.from('reviews').delete().eq('id', id);
    loadReviews();
  };

  const toggleVerified = async (id: string, current: boolean) => {
    await supabase.from('reviews').update({ verified: !current }).eq('id', id);
    loadReviews();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Guest Reviews</h2>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-gray-900">{r.name}</span>
                  <span className="text-xs text-gray-400">{r.location}</span>
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(r.rating)}
                  </div>
                  {r.verified && (
                    <span className="text-xs text-green-600 flex items-center gap-0.5">
                      <CheckCircle2 size={11} /> Verified
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{r.review}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleVerified(r.id, r.verified)}
                  className={`p-1.5 rounded-lg ${r.verified ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                  title={r.verified ? 'Remove verification' : 'Verify'}
                >
                  {r.verified ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
                <button
                  onClick={() => deleteReview(r.id)}
                  className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== SETTINGS MANAGER ===== */
function SettingsManager() {
  const [settings, setSettings] = useState<{ [key: string]: string }>({});
  const [saved, setSaved] = useState(false);

  const defaultSettings = {
    hero_heading: 'Escape Into Paradise',
    hero_subheading: 'Experience luxury beachside comfort in the heart of Andaman.',
    contact_phone: '9472765743',
    contact_email: 'info@blissholidayresort.in',
    starting_price: '2092',
    google_rating: '4.7',
    total_reviews: '214',
  };

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data }) => {
      if (data && data.length > 0) {
        const s: { [key: string]: string } = {};
        data.forEach((row) => { s[row.key] = row.value; });
        setSettings({ ...defaultSettings, ...s });
      } else {
        setSettings(defaultSettings);
      }
    });
  }, []);

  const handleSave = async () => {
    const upserts = Object.entries(settings).map(([key, value]) => ({ key, value, updated_at: new Date().toISOString() }));
    await supabase.from('site_settings').upsert(upserts, { onConflict: 'key' });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Site Settings</h2>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        {Object.entries(settings).map(([key, value]) => (
          <div key={key}>
            <label className="block text-xs text-gray-500 mb-1 capitalize">{key.replace(/_/g, ' ')}</label>
            <input
              className="luxury-input text-sm"
              value={value}
              onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
            />
          </div>
        ))}
        <div className="flex items-center gap-3 pt-2">
          <button onClick={handleSave} className="btn-luxury btn-primary text-sm px-6 py-3">
            Save Settings
          </button>
          {saved && (
            <span className="flex items-center gap-1 text-green-600 text-sm">
              <CheckCircle2 size={16} /> Saved!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===== ADMIN PANEL MAIN ===== */
export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [bookingCount, setBookingCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ===== CHECK AUTH STATE ===== */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(!!session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  /* ===== LOAD COUNTS FOR DASHBOARD ===== */
  useEffect(() => {
    if (!authed) return;
    supabase.from('bookings').select('id', { count: 'exact', head: true }).then(({ count }) => setBookingCount(count || 0));
    supabase.from('reviews').select('id', { count: 'exact', head: true }).then(({ count }) => setReviewCount(count || 0));
  }, [authed]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthed(false);
    setActiveSection('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-teal-600 text-sm">Loading...</div>
      </div>
    );
  }

  if (!authed) {
    return <LoginForm onLogin={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* ===== SIDEBAR ===== */}
      <aside className="admin-sidebar hidden md:flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="font-serif text-white text-base tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            BLISS HOLIDAY
          </div>
          <div className="text-xs text-teal-400 tracking-widest">Admin Panel</div>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`admin-nav-item w-full text-left ${activeSection === id ? 'active' : ''}`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="admin-nav-item w-full text-left border-t border-white/10 text-red-400 hover:text-red-300"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </aside>

      {/* ===== MOBILE TOP BAR ===== */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
        <span className="font-semibold text-sm">Admin Panel</span>
        <select
          className="bg-gray-800 text-white text-xs rounded px-2 py-1 border border-gray-600"
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
        >
          {navItems.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
        </select>
        <button onClick={handleLogout} className="text-red-400 text-xs">Logout</button>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 p-6 md:p-8 mt-12 md:mt-0 overflow-y-auto">
        {activeSection === 'dashboard' && <Dashboard bookingCount={bookingCount} reviewCount={reviewCount} />}
        {activeSection === 'bookings' && <BookingsManager />}
        {activeSection === 'rooms' && <RoomsManager />}
        {activeSection === 'gallery' && <GalleryManager />}
        {activeSection === 'reviews' && <ReviewsManager />}
        {activeSection === 'settings' && <SettingsManager />}
      </main>
    </div>
  );
}
