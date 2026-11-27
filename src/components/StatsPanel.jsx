import './StatsPanel.css';

export default function StatsPanel({ stats }) {
  const cards = [
    { key: 'total', label: 'Total items', value: stats.total },
    { key: 'fresh', label: 'Fresh', value: stats.fresh },
    { key: 'soon', label: 'Expiring soon', value: stats.soon },
    { key: 'expired', label: 'Expired', value: stats.expired },
  ];

  return (
    <section className="stats">
      {cards.map((card) => (
        <div key={card.key} className={`stat-card stat-card--${card.key}`}>
          <span className="stat-value">{card.value}</span>
          <span className="stat-label">{card.label}</span>
        </div>
      ))}
    </section>
  );
}
