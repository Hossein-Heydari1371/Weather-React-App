import { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import Icon from '../ui/Icon'
import Price from '../ui/Price'
import Button from '../ui/Button'
import QuantityStepper from '../commerce/QuantityStepper'
import { useUi } from '../../store/ui'
import { useCart } from '../../hooks/useCart'
import { useWishlist } from '../../hooks/useWishlist'
import { useRouter } from '../../router/Router'

/** QuickView — glass modal with the essentials and a fast add-to-cart. */
export default function QuickView() {
  const ui = useUi()
  const { addItem } = useCart()
  const wishlist = useWishlist()
  const { navigate } = useRouter()
  const product = ui.quickView
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setQuantity(1)
  }, [product])

  if (!product) return null

  const soldOut = product.available === false || product.stock === 0
  const liked = wishlist.has(product.id)

  const addToCart = () => {
    addItem(product, quantity)
    ui.closeQuickView()
    ui.showToast(`«${product.name}» به سبد خرید اضافه شد.`)
  }

  const goToProduct = () => {
    ui.closeQuickView()
    navigate(`/product/${product.slug}`)
  }

  return (
    <Modal open onClose={ui.closeQuickView} title="نمایش سریع" size="lg" className="ng-quickview">
      <div className="ng-quickview__grid">
        <div className="ng-quickview__media">
          <img src={product.thumbnail} alt={product.name} decoding="async" />
        </div>

        <div className="ng-quickview__info">
          <span className="ng-card__cat">{product.category}</span>
          <h3 className="ng-quickview__name">{product.name}</h3>

          <Price price={product.price} salePrice={product.salePrice} currency={product.currency} size="lg" />

          <p className="ng-quickview__desc">{product.shortDescription}</p>

          <dl className="ng-quickview__meta">
            <div>
              <dt>جنس</dt>
              <dd>{product.material}</dd>
            </div>
            <div>
              <dt>رنگ</dt>
              <dd>{product.color}</dd>
            </div>
            <div>
              <dt>موجودی</dt>
              <dd>{soldOut ? 'ناموجود' : `${product.stock} عدد`}</dd>
            </div>
          </dl>

          <div className="ng-quickview__actions">
            <QuantityStepper
              value={quantity}
              max={product.stock || undefined}
              onChange={setQuantity}
            />
            <Button variant="gold" onClick={addToCart} disabled={soldOut}>
              افزودن به سبد
            </Button>
            <button
              type="button"
              className={`ng-card__fav ng-card__fav--inline ${liked ? 'is-active' : ''}`}
              onClick={() => wishlist.toggle(product.id)}
              aria-pressed={liked}
              aria-label={liked ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
            >
              <Icon name={liked ? 'heartFilled' : 'heart'} size={18} />
            </button>
          </div>

          <button type="button" className="ng-quickview__more" onClick={goToProduct}>
            مشاهده صفحه محصول
            <Icon name="arrowLeft" size={16} />
          </button>
        </div>
      </div>
    </Modal>
  )
}
