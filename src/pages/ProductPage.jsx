import { useEffect, useState } from 'react'
import { Link, useRouter } from '../router/Router'
import ProductGallery from '../components/product/ProductGallery'
import QuantityStepper from '../components/commerce/QuantityStepper'
import RelatedProducts from '../components/product/RelatedProducts'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Price from '../components/ui/Price'
import Loader from '../components/ui/Loader'
import NotFoundPage from './NotFoundPage'
import { ProductService } from '../services/ProductService'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'
import { useUi } from '../store/ui'
import { useSeo } from '../hooks/useSeo'
import { site } from '../data/site'
import { discountPercent, toPersianDigits } from '../utils/format'

/** ProductPage — reference image 2: large gallery + premium product detail. */
export default function ProductPage({ slug }) {
  const { navigate } = useRouter()
  const { addItem } = useCart()
  const wishlist = useWishlist()
  const ui = useUi()

  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('loading')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    let active = true
    setStatus('loading')
    ProductService.getBySlug(slug).then((found) => {
      if (!active) return
      if (!found) {
        setStatus('missing')
        return
      }
      setProduct(found)
      setQuantity(1)
      setStatus('ready')
    })
    return () => {
      active = false
    }
  }, [slug])

  const soldOut = product ? product.available === false || product.stock === 0 : false
  const discount = product ? discountPercent(product.price, product.salePrice) : 0

  useSeo({
    title: product ? product.name : 'محصول',
    description: product ? product.shortDescription : undefined,
    canonical: product ? `/product/${product.slug}` : undefined,
    image: product ? product.thumbnail : undefined,
    type: 'product',
    jsonLd: product
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          sku: product.sku,
          image: product.images,
          brand: { '@type': 'Brand', name: site.name },
          offers: {
            '@type': 'Offer',
            price: product.salePrice ?? product.price,
            priceCurrency: 'IRR',
            availability: soldOut
              ? 'https://schema.org/OutOfStock'
              : 'https://schema.org/InStock',
          },
        }
      : undefined,
  })

  if (status === 'loading') {
    return (
      <div className="ng-section">
        <Loader count={2} />
      </div>
    )
  }

  if (status === 'missing' || !product) return <NotFoundPage />

  const liked = wishlist.has(product.id)

  const specs = [
    { label: 'جنس', value: product.material },
    { label: 'رنگ', value: product.color },
    { label: 'ابعاد', value: product.dimensions },
    { label: 'وزن', value: product.weight },
    { label: 'کد کالا (SKU)', value: product.sku },
  ]

  const addToCart = () => {
    if (soldOut) return
    addItem(product, quantity)
    ui.showToast(`«${product.name}» به سبد خرید اضافه شد.`)
  }

  const buyNow = () => {
    if (soldOut) return
    addItem(product, quantity)
    navigate('/checkout')
  }

  return (
    <>
      <nav className="ng-crumbs ng-crumbs--page" aria-label="مسیر صفحه">
        <Link to="/">خانه</Link>
        <span className="ng-crumbs__item">
          <Link to="/products">محصولات</Link>
        </span>
        <span className="ng-crumbs__item">
          <Link to={`/products?category=${product.categorySlug}`}>{product.category}</Link>
        </span>
        <span className="ng-crumbs__item">
          <span aria-current="page">{product.name}</span>
        </span>
      </nav>

      <div className="ng-pdp">
        <div className="ng-pdp__media">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        <div className="ng-pdp__info">
          <Link to={`/products?category=${product.categorySlug}`} className="ng-card__cat">
            {product.category}
          </Link>
          <h1 className="ng-pdp__name">{product.name}</h1>

          <Price
            price={product.price}
            salePrice={product.salePrice}
            currency={product.currency}
            size="lg"
          />

          {discount > 0 && (
            <span className="ng-tag ng-tag--sale ng-pdp__discount">
              {toPersianDigits(discount)}٪ تخفیف
            </span>
          )}

          <p className="ng-pdp__desc">{product.shortDescription}</p>

          <p className={`ng-pdp__stock ${soldOut ? 'is-out' : ''}`}>
            <Icon name={soldOut ? 'close' : 'check'} size={16} />
            {soldOut ? 'ناموجود' : `موجود در انبار${product.stock ? ` (${toPersianDigits(product.stock)} عدد)` : ''}`}
          </p>

          <div className="ng-pdp__buy">
            <QuantityStepper
              value={quantity}
              max={product.stock || undefined}
              onChange={setQuantity}
              size="lg"
            />
            <Button variant="gold" size="lg" onClick={addToCart} disabled={soldOut}>
              افزودن به سبد خرید
            </Button>
            <Button variant="dark" size="lg" onClick={buyNow} disabled={soldOut}>
              خرید سریع
            </Button>
            <button
              type="button"
              className={`ng-card__fav ng-card__fav--inline ${liked ? 'is-active' : ''}`}
              onClick={() => wishlist.toggle(product.id)}
              aria-pressed={liked}
              aria-label={liked ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
            >
              <Icon name={liked ? 'heartFilled' : 'heart'} size={20} />
            </button>
          </div>

          <dl className="ng-specs">
            {specs.map((spec) => (
              <div key={spec.label} className="ng-specs__row">
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="ng-pdp__assurances">
            <span>
              <Icon name="shield" size={16} />
              ضمانت اصالت کالا
            </span>
            <span>
              <Icon name="truck" size={16} />
              ارسال امن
            </span>
            <span>
              <Icon name="gift" size={16} />
              بسته‌بندی هدیه
            </span>
          </div>
        </div>
      </div>

      <section className="ng-section ng-section--tight" aria-labelledby="ng-pdp-desc-title">
        <h2 id="ng-pdp-desc-title" className="ng-title ng-title--start">
          توضیحات محصول
        </h2>
        <div className="ng-pdp__longdesc">
          <p>{product.description}</p>
          {product.features?.length > 0 && (
            <ul className="ng-feature-list">
              {product.features.map((feature) => (
                <li key={feature}>
                  <Icon name="check" size={16} />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <RelatedProducts product={product} />
    </>
  )
}
