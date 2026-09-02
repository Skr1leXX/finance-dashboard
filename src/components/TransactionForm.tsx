import { useState, FormEvent } from 'react';
import { CATEGORIES, Category, TransactionType } from '../types';
import { useToast } from '../utils/toast';

interface Props {
  onAdd: (t: { type: TransactionType; amount: number; category: Category; date: string; note: string }) => void;
}

export default function TransactionForm({ onAdd }: Props) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Еда');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState('');
  const showToast = useToast();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      showToast('Укажи корректную сумму', 'error');
      return;
    }
    onAdd({ type, amount: parsedAmount, category, date, note });
    setAmount('');
    setNote('');
    showToast('Транзакция добавлена');
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="type-toggle">
          <button
            type="button"
            className={type === 'expense' ? 'active expense' : ''}
            onClick={() => setType('expense')}
          >
            Расход
          </button>
          <button
            type="button"
            className={type === 'income' ? 'active income' : ''}
            onClick={() => setType('income')}
          >
            Доход
          </button>
        </div>
        <input
          type="number"
          placeholder="Сумма"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.01"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="form-row">
        <input
          type="text"
          placeholder="Заметка (необязательно)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="note-input"
        />
        <button type="submit" className="add-btn">+ Добавить</button>
      </div>
    </form>
  );
}
