import { useState } from 'react';

const categories = ['celebration', 'thank you', 'inspiration'];

export default function CreateKudosBoardForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    author: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.category) newErrors.category = 'Category is required';
    // image and author optional
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Stub API call - replace with real API logic
    console.log('Submitting form:', form);
    if (onSubmit) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <div>
        <label>
          Title*:
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            type="text"
          />
          {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}
        </label>
      </div>

      <div>
        <label>
          Description*:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && <div style={{ color: 'red' }}>{errors.description}</div>}
        </label>
      </div>

      <div>
        <label>
          Category*:
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <div style={{ color: 'red' }}>{errors.category}</div>}
        </label>
      </div>

      <div>
        <label>
          Image URL:
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            type="url"
            placeholder="https://example.com/image.jpg"
          />
        </label>
      </div>

      <div>
        <label>
          Author:
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            type="text"
            placeholder="Optional"
          />
        </label>
      </div>

      <div style={{ marginTop: 12 }}>
        <button type="submit">Create Board</button>{' '}
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
