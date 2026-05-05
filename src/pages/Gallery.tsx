/* ===== GALLERY PAGE ===== */
import { useState, useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { supabase } from '../lib/supabase';

/* ===== GALLERY CATEGORIES ===== */
const categories = ['all', 'beach', 'rooms', 'resort', 'dining', 'nature'];

/* ===== DEFAULT GALLERY IMAGES ===== */
const defaultImages = [
  { id: '1', url: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Tropical beach at Andaman', category: 'beach' },
  { id: '2', url: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Luxury resort pool area', category: 'resort' },
  { id: '3', url: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Elegant resort bedroom', category: 'rooms' },
  { id: '4', url: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Beachfront dining area', category: 'dining' },
  { id: '5', url: 'https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Sunset over Andaman sea', category: 'beach' },
  { id: '6', url: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Tropical garden pathway', category: 'nature' },
  { id: '7', url: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Crystal clear beach water', category: 'beach' },
  { id: '8', url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Luxurious room interior', category: 'rooms' },
  { id: '9', url: 'https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Aerial view of resort', category: 'resort' },
  { id: '10', url: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Palm trees on beach', category: 'nature' },
  { id: '11', url: 'https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Resort restaurant view', category: 'dining' },
  { id: '12', url: 'https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Ocean view from balcony', category: 'rooms' },
  { id: '13', url: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Beautiful island sunset', category: 'beach' },
  { id: '14', url: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Tropical nature scene', category: 'nature' },
  { id: '15', url: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Resort garden', category: 'resort' },
  { id: '16', url: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Premium room suite', category: 'rooms' },
];

/* ===== LIGHTBOX COMPONENT ===== */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: { url: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  /* ===== KEYBOARD NAVIGATION ===== */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={onClose}>
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 text-white/60 text-sm z-10">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Image */}
      <div className="max-w-5xl max-h-full px-20" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
          style={{ animation: 'scaleIn 0.3s ease' }}
        />
        <p className="text-white/60 text-sm text-center mt-3">{images[currentIndex].alt}</p>
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

/* ===== GALLERY PAGE ===== */
export default function Gallery() {
  useScrollReveal();
  const [images, setImages] = useState(defaultImages);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    supabase.from('gallery_images').select('*').then(({ data }) => {
      if (data && data.length > 0) setImages(data as typeof defaultImages);
    });
  }, []);

  const filtered = activeCategory === 'all' ? images : images.filter((img) => img.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length));
  const next = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % filtered.length));

  return (
    <div className="page-enter">

      {/* ===== HERO ===== */}
      <section className="relative h-80 lg:h-96 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Gallery hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />
        </div>
        <div className="relative z-10 container-luxury pb-14">
          <div className="section-label" style={{ color: '#99f6e4' }}>Visual Journey</div>
          <h1 className="font-serif text-4xl lg:text-6xl text-white" style={{ fontFamily: 'Georgia, serif' }}>
            Gallery
          </h1>
        </div>
      </section>

      {/* ===== FILTER TABS ===== */}
      <section className="py-8 bg-white sticky top-20 z-30 border-b border-gray-100 shadow-sm">
        <div className="container-luxury">
          <div className="flex gap-3 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MASONRY GALLERY ===== */}
      <section className="section-padding" style={{ background: '#fdfaf5' }}>
        <div className="container-luxury">
          <div className="masonry-grid">
            {filtered.map((img, i) => (
              <div
                key={img.id}
                className="masonry-item group cursor-pointer"
                onClick={() => openLightbox(i)}
              >
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-400 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 glass text-white p-3 rounded-full">
                      <ZoomIn size={20} />
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="glass text-white text-xs px-3 py-1 rounded-full capitalize">
                      {img.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No images in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}

    </div>
  );
}
