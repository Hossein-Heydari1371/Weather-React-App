import { useCallback, useEffect, useRef, useState } from 'react';
import Environment from './Environment';
import Carousel from './Carousel';
import ProductInfo from './ProductInfo';
import HomeControls from './HomeControls';
import { FEATURED_PRODUCTS } from '../../data/products';
import './Home.css';

const N = FEATURED_PRODUCTS.length;

export default function Home() {
  const [active, setActive] = useState(0);
  const stageRef = useRef(null);
  const lockRef = useRef(false);      // transition in progress
  const accRef = useRef(0);           // wheel accumulator (inertia)
  const manualRef = useRef(0);        // timestamp of last manual interaction

  const go = useCallback((dir) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setActive((a) => (a + dir + N) % N);
    setTimeout(() => { lockRef.current = false; }, 900);
  }, []);

  const goTo = useCallback((index) => {
    if (lockRef.current || index === active) return;
    lockRef.current = true;
    setActive(index);
    setTimeout(() => { lockRef.current = false; }, 900);
  }, [active]);

  const markManual = useCallback(() => { manualRef.current = Date.now(); }, []);

  // ---- Lock page scroll while the immersive home is mounted ----
  useEffect(() => {
    document.body.classList.add('home-locked');
    return () => document.body.classList.remove('home-locked');
  }, []);

  // ---- Mouse wheel / trackpad drives the carousel ----
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      markManual();
      if (lockRef.current) { accRef.current = 0; return; }
      const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      accRef.current += d;
      if (accRef.current > 110) { accRef.current = 0; go(1); }
      else if (accRef.current < -110) { accRef.current = 0; go(-1); }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [go, markManual]);

  // ---- Touch swipe (left = next, right = previous) ----
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let sx = 0, sy = 0, tracking = false;
    const onStart = (e) => {
      const t = e.touches[0];
      sx = t.clientX; sy = t.clientY; tracking = true;
    };
    const onMove = (e) => { if (tracking) e.preventDefault(); };
    const onEnd = (e) => {
      if (!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
        markManual();
        go(dx < 0 ? 1 : -1);
      }
    };
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: false });
    el.addEventListener('touchend', onEnd);
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onEnd);
    };
  }, [go, markManual]);

  // ---- Keyboard arrows (RTL: left = next, right = previous) ----
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft') { markManual(); go(1); }
      else if (e.key === 'ArrowRight') { markManual(); go(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, markManual]);

  // ---- Gentle auto-advance for the cinematic presentation loop ----
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const timer = setInterval(() => {
      if (document.hidden) return;
      if (Date.now() - manualRef.current < 8000) return;
      go(1);
    }, 9500);
    return () => clearInterval(timer);
  }, [go]);

  const handlePrev = () => { markManual(); go(-1); };
  const handleNext = () => { markManual(); go(1); };
  const handleDot = (i) => { markManual(); goTo(i); };

  return (
    <section className="home" ref={stageRef} aria-roledescription="گالری چرخشی محصولات" aria-label="نمایشگاه محصولات">
      <Environment />

      <header className="hero-copy">
        <h1>زیبایی در جزئیات است&nbsp;...</h1>
        <div className="gold-divider" aria-hidden="true" />
        <p className="hero-sub">مجموعه‌ای از خاص‌ترین کیف‌های زنانه</p>
        <ProductInfo product={FEATURED_PRODUCTS[active]} index={active} />
      </header>

      <Carousel
        items={FEATURED_PRODUCTS}
        active={active}
        onSelect={handleDot}
      />

      <HomeControls
        count={N}
        active={active}
        onPrev={handlePrev}
        onNext={handleNext}
        onDot={handleDot}
      />
    </section>
  );
}
