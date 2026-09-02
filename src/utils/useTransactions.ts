import { useCallback, useEffect, useMemo, useState } from 'react';
import { Transaction, Filters } from '../types';
import { MOCK_TRANSACTIONS } from './mockData';

const STORAGE_KEY = 'finance-dashboard:transactions';

function loadInitial(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // повреждённые данные в localStorage — начинаем с демо-набора
  }
  return MOCK_TRANSACTIONS;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const add = useCallback((t: Omit<Transaction, 'id'>) => {
    setTransactions((prev) => [{ ...t, id: crypto.randomUUID() }, ...prev]);
  }, []);

  const remove = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { transactions, add, remove };
}

export function useFilteredTransactions(transactions: Transaction[], filters: Filters) {
  return useMemo(() => {
    return transactions.filter((t) => {
      if (filters.from && t.date < filters.from) return false;
      if (filters.to && t.date > filters.to) return false;
      if (filters.category !== 'all' && t.category !== filters.category) return false;
      if (filters.type !== 'all' && t.type !== filters.type) return false;
      return true;
    });
  }, [transactions, filters]);
}
