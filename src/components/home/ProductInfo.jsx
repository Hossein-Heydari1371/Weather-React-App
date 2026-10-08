import { categoryName } from '../../data/products';

// Overlay for the active product — Persian name, category and a
// short editorial description. Only verified data is shown;
// pending products get an honest "coming soon" treatment.
export default function ProductInfo({ product, index }) {
  if (!product) return null;

  const pending = product.pendingImages;
  const chips = [
    product.exteriorMaterial && `جنس: ${product.exteriorMaterial}`,
    product.exteriorColor && `رنگ: ${product.exteriorColor}`,
    product.hardwareColor && `یراق: ${product.hardwareColor}`,
  ].filter(Boolean);

  return (
    <div className="product-info" key={index}>
      <span className="pi-cat">{categoryName(product.category)}</span>
      <h2>{product.nameFa || 'محصول جدید به‌زودی'}</h2>
      <p className="pi-desc">
        {pending
          ? 'محصولات جدید این دسته به‌زودی به گالری اضافه می‌شوند.'
          : product.shortDescriptionFa}
      </p>
      {chips.length > 0 && (
        <div className="pi-chips">
          {chips.map((c) => <span key={c} className="pi-chip">{c}</span>)}
        </div>
      )}
    </div>
  );
}
