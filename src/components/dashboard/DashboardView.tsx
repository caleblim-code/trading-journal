'use client';

import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';

type Trade = {
  id: string;
  entry_date: string;
  net_pnl: number;
  win_loss: string;
};

export default function DashboardView({ initialTrades }: { initialTrades: Trade[] }) {
  // 1. Calculate Metrics
  const totalTrades = initialTrades.length;
  const netPnl = initialTrades.reduce((sum, t) => sum + (Number(t.net_pnl) || 0), 0);
  const winningTrades = initialTrades.filter(t => t.win_loss === 'Win');
  const winRate = totalTrades > 0 ? (winningTrades.length / totalTrades) * 100 : 0;
  
  const grossProfit = winningTrades.reduce((sum, t) => sum + (Number(t.net_pnl) || 0), 0);
  const grossLoss = initialTrades.filter(t => t.win_loss === 'Loss').reduce((sum, t) => sum + Math.abs(Number(t.net_pnl) || 0), 0);
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : (grossProfit > 0 ? 99 : 0);

  // 2. Prepare Equity Curve Data
  const equityData = useMemo(() => {
    let cumulative = 0;
    return initialTrades.map(t => {
      cumulative += Number(t.net_pnl) || 0;
      return {
        date: format(new Date(t.entry_date), 'MMM dd'),
        pnl: cumulative
      };
    });
  }, [initialTrades]);

  // 3. Prepare Calendar Data
  const calendarData = useMemo(() => {
    const dailyPnl: Record<string, number> = {};
    initialTrades.forEach(t => {
      if (!t.entry_date) return;
      const dateStr = format(new Date(t.entry_date), 'yyyy-MM-dd');
      dailyPnl[dateStr] = (dailyPnl[dateStr] || 0) + (Number(t.net_pnl) || 0);
    });
    return dailyPnl;
  }, [initialTrades]);

  // Simple current month calendar grid
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <MetricCard title="Net P&L" value={`$${netPnl.toFixed(2)}`} color={netPnl >= 0 ? 'var(--success)' : 'var(--danger)'} />
        <MetricCard title="Win Rate" value={`${winRate.toFixed(1)}%`} />
        <MetricCard title="Profit Factor" value={profitFactor.toFixed(2)} />
        <MetricCard title="Total Trades" value={totalTrades} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {/* Equity Curve */}
        <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Equity Curve</h3>
          <div style={{ height: '300px', width: '100%' }}>
            {equityData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={equityData}>
                  <defs>
                    <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" vertical={false} />
                  <XAxis dataKey="date" stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                  <YAxis stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--primary)', fontWeight: 800 }}
                    labelStyle={{ color: 'var(--text-secondary)' }}
                  />
                  <Area type="monotone" dataKey="pnl" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorPnl)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
                No trade data available yet. Add a trade to see your curve.
              </div>
            )}
          </div>
        </div>

        {/* PnL Calendar */}
        <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            {format(today, 'MMMM yyyy')}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '8px' }}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>{d}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
            {/* Pad start of month */}
            {Array.from({ length: monthStart.getDay() }).map((_, i) => <div key={`empty-${i}`} />)}
            
            {daysInMonth.map((date) => {
              const dateStr = format(date, 'yyyy-MM-dd');
              const pnl = calendarData[dateStr];
              const isTodayDate = isToday(date);
              
              let bgColor = 'var(--background)'; 
              let textColor = 'var(--text-secondary)';
              let border = '1px solid var(--surface-border)';
              
              if (pnl > 0) {
                bgColor = 'rgba(62, 207, 142, 0.15)'; 
                textColor = 'var(--success)';
                border = '1px solid rgba(62, 207, 142, 0.3)';
              } else if (pnl < 0) {
                bgColor = 'rgba(248, 113, 113, 0.15)'; 
                textColor = 'var(--danger)';
                border = '1px solid rgba(248, 113, 113, 0.3)';
              } else if (pnl === 0) {
                bgColor = 'rgba(148, 163, 184, 0.1)'; 
              }

              if (isTodayDate) {
                border = '2px solid var(--text-primary)';
              }

              return (
                <div key={dateStr} style={{
                  aspectRatio: '1 / 1',
                  backgroundColor: bgColor,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: textColor,
                  border,
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }} title={pnl !== undefined ? `Net P&L: $${pnl.toFixed(2)}` : 'No Trades'}>
                  {format(date, 'd')}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, color = 'var(--text-primary)' }: { title: string, value: string | number, color?: string }) {
  return (
    <div style={{
      backgroundColor: 'var(--surface)',
      padding: '1.5rem',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--surface-border)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</h4>
      <div style={{ fontSize: '2.5rem', fontWeight: 800, color, letterSpacing: '-1px' }}>{value}</div>
    </div>
  );
}
