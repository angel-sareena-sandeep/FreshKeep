import { getStatus, describeDays, STATUS_LABELS } from '../utils/expiry';
import './ItemCard.css';

export default function ItemCard({ item, onDelete }) {
  const status = getStatus(item.expiryDate);

  return (
    <article className={`item-card item-card--${status}`}>
      <div className="item-card-top">
        <h3 className="item-card-name">{item.name}</h3>
        <span className={`badge badge--${status}`}>{STATUS_LABELS[status]}</span>
      </div>

      <p className="item-card-meta">
        <span className="chip">{item.category}</span>
        <span>Qty: {item.quantity}</span>
      </p>

      <p className="item-card-date">
        {describeDays(item.expiryDate)} ({item.expiryDate})
      </p>

      <button
        type="button"
        className="item-card-delete"
        onClick={() => onDelete(item.id)}
        aria-label={`Delete ${item.name}`}
      >
        Remove
      </button>
    </article>
  );
}
