import { useEffect, useState } from 'react';
import { PRODUCTS, categoryName } from '../data/products';
import './SearchOverlay.css';

export default function SearchOverlay({ onClose }) {
  const [q, setQ] = useState('');
  const query = q.trim();

  const results = query
    ? PRODUCTS.filter(
        (p) =>
          (p.nameFa && p.nameFa.includes(query)) ||
          categoryName(p.category).includes(query) ||
          (p.nameEn && p.nameEn.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  // Escape closes the overlay
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="overlay search-overlay" onClick={onClose}>
      <div className="panel search-panel" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="جستجوی محصولات">
        <div className="search-row">
          <input
            className="panel-input"
            type="search"
            placeholder="نام محصول یا دسته‌بندی ..."
            value={q}
            autoFocus
            onChange={(e) => setQ(e.target.value)}
            aria-label="جستجو"
          />
        </div>

        {query && (
          <div className="search-results">
            {results.length === 0 && <p className="search-empty">نتیجه‌ای یافت نشد.</p>}
            {results.map((p) => (
              <a key={p.id} href="#/products" onClick={onClose} className="search-result">
                <span className="sr-thumb">
                  {p.frontImage ? <img src={p.frontImage} alt="" loading="lazy" /> : null}
                </span>
                <span className="sr-name">{p.nameFa || 'به‌زودی'}</span>
                <span className="sr-cat">{categoryName(p.category)}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
