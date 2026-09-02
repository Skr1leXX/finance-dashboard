export type TransactionType = 'income' | 'expense';

export const CATEGORIES = [
  'Еда',
  'Транспорт',
  'Жильё',
  'Развлечения',
  'Здоровье',
  'Одежда',
  'Образование',
  'Зарплата',
  'Другое',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  date: string; // YYYY-MM-DD
  note: string;
}

export interface Filters {
  from: string | null;
  to: string | null;
  category: Category | 'all';
  type: TransactionType | 'all';
}
