import { useEffect, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Lotus } from './Icons';
import './Loader.css';

// Premium loading screen: brand mark, thin gold progress bar,
// graceful fade-out. Essential assets load first with a hard
// cap so the visitor never waits forever.
export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      document.body.classList.add('app-loaded');
      setHidden(true);
    };

    const images = PRODUCTS.filter((p) => p.frontImage).map((p) => p.frontImage);
    const load = (src) =>
      new Promise((res) => {
        const im = new Image();
        im.onload = im.onerror = res;
        im.src = src;
      });

    const minDelay = new Promise((r) => setTimeout(r, 1100));
    const maxDelay = new Promise((r) => setTimeout(r, 4500));

    Promise.race([Promise.all([...images.map(load), minDelay]), maxDelay]).then(finish);
    return () => { done = true; };
  }, []);

  return (
    <div className={`loader ${hidden ? 'loader-hide' : ''}`} aria-hidden={hidden || undefined} role="status" aria-label="در حال بارگذاری گالری">
      <Lotus size={44} className="loader-logo" />
      <div className="loader-brand">نیلگون گالری</div>
      <div className="loader-bar">
        <span className="loader-fill" />
      </div>
      <div className="loader-hint">در حال آماده‌سازی گالری ...</div>
    </div>
  );
}
