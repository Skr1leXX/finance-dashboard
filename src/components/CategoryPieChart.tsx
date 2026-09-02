import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#a855f7', '#06b6d4', '#ec4899', '#84cc16', '#64748b'];

export default function CategoryPieChart({ transactions }: Props) {
  const byCategory = new Map<string, number>();
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => byCategory.set(t.category, (byCategory.get(t.category) || 0) + t.amount));

  const data = Array.from(byCategory.entries()).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return <div className="chart-empty">Нет расходов за выбранный период</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `${value.toLocaleString('ru-RU')} ₽`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
