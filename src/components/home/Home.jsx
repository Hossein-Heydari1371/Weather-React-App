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
  const [phase, setPhase] = useState('settle'); // 'settle' | 'details' (clasp loupe)
  const stageRef = useRef(null);
  const lockRef = useRef(false);      // transition in progress
  const accRef = useRef(0);           // wheel accumulator (inertia)
  const manualRef = useRef(0);        // timestamp of last manual interaction
  const dragRef = useRef({ down: false, x: 0, dx: 0, moved: 0 });

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

  // ---- Smooth drag (mouse + touch) with live stage resistance,
  //      plus subtle pointer parallax while hovering ----
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onDown = (e) => {
      if (dragRef.current.down) return;
      dragRef.current = { down: true, x: e.clientX, dx: 0, moved: 0 };
      el.classList.add('dragging');
    };

    const onMove = (e) => {
      const d = dragRef.current;
      if (!d.down) {
        // cinematic camera parallax (no re-render, pure CSS var)
        const rect = el.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        el.style.setProperty('--px', nx.toFixed(3));
        el.style.setProperty('--py', ny.toFixed(3));
        return;
      }
      d.dx = e.clientX - d.x;
      d.moved = Math.max(d.moved, Math.abs(d.dx));
      el.style.setProperty('--drag', `${(d.dx * 0.12).toFixed(1)}px`);
    };

    const onUp = () => {
      const d = dragRef.current;
      if (!d.down) return;
      d.down = false;
      el.classList.remove('dragging');
      el.style.setProperty('--drag', '0px');
      if (Math.abs(d.dx) > 60) {
        markManual();
        go(d.dx < 0 ? 1 : -1); // swipe left = next (RTL flow)
      }
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    window.addEventListener('pointerup', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      window.removeEventListener('pointerup', onUp);
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

  // ---- Cinematic focus sequence per active product:
  //      settle → zoom on the real clasp/hardware → back to full view.
  //      Only products with real photos get the details moment. ----
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !FEATURED_PRODUCTS[active].frontImage) {
      setPhase('settle');
      return;
    }
    setPhase('settle');
    const t1 = setTimeout(() => setPhase('details'), 2600);
    const t2 = setTimeout(() => setPhase('settle'), 7400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active]);

  // ---- Gentle auto-advance for the infinite presentation loop ----
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

  // ignore card clicks that were really drags
  const handleSelect = useCallback((i) => {
    if (dragRef.current.moved > 8) return;
    markManual();
    goTo(i);
  }, [goTo, markManual]);

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
        phase={phase}
        onSelect={handleSelect}
      />

      <HomeControls
        count={N}
        active={active}
        onPrev={() => { markManual(); go(-1); }}
        onNext={() => { markManual(); go(1); }}
        onDot={(i) => { markManual(); goTo(i); }}
      />
    </section>
  );
}
