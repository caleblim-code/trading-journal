-- OneTrade (TradeZella Clone) Advanced Database Schema

-- 1. Accounts Table (Users can have multiple trading accounts)
CREATE TABLE public.accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    balance NUMERIC DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- 2. Trades Table (The parent record of a trade)
CREATE TABLE public.trades (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
    asset VARCHAR(50) NOT NULL,
    direction VARCHAR(10) NOT NULL CHECK (direction IN ('Long', 'Short')),
    status VARCHAR(20) DEFAULT 'Open' CHECK (status IN ('Open', 'Closed', 'Breakeven')),
    entry_date TIMESTAMP WITH TIME ZONE,
    exit_date TIMESTAMP WITH TIME ZONE,
    net_pnl NUMERIC DEFAULT 0,
    win_loss VARCHAR(10) CHECK (win_loss IN ('Win', 'Loss', 'Breakeven', 'Open')),
    setups JSONB DEFAULT '[]'::jsonb,
    mistakes JSONB DEFAULT '[]'::jsonb,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- 3. Executions Table (The actual buy/sell orders that make up a trade)
CREATE TABLE public.executions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    trade_id UUID REFERENCES public.trades(id) ON DELETE CASCADE NOT NULL,
    action VARCHAR(10) NOT NULL CHECK (action IN ('Buy', 'Sell')),
    price NUMERIC NOT NULL,
    quantity NUMERIC NOT NULL,
    execution_date TIMESTAMP WITH TIME ZONE NOT NULL,
    fees NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.executions ENABLE ROW LEVEL SECURITY;

-- Policies (Users can only see and edit their own data)
CREATE POLICY "Users can view own accounts" ON public.accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own accounts" ON public.accounts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own accounts" ON public.accounts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own accounts" ON public.accounts FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own trades" ON public.trades FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own trades" ON public.trades FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own trades" ON public.trades FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own trades" ON public.trades FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own executions" ON public.executions FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.trades WHERE trades.id = executions.trade_id AND trades.user_id = auth.uid())
);
CREATE POLICY "Users can insert own executions" ON public.executions FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.trades WHERE trades.id = executions.trade_id AND trades.user_id = auth.uid())
);
