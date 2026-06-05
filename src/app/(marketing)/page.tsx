export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        padding: '8rem 5%',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(62, 207, 142, 0.05) 0%, var(--background) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow effect in background */}
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(62,207,142,0.15) 0%, rgba(15,17,26,0) 70%)', zIndex: 0 }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{ 
          fontSize: '4.5rem', 
          fontWeight: 800, 
          color: 'var(--text-primary)',
          letterSpacing: '-1.5px',
          lineHeight: 1.1,
          maxWidth: '900px',
          margin: '0 auto 1.5rem'
        }}>
          Trade like a Pro. <br/>
          <span style={{ color: 'var(--primary)' }}>Track like a Machine.</span>
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          margin: '0 auto 3rem',
          lineHeight: 1.6
        }}>
          The ultimate automated trading journal that uncovers your hidden edge. Stop guessing and start analyzing your setups, mistakes, and profitability in real-time.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button style={{
            padding: '1rem 2.5rem',
            fontSize: '1.1rem',
            fontWeight: 600,
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            boxShadow: 'var(--glow-primary)'
          }}>Get Started for Free</button>
          <button style={{
            padding: '1rem 2.5rem',
            fontSize: '1.1rem',
            fontWeight: 600,
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer'
          }}>View Demo</button>
        </div>
        </div>
      </section>

      {/* Dashboard Preview Mockup */}
      <section style={{ padding: '0 5% 5rem', marginTop: '-4rem' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          backgroundColor: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--surface-border)',
          height: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '40px',
            backgroundColor: '#f1f3f5',
            borderBottom: '1px solid var(--surface-border)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            gap: '0.5rem'
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
          </div>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '40px' }}>
            [ Dashboard UI Visualization ]
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '5rem 5%', backgroundColor: 'var(--surface)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>Everything you need to scale</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Stop bleeding money on bad setups. OneTrade shows you exactly what works.</p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            { title: 'Interactive Calendar', desc: 'See your green and red days at a glance. Drill down into specific dates to see every execution.' },
            { title: 'Deep Analytics', desc: 'Find your edge by analyzing performance by time of day, day of week, asset, and strategy.' },
            { title: 'Playbooks', desc: 'Build your trading playbook. Link your actual trades to theoretical setups and track their success rate.' },
          ].map((feature, i) => (
            <div key={i} style={{
              padding: '2rem',
              backgroundColor: 'var(--background)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--surface-border)'
            }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--primary-light)', borderRadius: '12px', marginBottom: '1.5rem' }}></div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
