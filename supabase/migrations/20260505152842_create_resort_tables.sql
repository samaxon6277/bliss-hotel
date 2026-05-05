/*
  # Bliss Holiday Resort - Core Database Schema

  ## Tables Created:
  1. bookings - Guest booking requests
  2. reviews - Guest reviews and testimonials  
  3. rooms - Room data editable via admin
  4. gallery_images - Gallery images manageable via admin
  5. site_settings - Editable homepage/site content

  ## Security: RLS enabled on all tables
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  room_type text NOT NULL DEFAULT 'Deluxe Beach Room',
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'pending',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a booking"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update booking status"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  avatar_url text DEFAULT '',
  rating integer NOT NULL DEFAULT 5,
  review text NOT NULL,
  location text DEFAULT 'India',
  verified boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reviews"
  ON reviews FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price integer NOT NULL DEFAULT 2092,
  features text[] DEFAULT '{}',
  image_url text DEFAULT '',
  available boolean DEFAULT true,
  max_guests integer DEFAULT 2,
  size_sqft integer DEFAULT 350,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view rooms"
  ON rooms FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert rooms"
  ON rooms FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update rooms"
  ON rooms FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete rooms"
  ON rooms FOR DELETE
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  alt text DEFAULT '',
  category text DEFAULT 'resort',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery images"
  ON gallery_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert gallery images"
  ON gallery_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery images"
  ON gallery_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gallery images"
  ON gallery_images FOR DELETE
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS site_settings (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can upsert site settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO reviews (name, rating, review, location) VALUES
  ('Priya Sharma', 5, 'Absolutely breathtaking! The beach was steps away from our room. The staff were incredibly warm and the free breakfast was delightful. We will definitely be back!', 'Mumbai, India'),
  ('Rajesh Kumar', 5, 'Perfect family vacation. The rooms are spacious with a full kitchen which was great for our kids. The shuttle service made exploring Andaman very easy.', 'Delhi, India'),
  ('Ananya Iyer', 4, 'Beautiful resort near Dhani Nallah Beach. The nature surroundings are stunning. Peaceful, clean, and the hospitality was top-notch. Highly recommend!', 'Bangalore, India'),
  ('Vikram Mehta', 5, 'Stayed here for our honeymoon. Magical experience. The ocean views were incredible, room service was prompt, and the front desk team was available round the clock.', 'Hyderabad, India'),
  ('Sunita Patel', 4, 'Great value for money. Woke up to birdsong and ocean breeze every morning. The restaurant serves delicious local Andamanese cuisine. Very child-friendly too.', 'Ahmedabad, India'),
  ('Arjun Nair', 5, 'One of the best resorts in Andaman. The Wi-Fi was surprisingly fast, rooms were immaculate, and the parking was convenient. Highly recommend to everyone.', 'Chennai, India')
ON CONFLICT DO NOTHING;

INSERT INTO rooms (name, description, price, features, image_url, max_guests, size_sqft)
VALUES
  ('Deluxe Beach Room', 'Wake up to the sound of waves in our elegantly appointed beach-facing room. Featuring floor-to-ceiling windows with stunning ocean panoramas.', 2092, ARRAY['Air Conditioning', 'Full Kitchen', 'Free Wi-Fi', 'Room Service', 'Beach View', 'King Bed'], 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg', 2, 380);

INSERT INTO rooms (name, description, price, features, image_url, max_guests, size_sqft)
VALUES
  ('Luxury Family Suite', 'Designed for families seeking space and comfort. Two connected rooms with a shared living area, full kitchen, and private balcony overlooking tropical gardens.', 3499, ARRAY['Air Conditioning', 'Full Kitchen', 'Free Wi-Fi', 'Room Service', 'Garden View', '2 Bedrooms', 'Living Room'], 'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg', 4, 620);

INSERT INTO rooms (name, description, price, features, image_url, max_guests, size_sqft)
VALUES
  ('Ocean View Premium Room', 'Our most sought-after room category. Panoramic ocean vistas from every angle. Premium furnishings, rain shower, and exclusive butler-style room service.', 4200, ARRAY['Air Conditioning', 'Full Kitchen', 'Free Wi-Fi', '24/7 Room Service', 'Ocean View', 'Rain Shower', 'Premium Amenities'], 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg', 2, 450);

INSERT INTO gallery_images (url, alt, category) VALUES
  ('https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg', 'Tropical beach at Andaman', 'beach'),
  ('https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg', 'Luxury resort pool area', 'resort'),
  ('https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg', 'Elegant resort bedroom', 'rooms'),
  ('https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg', 'Beachfront dining area', 'dining'),
  ('https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg', 'Sunset over Andaman sea', 'beach'),
  ('https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg', 'Tropical garden pathway', 'nature'),
  ('https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg', 'Crystal clear beach water', 'beach'),
  ('https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg', 'Luxurious room interior', 'rooms'),
  ('https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg', 'Aerial view of resort', 'resort'),
  ('https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg', 'Palm trees on beach', 'nature'),
  ('https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg', 'Resort restaurant view', 'dining'),
  ('https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg', 'Ocean view from balcony', 'rooms')
ON CONFLICT DO NOTHING;
