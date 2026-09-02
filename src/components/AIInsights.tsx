import { useState } from 'react';
import { Transaction } from '../types';
import { useToast } from '../utils/toast';

interface Props {
  transactions: Transaction[];
}

type Status = 'idle' | 'loading' | 'error';

export default function AIInsights({ transactions }: Props) {
  const [insight, setInsight] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const showToast = useToast();

  async function fetchInsight() {
    if (transactions.length === 0) {
      showToast('Нет данных для анализа', 'error');
      return;
    }

    setStatus('loading');
    try {
      const byCategory: Record<string, number> = {};
      transactions
        .filter((t) => t.type === 'expense')
        .forEach((t) => {
          byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
        });

      const res = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ byCategory }),
      });

      if (!res.ok) {
        throw new Error(`Ошибка сервера: ${res.status}`);
      }

      const data = await res.json();
      setInsight(data.insight);
      setStatus('idle');
    } catch (err) {
      console.error(err);
      setStatus('error');
      showToast('Не удалось получить AI-инсайт', 'error');
    }
  }

  return (
    <div className="ai-insights">
      <div className="ai-insights-header">
        <h3>🤖 AI-инсайт по тратам</h3>
        <button onClick={fetchInsight} disabled={status === 'loading'}>
          {status === 'loading' ? 'Анализирую...' : 'Получить инсайт'}
        </button>
      </div>

      {status === 'error' && (
        <p className="ai-insights-error">Не удалось получить анализ. Попробуй ещё раз.</p>
      )}

      {insight && status !== 'error' && <p className="ai-insights-text">{insight}</p>}

      {!insight && status === 'idle' && (
        <p className="ai-insights-placeholder">
          Нажми кнопку, чтобы AI проанализировал твои траты и дал рекомендацию
        </p>
      )}
    </div>
  );
}
