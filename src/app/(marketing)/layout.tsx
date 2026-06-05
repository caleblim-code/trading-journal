import Link from 'next/link';

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
        borderBottom: '1px solid var(--surface-border)',
        backgroundColor: 'var(--surface)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '24px', height: '24px', backgroundColor: 'var(--primary)', borderRadius: '6px', boxShadow: 'var(--glow-primary)' }}></div>
          OneTrade
        </div>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/features" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Features</Link>
          <Link href="/pricing" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Pricing</Link>
          <Link href="/login" style={{ 
            fontWeight: 600, 
            backgroundColor: 'var(--primary)', 
            color: 'white', 
            padding: '0.6rem 1.5rem', 
            borderRadius: 'var(--radius-lg)',
            transition: 'opacity 0.2s'
          }}>Log In</Link>
        </nav>
      </header>

      <main style={{ flex: 1 }}>
        {children}
      </main>

      <footer style={{
        padding: '4rem 5%',
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--surface-border)',
        textAlign: 'center',
        color: 'var(--text-tertiary)'
      }}>
        <p>© 2024 OneTrade. All rights reserved.</p>
      </footer>
    </div>
  );
}
