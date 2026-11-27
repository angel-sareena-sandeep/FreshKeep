import { useMemo, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { getStatus } from './utils/expiry';
import Header from './components/Header';
import StatsPanel from './components/StatsPanel';
import AddItemForm from './components/AddItemForm';
import FilterBar from './components/FilterBar';
import ItemList from './components/ItemList';
import './App.css';

export default function App() {
  const [items, setItems] = useLocalStorage('freshkeep-items', []);
  const [page, setPage] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('all');

  const addItem = (data) => {
    const newItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      ...data,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Soonest expiry first
  const sorted = useMemo(
    () => [...items].sort((a, b) => a.expiryDate.localeCompare(b.expiryDate)),
    [items]
  );

  const stats = useMemo(() => {
    const result = { total: items.length, fresh: 0, soon: 0, expired: 0 };
    items.forEach((item) => {
      result[getStatus(item.expiryDate)] += 1;
    });
    return result;
  }, [items]);

  const useFirst = sorted.filter((item) => getStatus(item.expiryDate) !== 'fresh');

  const filtered = sorted.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchesCategory = category === 'All' || item.category === category;
    const matchesStatus = status === 'all' || getStatus(item.expiryDate) === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="app">
      <Header page={page} onNavigate={setPage} />

      <main className="container">
        {page === 'dashboard' ? (
          <>
            <h1 className="page-title">Your kitchen at a glance</h1>
            <StatsPanel stats={stats} />
            <div className="dashboard-grid">
              <AddItemForm onAdd={addItem} />
              <section>
                <h2 className="section-title">Use these first</h2>
                <ItemList
                  items={useFirst}
                  onDelete={deleteItem}
                  emptyMessage="Nothing is close to expiring. Nice work!"
                />
              </section>
            </div>
          </>
        ) : (
          <>
            <h1 className="page-title">My Pantry</h1>
            <FilterBar
              search={search}
              onSearch={setSearch}
              category={category}
              onCategory={setCategory}
              status={status}
              onStatus={setStatus}
            />
            <ItemList
              items={filtered}
              onDelete={deleteItem}
              emptyMessage="No items found. Add some from the Dashboard!"
            />
          </>
        )}
      </main>
    </div>
  );
}
