'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from './TradeForm.module.css';

export default function TradeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 16),
    asset: '',
    direction: 'Long',
    entry_price: '',
    exit_price: '',
    stop_loss: '',
    take_profit: '',
    position_size: '',
    pnl: '',
    result: 'Open',
    strategy: '',
    notes: '',
    emotions: '', // Comma separated for now
    tags: '', // Comma separated
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Process tags and emotions from comma separated strings to arrays
    const emotionsArray = formData.emotions.split(',').map(e => e.trim()).filter(e => e);
    const tagsArray = formData.tags.split(',').map(e => e.trim()).filter(e => e);

    const { data, error: submitError } = await supabase.from('trades').insert([{
      date: new Date(formData.date).toISOString(),
      asset: formData.asset.toUpperCase(),
      direction: formData.direction,
      entry_price: parseFloat(formData.entry_price),
      exit_price: formData.exit_price ? parseFloat(formData.exit_price) : null,
      stop_loss: formData.stop_loss ? parseFloat(formData.stop_loss) : null,
      take_profit: formData.take_profit ? parseFloat(formData.take_profit) : null,
      position_size: formData.position_size ? parseFloat(formData.position_size) : null,
      pnl: formData.pnl ? parseFloat(formData.pnl) : null,
      result: formData.result,
      strategy: formData.strategy,
      notes: formData.notes,
      emotions: emotionsArray,
      tags: tagsArray
    }]);

    setLoading(false);

    if (submitError) {
      setError(submitError.message);
    } else {
      router.push('/trades');
      router.refresh();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.section}>
        <h3>基础信息 (Basic Info)</h3>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>交易时间 (Date & Time)*</label>
            <input type="datetime-local" name="date" required value={formData.date} onChange={handleChange} />
          </div>
          <div className={styles.field}>
            <label>标的 (Asset)*</label>
            <input type="text" name="asset" placeholder="e.g. BTCUSDT, AAPL" required value={formData.asset} onChange={handleChange} />
          </div>
          <div className={styles.field}>
            <label>方向 (Direction)*</label>
            <select name="direction" required value={formData.direction} onChange={handleChange}>
              <option value="Long">做多 (Long)</option>
              <option value="Short">做空 (Short)</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3>价格与盈亏 (Price & PnL)</h3>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>进场价 (Entry Price)*</label>
            <input type="number" step="any" name="entry_price" required value={formData.entry_price} onChange={handleChange} />
          </div>
          <div className={styles.field}>
            <label>出场价 (Exit Price)</label>
            <input type="number" step="any" name="exit_price" value={formData.exit_price} onChange={handleChange} />
          </div>
          <div className={styles.field}>
            <label>止损价 (Stop Loss)</label>
            <input type="number" step="any" name="stop_loss" value={formData.stop_loss} onChange={handleChange} />
          </div>
          <div className={styles.field}>
            <label>止盈价 (Take Profit)</label>
            <input type="number" step="any" name="take_profit" value={formData.take_profit} onChange={handleChange} />
          </div>
          <div className={styles.field}>
            <label>仓位大小 (Position Size)</label>
            <input type="number" step="any" name="position_size" value={formData.position_size} onChange={handleChange} />
          </div>
          <div className={styles.field}>
            <label>总盈亏 (PnL, 金额)</label>
            <input type="number" step="any" name="pnl" value={formData.pnl} onChange={handleChange} />
          </div>
          <div className={styles.field}>
            <label>交易结果 (Result)</label>
            <select name="result" value={formData.result} onChange={handleChange}>
              <option value="Open">持仓中 (Open)</option>
              <option value="Win">盈利 (Win)</option>
              <option value="Loss">亏损 (Loss)</option>
              <option value="Breakeven">保本 (Breakeven)</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3>策略与情绪 (Strategy & Emotions)</h3>
        <div className={styles.field}>
          <label>使用的策略 (Strategy)</label>
          <input type="text" name="strategy" placeholder="e.g. 突破回踩, 均线金叉" value={formData.strategy} onChange={handleChange} />
        </div>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>情绪标签 (Emotions, 逗号分隔)</label>
            <input type="text" name="emotions" placeholder="e.g. 焦虑, 冲动, 自信" value={formData.emotions} onChange={handleChange} />
          </div>
          <div className={styles.field}>
            <label>市场环境标签 (Tags, 逗号分隔)</label>
            <input type="text" name="tags" placeholder="e.g. 顺势, 震荡, 新闻发布" value={formData.tags} onChange={handleChange} />
          </div>
        </div>
        <div className={styles.field}>
          <label>复盘笔记 (Notes)</label>
          <textarea name="notes" rows={4} value={formData.notes} onChange={handleChange}></textarea>
        </div>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? '保存中...' : '保存交易记录'}
      </button>
    </form>
  );
}
