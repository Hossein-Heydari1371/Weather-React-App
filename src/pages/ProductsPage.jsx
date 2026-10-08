import { useEffect, useState } from 'react';
import { PRODUCTS, CATEGORIES, categoryName } from '../data/products';
import { Lotus } from '../components/Icons';

export default function ProductsPage({ query }) {
  const catFromUrl = query.get('cat');
  const [cat, setCat] = useState(catFromUrl || 'all');

  // keep in sync when the hash changes (e.g. via the navbar dropdown)
  useEffect(() => {
    setCat(catFromUrl || 'all');
  }, [catFromUrl]);

  const pick = (id) => {
    setCat(id);
    window.location.hash = id === 'all' ? '#/products' : `#/products?cat=${id}`;
  };

  const items = cat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  return (
    <div className="page">
      <div className="page-inner">
        <h1 className="page-title">گالری محصولات</h1>
        <p className="page-sub">مجموعهٔ نیلگون گالری — هر قطعه با جزئیاتِ شناسنامه‌شده</p>

        <div className="chips" role="tablist" aria-label="دسته‌بندی محصولات">
          <button type="button" className={`chip ${cat === 'all' ? 'active' : ''}`} onClick={() => pick('all')}>
            همه محصولات
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`chip ${cat === c.id ? 'active' : ''}`}
              onClick={() => pick(c.id)}
            >
              {c.nameFa}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {items.map((p) => (
            <article key={p.id} className={`p-card ${p.pendingImages ? 'pending' : ''}`}>
              <div className="p-media">
                {p.frontImage ? (
                  <img src={p.frontImage} alt={p.nameFa} loading="lazy" />
                ) : (
                  <span className="p-placeholder">
                    <Lotus size={34} />
                    <b>به‌زودی</b>
                  </span>
                )}
              </div>
              <div className="p-body">
                <h3>{p.nameFa || 'محصول جدید به‌زودی'}</h3>
                <div className="p-meta">
                  <span className="p-cat">{categoryName(p.category)}</span>
                  {p.pendingImages
                    ? <span className="p-soon">تصاویر به‌زودی</span>
                    : <span className="p-price">استعلام قیمت</span>}
                </div>
              </div>
            </article>
          ))}

          {items.length === 0 && <p className="page-sub">محصولی در این دسته ثبت نشده است.</p>}
        </div>
      </div>
    </div>
  );
}
