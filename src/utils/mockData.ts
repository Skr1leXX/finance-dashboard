import { Transaction } from '../types';

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: crypto.randomUUID(), type: 'income', amount: 85000, category: 'Зарплата', date: daysAgo(28), note: 'Зарплата за месяц' },
  { id: crypto.randomUUID(), type: 'expense', amount: 32000, category: 'Жильё', date: daysAgo(27), note: 'Аренда' },
  { id: crypto.randomUUID(), type: 'expense', amount: 4200, category: 'Еда', date: daysAgo(25), note: 'Продукты' },
  { id: crypto.randomUUID(), type: 'expense', amount: 1500, category: 'Транспорт', date: daysAgo(24), note: 'Проездной' },
  { id: crypto.randomUUID(), type: 'expense', amount: 3800, category: 'Развлечения', date: daysAgo(20), note: 'Кино и кафе' },
  { id: crypto.randomUUID(), type: 'expense', amount: 2900, category: 'Еда', date: daysAgo(18), note: 'Продукты' },
  { id: crypto.randomUUID(), type: 'expense', amount: 6500, category: 'Одежда', date: daysAgo(15), note: 'Кроссовки' },
  { id: crypto.randomUUID(), type: 'expense', amount: 1200, category: 'Транспорт', date: daysAgo(12), note: 'Такси' },
  { id: crypto.randomUUID(), type: 'expense', amount: 5400, category: 'Здоровье', date: daysAgo(10), note: 'Стоматолог' },
  { id: crypto.randomUUID(), type: 'expense', amount: 3100, category: 'Еда', date: daysAgo(7), note: 'Продукты' },
  { id: crypto.randomUUID(), type: 'expense', amount: 4700, category: 'Развлечения', date: daysAgo(5), note: 'Концерт' },
  { id: crypto.randomUUID(), type: 'expense', amount: 2200, category: 'Транспорт', date: daysAgo(3), note: 'Бензин' },
  { id: crypto.randomUUID(), type: 'expense', amount: 1800, category: 'Еда', date: daysAgo(1), note: 'Кафе' },
];
