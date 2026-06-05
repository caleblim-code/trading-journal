import Link from 'next/link';
import { login } from '@/app/actions/auth';
import { SubmitButton } from '@/components/ui/SubmitButton';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'var(--surface)',
        padding: '3rem 2rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-block', width: '32px', height: '32px', backgroundColor: 'var(--primary)', borderRadius: '8px', boxShadow: 'var(--glow-primary)', marginBottom: '1rem' }}></div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>Welcome back</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Log in to your OneTrade account</p>
        </div>

        <form action={login} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email</label>
            <input 
              type="email" 
              name="email" 
              required 
              style={{
                width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--surface-border)', backgroundColor: 'var(--background)', color: 'var(--text-primary)'
              }}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              style={{
                width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--surface-border)', backgroundColor: 'var(--background)', color: 'var(--text-primary)'
              }}
            />
          </div>

          {searchParams?.message && (
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', textAlign: 'center' }}>
              {searchParams.message}
            </div>
          )}

          <SubmitButton style={{
            marginTop: '1rem', width: '100%', padding: '0.75rem', backgroundColor: 'var(--primary)',
            color: '#000', fontWeight: 600, border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer',
            boxShadow: 'var(--glow-primary)'
          }}>
            Log In
          </SubmitButton>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link href="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}
