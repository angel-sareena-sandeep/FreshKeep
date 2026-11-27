import { useState } from 'react';
import { CATEGORIES } from '../utils/expiry';
import './AddItemForm.css';

const EMPTY_FORM = {
  name: '',
  category: CATEGORIES[0],
  quantity: 1,
  expiryDate: '',
};

export default function AddItemForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setError('Please enter the food name.');
      return;
    }
    if (!form.expiryDate) {
      setError('Please choose an expiry date.');
      return;
    }
    if (Number(form.quantity) < 1) {
      setError('Quantity must be at least 1.');
      return;
    }

    onAdd({
      name: form.name.trim(),
      category: form.category,
      quantity: Number(form.quantity),
      expiryDate: form.expiryDate,
    });
    setForm(EMPTY_FORM);
    setError('');
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2 className="section-title">Add food item</h2>

      <label>
        Name *
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Greek yogurt"
        />
      </label>

      <label>
        Category
        <select name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <div className="add-form-row">
        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            min="1"
            value={form.quantity}
            onChange={handleChange}
          />
        </label>

        <label>
          Expiry date *
          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
          />
        </label>
      </div>

      {error && <p className="add-form-error">{error}</p>}

      <button type="submit" className="btn-primary">
        Add to pantry
      </button>
    </form>
  );
}

