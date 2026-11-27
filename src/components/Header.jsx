import './Header.css';

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'pantry', label: 'My Pantry' },
];

export default function Header({ page, onNavigate }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <span aria-hidden="true">🥬</span> FreshKeep
        </div>

        <nav className="header-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`header-tab ${page === tab.id ? 'header-tab--active' : ''}`}
              onClick={() => onNavigate(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
