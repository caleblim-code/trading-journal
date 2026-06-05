import TradeForm from './TradeForm';

export default function NewTradePage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '2rem' }}>记录新交易 (Log New Trade)</h1>
      <TradeForm />
    </div>
  );
}
