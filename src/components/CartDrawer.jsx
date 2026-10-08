import { useEffect } from 'react';
import { Bag } from './Icons';
import './CartDrawer.css';

export default function CartDrawer({ count, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="overlay cart-overlay" onClick={onClose}>
      <aside className="cart-drawer" role="dialog" aria-label="سبد خرید" onClick={(e) => e.stopPropagation()}>
        <header className="cart-head">
          <h2>سبد خرید</h2>
          <button type="button" className="icon-btn" aria-label="بستن سبد خرید" onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="cart-body">
          {count === 0 ? (
            <div className="cart-empty">
              <Bag size={44} />
              <p>سبد خرید شما خالی است.</p>
              <span>پس از راه‌اندازی فروشگاه آنلاین، خرید از همین بخش انجام می‌شود.</span>
              <a className="btn-ghost" href="#/products" onClick={onClose}>مشاهده محصولات</a>
            </div>
          ) : (
            <p className="cart-count">{count} محصول در سبد شما</p>
          )}
        </div>
      </aside>
    </div>
  );
}
