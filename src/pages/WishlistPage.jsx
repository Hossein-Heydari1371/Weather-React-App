import { useEffect, useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import ProductGrid from '../components/product/ProductGrid'
import Loader from '../components/ui/Loader'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { ProductService } from '../services/ProductService'
import { useWishlist } from '../hooks/useWishlist'
import { useSeo } from '../hooks/useSeo'
import { site } from '../data/site'
import { toPersianDigits } from '../utils/format'

/** WishlistPage — «علاقه‌مندی‌های من». */
export default function WishlistPage() {
  const { ids } = useWishlist()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useSeo({ title: 'علاقه‌مندی‌های من', description: 'محصولات مورد علاقه شما در نیلگون گالری.', canonical: '/wishlist' })

  useEffect(() => {
    let active = true
    setLoading(true)
    ProductService.getByIds(ids).then((items) => {
      if (!active) return
      setProducts(items)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [ids])

  return (
    <>
      <PageHeader
        title="علاقه‌مندی‌های من"
        subtitle={products.length > 0 ? `${toPersianDigits(products.length)} محصول ذخیره شده` : undefined}
        crumbs={[{ label: 'علاقه‌مندی‌ها' }]}
      />

      <section className="ng-section">
        {loading ? (
          <Loader count={4} />
        ) : products.length === 0 ? (
          <div className="ng-empty">
            <span className="ng-empty__icon">
              <Icon name="heart" size={32} />
            </span>
            <p className="ng-empty__title">{site.messages.emptyWishlist}</p>
            <Button to="/products" variant="gold">
              {site.messages.browseProducts}
            </Button>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </>
  )
}
