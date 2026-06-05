'use client';

import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { format } from 'date-fns';

type Trade = {
  id: string;
  asset: string;
  entry_date: string;
  net_pnl: number;
  win_loss: string;
  setups: string[];
};

export default function AnalyticsView({ initialTrades }: { initialTrades: Trade[] }) {
  // 1. PnL by Asset
  const assetData = useMemo(() => {
    const map: Record<string, number> = {};
    initialTrades.forEach(t => {
      const a = t.asset || 'Unknown';
      map[a] = (map[a] || 0) + (Number(t.net_pnl) || 0);
    });
    return Object.entries(map).map(([name, pnl]) => ({ name, pnl })).sort((a, b) => b.pnl - a.pnl);
  }, [initialTrades]);

  // 2. PnL by Day of Week
  const dayOfWeekData = useMemo(() => {
    const map: Record<string, number> = { 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 };
    initialTrades.forEach(t => {
      if (!t.entry_date) return;
      const day = format(new Date(t.entry_date), 'EEE'); // 'Mon', 'Tue'
      if (map[day] !== undefined) {
        map[day] += (Number(t.net_pnl) || 0);
      }
    });
    return Object.entries(map).map(([day, pnl]) => ({ day, pnl }));
  }, [initialTrades]);

  // 3. Win Rate by Setup
  const setupData = useMemo(() => {
    const map: Record<string, { wins: number, total: number }> = {};
    initialTrades.forEach(t => {
      if (t.setups && Array.isArray(t.setups)) {
        t.setups.forEach(setup => {
          if (!map[setup]) map[setup] = { wins: 0, total: 0 };
          map[setup].total += 1;
          if (t.win_loss === 'Win') map[setup].wins += 1;
        });
      }
    });
    return Object.entries(map).map(([setup, stats]) => ({
      name: setup,
      winRate: (stats.wins / stats.total) * 100,
      total: stats.total
    })).sort((a, b) => b.winRate - a.winRate);
  }, [initialTrades]);

  if (initialTrades.length === 0) {
    return <div style={{ color: 'var(--text-tertiary)' }}>No data available for analytics. Add some trades first!</div>;
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--surface-border)', padding: '1rem', borderRadius: '8px' }}>
          <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.5rem' }}>{label}</p>
          <p style={{ color: payload[0].value >= 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 800 }}>
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  const SetupTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--surface-border)', padding: '1rem', borderRadius: '8px' }}>
          <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.5rem' }}>{label}</p>
          <p style={{ color: 'var(--primary)', fontWeight: 800 }}>
            Win Rate: {payload[0].value.toFixed(1)}%
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Trades: {payload[0].payload.total}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
      
      {/* PnL by Asset */}
      <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: 600 }}>Net P&L by Asset</h3>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={assetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-secondary)' }} />
              <YAxis stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-secondary)' }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--surface-border)', opacity: 0.4 }} />
              <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                {assetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? 'var(--success)' : 'var(--danger)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PnL by Day of Week */}
      <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: 600 }}>Net P&L by Day of Week</h3>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dayOfWeekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-secondary)' }} />
              <YAxis stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-secondary)' }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--surface-border)', opacity: 0.4 }} />
              <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                {dayOfWeekData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? 'var(--success)' : 'var(--danger)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Win Rate by Setup */}
      <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', gridColumn: '1 / -1' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: 600 }}>Win Rate by Strategy / Setup</h3>
        {setupData.length > 0 ? (
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={setupData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-secondary)' }} />
                <YAxis dataKey="name" type="category" width={100} stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-secondary)' }} />
                <Tooltip content={<SetupTooltip />} cursor={{ fill: 'var(--surface-border)', opacity: 0.4 }} />
                <Bar dataKey="winRate" fill="var(--primary)" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div style={{ color: 'var(--text-tertiary)', textAlign: 'center', padding: '2rem' }}>No strategy/setup data found. Add setups when logging trades!</div>
        )}
      </div>

    </div>
  );
}
