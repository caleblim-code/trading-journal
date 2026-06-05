import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardView from '@/components/dashboard/DashboardView';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch all trades for the user
  const { data: trades, error } = await supabase
    .from('trades')
    .select('*')
    .eq('user_id', user.id)
    .order('entry_date', { ascending: true });

  if (error) {
    return <div>Error loading trades: {error.message}</div>;
  }

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2rem', letterSpacing: '-0.5px' }}>
        Dashboard
      </h1>
      <DashboardView initialTrades={trades || []} />
    </div>
  );
}
