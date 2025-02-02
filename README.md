
# MySindhudurg
A full-stack tourism booking platform built with React, Vite, and Supabase.

## Tech Stack
- Frontend: React + Vite
- Backend: Supabase
- Styling: TailwindCSS
- Auth: Supabase Auth
- Database: PostgreSQL (Supabase)
- Storage: Supabase Storage

### Installation Steps
1. Clone the repository
```bash
git clone https://github.com/yourusername/Tour-Booking.git
cd Tour-Booking
## Database Setup
```
The following SQL commands create the necessary tables and set up Row-Level Security (RLS) policies.

```bash
-- Create tables
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  full_name TEXT,
  avatar_url TEXT,
  email TEXT,
  role TEXT DEFAULT 'user'
);

CREATE TABLE public.tours (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, NOW()) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  duration TEXT,
  location TEXT,
  max_people INTEGER,
  date DATE,
  available_slots INTEGER,
  category TEXT
);

CREATE TABLE public.bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, NOW()) NOT NULL,
  user_id UUID REFERENCES public.profiles(id),
  tour_id UUID REFERENCES public.tours(id),
  status TEXT DEFAULT 'pending',
  num_people INTEGER,
  total_price DECIMAL(10,2),
  booking_date DATE
);

CREATE TABLE public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, NOW()) NOT NULL,
  user_id UUID REFERENCES public.profiles(id),
  tour_id UUID REFERENCES public.tours(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT
);

-- Enable Row-Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (TRUE);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Anyone can view tours"
  ON tours FOR SELECT
  USING (TRUE);

CREATE POLICY "Admin can manage tours"
  ON tours FOR ALL
  USING (auth.role() = 'admin');

CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (TRUE);

CREATE POLICY "Users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

