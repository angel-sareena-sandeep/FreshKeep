// Shared helpers used by every contributor. Do not change function names
// without telling the team.

export const CATEGORIES = [
  'Dairy',
  'Vegetables',
  'Fruits',
  'Meat & Fish',
  'Grains',
  'Snacks',
  'Other',
];

export const STATUS_LABELS = {
  fresh: 'Fresh',
  soon: 'Expiring soon',
  expired: 'Expired',
};

// Days from today until the date (negative = already past).
// dateString format: "YYYY-MM-DD"
export function daysUntil(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [year, month, day] = dateString.split('-').map(Number);
  const target = new Date(year, month - 1, day);
  return Math.round((target - today) / 86400000);
}

// Returns 'fresh' | 'soon' | 'expired'
export function getStatus(dateString) {
  const days = daysUntil(dateString);
  if (days < 0) return 'expired';
  if (days <= 3) return 'soon';
  return 'fresh';
}

// Human friendly text such as "Expires today" or "3 days left"
export function describeDays(dateString) {
  const days = daysUntil(dateString);
  if (days < 0) return `Expired ${Math.abs(days)} day${days === -1 ? '' : 's'} ago`;
  if (days === 0) return 'Expires today';
  if (days === 1) return 'Expires tomorrow';
  return `${days} days left`;
}
