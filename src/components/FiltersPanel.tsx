import { Filters, CATEGORIES } from '../types';

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function FiltersPanel({ filters, onChange }: Props) {
  return (
    <div className="filters-panel">
      <div className="filter-group">
        <label>С даты</label>
        <input
          type="date"
          value={filters.from || ''}
          onChange={(e) => onChange({ ...filters, from: e.target.value || null })}
        />
      </div>
      <div className="filter-group">
        <label>По дату</label>
        <input
          type="date"
          value={filters.to || ''}
          onChange={(e) => onChange({ ...filters, to: e.target.value || null })}
        />
      </div>
      <div className="filter-group">
        <label>Категория</label>
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value as Filters['category'] })}
        >
          <option value="all">Все</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Тип</label>
        <select
          value={filters.type}
          onChange={(e) => onChange({ ...filters, type: e.target.value as Filters['type'] })}
        >
          <option value="all">Все</option>
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>
      </div>
      {(filters.from || filters.to || filters.category !== 'all' || filters.type !== 'all') && (
        <button
          className="filters-reset"
          onClick={() => onChange({ from: null, to: null, category: 'all', type: 'all' })}
        >
          Сбросить
        </button>
      )}
    </div>
  );
}
