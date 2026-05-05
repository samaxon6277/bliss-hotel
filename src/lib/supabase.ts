import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          room_type: string;
          check_in: string;
          check_out: string;
          guests: number;
          status: string;
          notes: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at'>;
      };
      reviews: {
        Row: {
          id: string;
          name: string;
          avatar_url: string;
          rating: number;
          review: string;
          location: string;
          verified: boolean;
          created_at: string;
        };
      };
      rooms: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          features: string[];
          image_url: string;
          available: boolean;
          max_guests: number;
          size_sqft: number;
          created_at: string;
        };
      };
      gallery_images: {
        Row: {
          id: string;
          url: string;
          alt: string;
          category: string;
          created_at: string;
        };
      };
      site_settings: {
        Row: { key: string; value: string; updated_at: string };
      };
    };
  };
};
