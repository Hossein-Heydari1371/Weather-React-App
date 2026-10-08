import { useEffect, useState } from 'react';
import { toast } from '../utils/toast';
import './AccountModal.css';

export default function AccountModal({ onClose }) {
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const submit = (e) => {
    e.preventDefault();
    if (!id.trim() || !pass) return;
    toast('ورود و ثبت‌نام پس از راه‌اندازی فروشگاه آنلاین فعال می‌شود.');
    setId('');
    setPass('');
    onClose();
  };

  return (
    <div className="overlay account-overlay" onClick={onClose}>
      <div className="panel account-panel" role="dialog" aria-label="ورود یا ثبت‌نام" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="icon-btn account-close" aria-label="بستن" onClick={onClose}>✕</button>
        <h2 className="panel-title">ورود | ثبت‌نام</h2>
        <p className="account-sub">برای پیگیری سفارش‌ها و ذخیرهٔ علاقه‌مندی‌ها وارد شوید.</p>
        <form onSubmit={submit} className="account-form">
          <input
            className="panel-input"
            type="text"
            placeholder="موبایل یا ایمیل"
            value={id}
            onChange={(e) => setId(e.target.value)}
            aria-label="موبایل یا ایمیل"
          />
          <input
            className="panel-input"
            type="password"
            placeholder="رمز عبور"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            aria-label="رمز عبور"
          />
          <button type="submit" className="btn-gold">ورود</button>
        </form>
        <p className="account-note">این بخش پس از اتصال به فروشگاه آنلاین فعال خواهد شد.</p>
      </div>
    </div>
  );
}
