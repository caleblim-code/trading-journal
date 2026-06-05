import Link from 'next/link';

export default function PricingPage() {
  return (
    <div style={{ padding: '6rem 5%', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-1px' }}>
        Simple, transparent pricing
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '4rem' }}>
        No hidden fees. Cancel anytime. Start scaling your trading today.
      </p>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '2rem', 
        flexWrap: 'wrap',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Basic Tier */}
        <div style={{
          flex: '1 1 300px',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2rem',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Basic</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>For traders just starting out.</p>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2rem' }}>
            $0<span style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-tertiary)' }}>/mo</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            <li>✓ Up to 50 trades per month</li>
            <li>✓ Basic PnL tracking</li>
            <li>✓ Equity curve chart</li>
          </ul>
          <Link href="/dashboard" style={{
            display: 'block',
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            transition: 'background-color 0.2s'
          }}>Get Started</Link>
        </div>

        {/* Pro Tier */}
        <div style={{
          flex: '1 1 300px',
          backgroundColor: 'var(--surface)',
          border: '2px solid var(--primary)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2rem',
          textAlign: 'left',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--glow-primary)'
        }}>
          <div style={{
            position: 'absolute',
            top: '-14px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--primary)',
            color: '#000',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>Most Popular</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Pro</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>For serious traders scaling their edge.</p>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2rem' }}>
            $29<span style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-tertiary)' }}>/mo</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            <li>✓ Unlimited trades</li>
            <li>✓ Advanced Analytics & Calendar</li>
            <li>✓ Playbooks & Daily Journal</li>
            <li>✓ Custom tags & Setup tracking</li>
            <li>✓ Priority support</li>
          </ul>
          <Link href="/dashboard" style={{
            display: 'block',
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: 'var(--primary)',
            color: '#000',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            transition: 'opacity 0.2s'
          }}>Subscribe to Pro</Link>
        </div>
      </div>
    </div>
  );
}
