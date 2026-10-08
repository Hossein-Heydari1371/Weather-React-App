import { ChevronLeft, ChevronRight } from '../Icons';

// Prev/next arrows, pagination dots and the Persian scroll cue.
export default function HomeControls({ count, active, onPrev, onNext, onDot }) {
  return (
    <>
      {/* RTL: next is on the left, previous on the right */}
      <button type="button" className="arrow-btn arrow-next" onClick={onNext} aria-label="محصول بعدی">
        <ChevronLeft size={24} />
      </button>
      <button type="button" className="arrow-btn arrow-prev" onClick={onPrev} aria-label="محصول قبلی">
        <ChevronRight size={24} />
      </button>

      <div className="dots" role="tablist" aria-label="انتخاب محصول">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`محصول ${(i + 1).toLocaleString('fa-IR')}`}
            className={`dot ${i === active ? 'active' : ''}`}
            onClick={() => onDot(i)}
          />
        ))}
      </div>

      <button type="button" className="scroll-cue" onClick={onNext} aria-label="محصول بعدی">
        <span className="mouse-icon" aria-hidden="true" />
        <span>اسکرول کنید</span>
      </button>
    </>
  );
}
