// The cinematic showroom environment: sunset sky, grand arch,
// marble floor, floating petals and vignette.
// Pure CSS layers (no WebGL) so it stays fast on every device
// and degrades gracefully.
import './Environment.css';

const PETALS = [1, 2, 3, 4, 5, 6, 7];

export default function Environment() {
  return (
    <div className="env" aria-hidden="true">
      {/* Grand arch opening onto the sunset */}
      <div className="arch-opening">
        <div className="arch-mountains">
          <span className="m1" />
          <span className="m2" />
        </div>
        <div className="arch-cloud c1" />
        <div className="arch-cloud c2" />
        <div className="arch-sun" />
        <div className="arch-horizon" />
      </div>

      {/* Polished marble floor */}
      <div className="floor-line" />
      <div className="env-floor" />

      {/* Soft volumetric light falling from the arch to the pedestal */}
      <div className="light-shaft" />

      {/* Golden bokeh orbs — cinematic depth haze */}
      <div className="env-bokeh">
        <span className="bk b1" />
        <span className="bk b2" />
        <span className="bk b3" />
        <span className="bk b4" />
      </div>

      {/* Floating petals — sparingly */}
      <div className="env-petals">
        {PETALS.map((n) => <span key={n} className={`petal p${n}`} />)}
      </div>

      <div className="env-topfade" />
      <div className="env-vignette" />
    </div>
  );
}
