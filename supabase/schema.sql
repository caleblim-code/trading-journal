-- Create trades table
CREATE TABLE public.trades (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    asset VARCHAR(50) NOT NULL, -- e.g., EURUSD, BTCUSDT
    direction VARCHAR(10) NOT NULL CHECK (direction IN ('Long', 'Short')),
    entry_price NUMERIC NOT NULL,
    exit_price NUMERIC,
    stop_loss NUMERIC,
    take_profit NUMERIC,
    position_size NUMERIC,
    pnl NUMERIC, -- Profit and Loss
    result VARCHAR(20) CHECK (result IN ('Win', 'Loss', 'Breakeven', 'Open')),
    strategy VARCHAR(100),
    notes TEXT,
    emotions JSONB DEFAULT '[]'::jsonb, -- Array of emotions like ["FOMO", "Anxious"]
    tags JSONB DEFAULT '[]'::jsonb, -- Market conditions or other tags like ["Trend", "News"]
    screenshot_url TEXT
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;

-- For MVP purposes, since we haven't set up full user Auth yet, 
-- we allow anonymous access to this table so you can start recording trades immediately.
CREATE POLICY "Allow anonymous read access" ON public.trades FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert access" ON public.trades FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update access" ON public.trades FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete access" ON public.trades FOR DELETE USING (true);
