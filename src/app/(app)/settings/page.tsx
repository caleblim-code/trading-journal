import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { logout } from '@/app/actions/auth';
import { SubmitButton } from '@/components/ui/SubmitButton';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2rem', letterSpacing: '-0.5px' }}>
        Settings
      </h1>
      <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', maxWidth: '500px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Logged in as</p>
          <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>{user.email}</p>
        </div>
        <form action={logout}>
          <SubmitButton style={{
            padding: '0.75rem 1.5rem', backgroundColor: 'transparent', color: 'var(--danger)',
            border: '1px solid var(--danger)', borderRadius: 'var(--radius-md)', cursor: 'pointer'
          }}>
            Log Out
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
