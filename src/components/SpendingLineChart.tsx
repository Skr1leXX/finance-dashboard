import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

export default function SpendingLineChart({ transactions }: Props) {
  const byDate = new Map<string, number>();
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => byDate.set(t.date, (byDate.get(t.date) || 0) + t.amount));

  const data = Array.from(byDate.entries())
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (data.length === 0) {
    return <div className="chart-empty">Нет данных для графика</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
        <XAxis
          dataKey="date"
          tick={{ fill: '#a7a7a7', fontSize: 11 }}
          tickFormatter={(d: string) => d.slice(5)}
        />
        <YAxis tick={{ fill: '#a7a7a7', fontSize: 11 }} />
        <Tooltip formatter={(value: number) => `${value.toLocaleString('ru-RU')} ₽`} />
        <Line type="monotone" dataKey="amount" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
