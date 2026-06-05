import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AnalyticsView from '@/components/analytics/AnalyticsView';

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: trades, error } = await supabase
    .from('trades')
    .select('*')
    .eq('user_id', user.id)
    .order('entry_date', { ascending: true });

  if (error) {
    return <div>Error loading analytics data.</div>;
  }

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2rem', letterSpacing: '-0.5px' }}>
        Detailed Analytics
      </h1>
      <AnalyticsView initialTrades={trades || []} />
    </div>
  );
}
