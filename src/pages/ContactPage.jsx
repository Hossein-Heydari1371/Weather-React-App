import { useState } from 'react';
import { toast } from '../utils/toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', contact: '', message: '' });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || !form.message.trim()) return;
    toast('پیام شما ثبت شد؛ پس از راه‌اندازی فروشگاه، همکاران ما با شما تماس می‌گیرند.');
    setForm({ name: '', contact: '', message: '' });
  };

  return (
    <div className="page">
      <div className="page-inner contact-inner">
        <h1 className="page-title">تماس با ما</h1>
        <p className="page-sub">برای سفارش، سؤال یا همکاری، پیام خود را برای ما بنویسید.</p>

        <form className="panel contact-form" onSubmit={submit}>
          <label className="cf-label" htmlFor="cf-name">نام و نام خانوادگی</label>
          <input id="cf-name" className="panel-input" type="text" value={form.name} onChange={set('name')} placeholder="نام شما" required />

          <label className="cf-label" htmlFor="cf-contact">موبایل یا ایمیل</label>
          <input id="cf-contact" className="panel-input" type="text" value={form.contact} onChange={set('contact')} placeholder="چگونه با شما تماس بگیریم؟" required />

          <label className="cf-label" htmlFor="cf-message">پیام شما</label>
          <textarea id="cf-message" className="panel-input" rows="5" value={form.message} onChange={set('message')} placeholder="پیام ..." required />

          <button type="submit" className="btn-gold">ارسال پیام</button>
        </form>

        <p className="contact-note">
          اطلاعات تکمیلی تماس (تلفن، نشانی و شبکه‌های اجتماعی) به‌زودی در همین صفحه منتشر می‌شود.
        </p>
      </div>
    </div>
  );
}
