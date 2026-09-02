import { useState } from 'react';
import { Filters } from './types';
import { useTransactions, useFilteredTransactions } from './utils/useTransactions';
import { ToastProvider } from './utils/toast';
import SummaryCards from './components/SummaryCards';
import FiltersPanel from './components/FiltersPanel';
import CategoryPieChart from './components/CategoryPieChart';
import SpendingLineChart from './components/SpendingLineChart';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import AIInsights from './components/AIInsights';
import './index.css';

const DEFAULT_FILTERS: Filters = { from: null, to: null, category: 'all', type: 'all' };

function Dashboard() {
  const { transactions, add, remove } = useTransactions();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const filtered = useFilteredTransactions(transactions, filters);

  return (
    <div className="app">
      <header className="app-header">
        <h1>💰 Finance Dashboard</h1>
      </header>

      <main className="main">
        <SummaryCards transactions={filtered} />
        <FiltersPanel filters={filters} onChange={setFilters} />

        <div className="charts-grid">
          <div className="chart-card">
            <h3>По категориям</h3>
            <CategoryPieChart transactions={filtered} />
          </div>
          <div className="chart-card">
            <h3>Динамика расходов</h3>
            <SpendingLineChart transactions={filtered} />
          </div>
        </div>

        <AIInsights transactions={filtered} />

        <section className="add-section">
          <h3>Добавить транзакцию</h3>
          <TransactionForm onAdd={add} />
        </section>

        <section className="list-section">
          <h3>Транзакции ({filtered.length})</h3>
          <TransactionList transactions={filtered} onRemove={remove} />
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Dashboard />
    </ToastProvider>
  );
}
