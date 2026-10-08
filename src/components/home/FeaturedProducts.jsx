import { useEffect, useState } from 'react'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import Loader from '../ui/Loader'
import ProductGrid from '../product/ProductGrid'
import { ProductService } from '../../services/ProductService'
import { site } from '../../data/site'

/** FeaturedProducts — «منتخب نیلگون». */
export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    ProductService.list({ featured: true, sort: 'featured', perPage: 8 })
      .then((result) => {
        if (active) setProducts(result.items)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section className="ng-section" aria-labelledby="ng-featured-title">
      <Reveal className="ng-section__head">
        <span className="ng-eyebrow">گزیده</span>
        <h2 id="ng-featured-title" className="ng-title">
          {site.home.featuredTitle}
        </h2>
        <p className="ng-subtitle">{site.home.featuredSubtitle}</p>
      </Reveal>

      {loading ? <Loader count={4} /> : <ProductGrid products={products} />}

      <div className="ng-section__more">
        <Button to="/products" variant="outline">
          مشاهده همه محصولات
        </Button>
      </div>
    </section>
  )
}
