import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function TradesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: trades, error } = await supabase
    .from('trades')
    .select('*')
    .eq('user_id', user.id)
    .order('entry_date', { ascending: false });

  if (error) {
    return <div>Error loading trades.</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
          Trades Log
        </h1>
        <Link href="/trades/new" style={{
          padding: '0.75rem 1.5rem', backgroundColor: 'var(--primary)', color: '#000',
          fontWeight: 600, borderRadius: 'var(--radius-md)', textDecoration: 'none',
          boxShadow: 'var(--glow-primary)'
        }}>
          + Add Trade
        </Link>
      </div>

      <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--surface-border)' }}>
            <tr>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Date</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Asset</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Side</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Net P&L</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {trades?.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>No trades found.</td>
              </tr>
            ) : trades?.map(trade => (
              <tr key={trade.id} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                <td style={{ padding: '1rem' }}>{trade.entry_date ? format(new Date(trade.entry_date), 'MMM dd, HH:mm') : '-'}</td>
                <td style={{ padding: '1rem', fontWeight: 600 }}>{trade.asset}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem',
                    backgroundColor: trade.direction === 'Long' ? 'rgba(62,207,142,0.1)' : 'rgba(248,113,113,0.1)',
                    color: trade.direction === 'Long' ? 'var(--success)' : 'var(--danger)'
                  }}>
                    {trade.direction}
                  </span>
                </td>
                <td style={{ padding: '1rem', fontWeight: 600, color: Number(trade.net_pnl) >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                  ${Number(trade.net_pnl).toFixed(2)}
                </td>
                <td style={{ padding: '1rem' }}>{trade.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
