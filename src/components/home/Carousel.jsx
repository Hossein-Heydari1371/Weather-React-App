import { Lotus } from '../Icons';
import './Carousel.css';

// 2.5D "ring" carousel — products orbit an ellipse in front of the
// camera. Each RingItem only receives an `offset` (distance from the
// active slot), so it can later be swapped for a real GLB/GLTF viewer
// (product.model3D) without touching the navigation logic.
const RING_STEP = (2 * Math.PI) / 10;

function RingItem({ product, index, offset, isActive, phase, onSelect }) {
  const detailsZoom = isActive && phase === 'details';

  // shortest signed distance around the ring (−5 … +5)
  const angle = offset * RING_STEP;
  const sin = Math.sin(angle);
  const depth = (1 - Math.cos(angle)) / 2; // 0 = front, 1 = back

  const baseScale = isActive ? 1.02 : 1 - depth * 0.52;
  const scale = baseScale * (detailsZoom ? 0.93 : 1); // make room for the loupe

  const style = {
    '--xf': sin.toFixed(4),                              // fraction of --ring-rx
    '--ty': `${(-depth * 15).toFixed(2)}vh`,             // back items sit slightly higher
    '--s': scale.toFixed(3),
    '--ry': `${(sin * 34).toFixed(1)}deg`,               // coverflow tilt toward center
    '--op': (isActive ? 1 : 1 - depth * 0.72).toFixed(3),
    '--bl': `${(depth * 4.5).toFixed(1)}px`,
    '--z': Math.round(200 - depth * 200),
  };

  return (
    <figure
      className={`ring-item ${isActive ? 'is-active' : ''} ${detailsZoom ? 'phase-details' : ''}`}
      style={style}
      aria-hidden={!isActive || undefined}
    >
      <button
        type="button"
        className="ring-card"
        style={{ pointerEvents: isActive ? 'none' : 'auto' }}
        onClick={() => onSelect(index)}
        aria-label={isActive ? undefined : `نمایش ${product.nameFa || 'محصول'}`}
        tabIndex={isActive ? -1 : 0}
      >
        {product.frontImage ? (
          <img src={product.frontImage} alt={product.nameFa || ''} draggable={false} />
        ) : (
          <span className="ring-placeholder">
            <Lotus size={30} />
            <b>به‌زودی</b>
          </span>
        )}
      </button>

      {product.frontImage && (
        <div className="ring-reflection" aria-hidden="true">
          <img src={product.frontImage} alt="" draggable={false} />
        </div>
      )}

      <div className="ring-glow" aria-hidden="true" />
    </figure>
  );
}

export default function Carousel({ items, active, phase, onSelect }) {
  const N = items.length;
  const offsets = items.map((_, i) => {
    let o = i - active;
    if (o > N / 2) o -= N;
    if (o < -N / 2) o += N;
    return o;
  });

  const hero = items[active];

  return (
    <div className="ring-stage" role="group" aria-label="چرخش محصولات">
      {/* Central marble pedestal with glowing base ring */}
      <div className="pedestal" aria-hidden="true">
        <div className="pedestal-top" />
        <div className="pedestal-ring" />
      </div>

      {items.map((product, i) => (
        <RingItem
          key={product.id}
          product={product}
          index={i}
          offset={offsets[i]}
          isActive={i === active}
          phase={phase}
          onSelect={onSelect}
        />
      ))}

      {/* Cinematic details moment: a jeweller's loupe zooming into
          the REAL product photo — clasp and hardware stay accurate. */}
      {phase === 'details' && hero?.frontImage && (
        <div className="focus-loupe" aria-hidden="true">
          <div
            className="loupe-glass"
            style={{ backgroundImage: `url(${hero.frontImage})` }}
          />
          <span className="loupe-label">قفل و جزئیات</span>
        </div>
      )}
    </div>
  );
}
