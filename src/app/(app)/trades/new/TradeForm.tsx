'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Loader2, Plus, CheckCircle2 } from 'lucide-react';

export default function TradeForm() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  
  // Basic Trade state
  const [asset, setAsset] = useState('');
  const [direction, setDirection] = useState('Long');
  const [status, setStatus] = useState('Closed');
  const [netPnl, setNetPnl] = useState('');
  const [setups, setSetups] = useState('');
  const [mistakes, setMistakes] = useState('');
  const [notes, setNotes] = useState('');

  // Simplified: Auto-generated execution data
  const [entryPrice, setEntryPrice] = useState('');
  const [exitPrice, setExitPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [tradeDate, setTradeDate] = useState(new Date().toISOString().slice(0, 16));

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/login');
      setUserId(user.id);

      // Fetch or create account
      const { data: accounts } = await supabase.from('accounts').select('*').eq('user_id', user.id);
      if (accounts && accounts.length > 0) {
        setAccountId(accounts[0].id);
      } else {
        const { data: newAcc } = await supabase.from('accounts').insert([{
          user_id: user.id,
          name: 'Main Account',
          balance: 100000
        }]).select();
        if (newAcc) setAccountId(newAcc[0].id);
      }
    }
    init();
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !accountId) return toast.error('Account not initialized. Please refresh.');
    setLoading(true);
    const toastId = toast.loading('Saving trade to database...');

    const setupsArray = setups.split(',').map(s => s.trim()).filter(Boolean);
    const mistakesArray = mistakes.split(',').map(m => m.trim()).filter(Boolean);
    const pnlValue = parseFloat(netPnl) || 0;
    const winLoss = pnlValue > 0 ? 'Win' : pnlValue < 0 ? 'Loss' : 'Breakeven';

    // 1. Insert Trade
    const { data: tradeData, error: tradeError } = await supabase.from('trades').insert([{
      user_id: userId,
      account_id: accountId,
      asset: asset.toUpperCase(),
      direction,
      status,
      entry_date: new Date(tradeDate).toISOString(),
      exit_date: status === 'Closed' ? new Date(tradeDate).toISOString() : null,
      net_pnl: pnlValue,
      win_loss: status === 'Closed' ? winLoss : 'Open',
      setups: setupsArray,
      mistakes: mistakesArray,
      notes
    }]).select();

    if (tradeError) {
      setLoading(false);
      return toast.error(tradeError.message, { id: toastId });
    }

    const tradeId = tradeData[0].id;
    const qty = parseFloat(quantity) || 1;

    // 2. Insert Executions (Simulated Entry and Exit)
    const execsToInsert = [];
    if (entryPrice) {
      execsToInsert.push({
        trade_id: tradeId,
        action: direction === 'Long' ? 'Buy' : 'Sell',
        price: parseFloat(entryPrice),
        quantity: qty,
        execution_date: new Date(tradeDate).toISOString()
      });
    }
    if (exitPrice && status === 'Closed') {
      execsToInsert.push({
        trade_id: tradeId,
        action: direction === 'Long' ? 'Sell' : 'Buy',
        price: parseFloat(exitPrice),
        quantity: qty,
        execution_date: new Date(tradeDate).toISOString()
      });
    }

    if (execsToInsert.length > 0) {
      const { error: execError } = await supabase.from('executions').insert(execsToInsert);
      if (execError) {
        setLoading(false);
        return toast.error('Trade saved, but executions failed: ' + execError.message, { id: toastId });
      }
    }

    setLoading(false);
    toast.success('Trade logged successfully!', { id: toastId });
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Container blocks */}
      <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '24px', backgroundColor: 'var(--primary)', borderRadius: '4px' }}></div>
          Core Details
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>Date</label>
            <input type="datetime-local" required value={tradeDate} onChange={e => setTradeDate(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Asset / Ticker</label>
            <input type="text" placeholder="e.g. AAPL, BTC" required value={asset} onChange={e => setAsset(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Direction</label>
            <select value={direction} onChange={e => setDirection(e.target.value)} style={inputStyle}>
              <option value="Long">Long</option>
              <option value="Short">Short</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} style={inputStyle}>
              <option value="Closed">Closed</option>
              <option value="Open">Open</option>
              <option value="Breakeven">Breakeven</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '24px', backgroundColor: 'var(--warning)', borderRadius: '4px' }}></div>
          Execution & Results
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>Quantity</label>
            <input type="number" step="any" placeholder="Shares / Contracts" value={quantity} onChange={e => setQuantity(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Avg Entry Price</label>
            <input type="number" step="any" required value={entryPrice} onChange={e => setEntryPrice(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Avg Exit Price</label>
            <input type="number" step="any" value={exitPrice} onChange={e => setExitPrice(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Net P&L ($)</label>
            <input type="number" step="any" placeholder="e.g. 150.50 or -50" value={netPnl} onChange={e => setNetPnl(e.target.value)} style={{ ...inputStyle, borderColor: netPnl ? (parseFloat(netPnl) > 0 ? 'var(--success)' : 'var(--danger)') : 'var(--surface-border)' }} />
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '24px', backgroundColor: '#a855f7', borderRadius: '4px' }}></div>
          Playbook & Notes
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>Setups (Comma separated)</label>
            <input type="text" placeholder="e.g. Breakout, Pullback" value={setups} onChange={e => setSetups(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Mistakes (Comma separated)</label>
            <input type="text" placeholder="e.g. FOMO, Late Entry" value={mistakes} onChange={e => setMistakes(e.target.value)} style={inputStyle} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Journal Notes</label>
            <textarea rows={4} placeholder="What were you thinking during this trade?" value={notes} onChange={e => setNotes(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }}></textarea>
          </div>
        </div>
      </div>

      <button type="submit" disabled={loading} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
        padding: '1rem', backgroundColor: 'var(--primary)', color: '#000', fontSize: '1.1rem', fontWeight: 700,
        border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', boxShadow: 'var(--glow-primary)',
        opacity: loading ? 0.7 : 1, transition: 'all 0.2s'
      }}>
        {loading ? <Loader2 className="spin" size={20} /> : <CheckCircle2 size={20} />}
        {loading ? 'Saving to Database...' : 'Log Trade'}
      </button>
    </form>
  );
}

const labelStyle = { display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.5px' };
const inputStyle = { width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--surface-border)', backgroundColor: 'var(--background)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' };
