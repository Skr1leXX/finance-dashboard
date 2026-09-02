import { Transaction } from '../types';
import { useToast } from '../utils/toast';

interface Props {
  transactions: Transaction[];
  onRemove: (id: string) => void;
}

export default function TransactionList({ transactions, onRemove }: Props) {
  const showToast = useToast();

  if (transactions.length === 0) {
    return <div className="chart-empty">Нет транзакций за выбранный период</div>;
  }

  return (
    <div className="transaction-list">
      {transactions.map((t) => (
        <div key={t.id} className="transaction-row">
          <span className={`transaction-dot ${t.type}`} />
          <div className="transaction-main">
            <div className="transaction-category">{t.category}</div>
            {t.note && <div className="transaction-note">{t.note}</div>}
          </div>
          <div className="transaction-date">{t.date}</div>
          <div className={`transaction-amount ${t.type}`}>
            {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString('ru-RU')} ₽
          </div>
          <button
            className="transaction-delete"
            onClick={() => {
              onRemove(t.id);
              showToast('Транзакция удалена');
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
