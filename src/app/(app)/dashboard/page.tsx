export default function Home() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '2rem' }}>仪表盘 (Dashboard)</h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {['总盈亏 (PnL)', '胜率 (Win Rate)', '总交易次数', '利润因子 (Profit Factor)'].map(kpi => (
          <div key={kpi} style={{
            backgroundColor: 'var(--surface)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--surface-border)'
          }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{kpi}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>--</div>
          </div>
        ))}
      </div>
      
      <div style={{
        backgroundColor: 'var(--surface)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--surface-border)',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-tertiary)'
      }}>
        资金曲线图占位区域 (Equity Curve Chart Placeholder)
      </div>
    </div>
  );
}
