import ItemCard from './ItemCard';
import './ItemList.css';

export default function ItemList({ items, onDelete, emptyMessage }) {
  if (items.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}
