import { CATEGORIES } from '../utils/expiry';
import './FilterBar.css';

export default function FilterBar({
  search,
  onSearch,
  category,
  onCategory,
  status,
  onStatus,
}) {
  return (
    <div className="filter-bar">
      <input
        type="search"
        placeholder="Search food..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <select value={category} onChange={(e) => onCategory(e.target.value)}>
        <option value="All">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select value={status} onChange={(e) => onStatus(e.target.value)}>
        <option value="all">All statuses</option>
        <option value="fresh">Fresh</option>
        <option value="soon">Expiring soon</option>
        <option value="expired">Expired</option>
      </select>
    </div>
  );
}
