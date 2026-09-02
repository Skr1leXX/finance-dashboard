import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

function formatMoney(n: number): string {
  return n.toLocaleString('ru-RU') + ' ₽';
}

export default function SummaryCards({ transactions }: Props) {
  const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <span className="summary-label">Баланс</span>
        <span className={`summary-value ${balance >= 0 ? 'positive' : 'negative'}`}>
          {formatMoney(balance)}
        </span>
      </div>
      <div className="summary-card">
        <span className="summary-label">Доходы</span>
        <span className="summary-value positive">{formatMoney(income)}</span>
      </div>
      <div className="summary-card">
        <span className="summary-label">Расходы</span>
        <span className="summary-value negative">{formatMoney(expense)}</span>
      </div>
      <div className="summary-card">
        <span className="summary-label">Транзакций</span>
        <span className="summary-value">{transactions.length}</span>
      </div>
    </div>
  );
}
