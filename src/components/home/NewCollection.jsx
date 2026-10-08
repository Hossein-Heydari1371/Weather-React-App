import { useEffect, useState } from 'react'
import Reveal from '../ui/Reveal'
import ProductCard from '../product/ProductCard'
import { ProductService } from '../../services/ProductService'
import { site } from '../../data/site'

/** NewCollection — «مجموعه جدید»: a swipeable rail of the newest products. */
export default function NewCollection() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    let active = true
    ProductService.getNew(6).then((items) => {
      if (active) setProducts(items)
    })
    return () => {
      active = false
    }
  }, [])

  if (!products.length) return null

  return (
    <section className="ng-section ng-collection" aria-labelledby="ng-new-title">
      <Reveal className="ng-section__head">
        <span className="ng-eyebrow">تازه‌ها</span>
        <h2 id="ng-new-title" className="ng-title">
          {site.home.newTitle}
        </h2>
        <p className="ng-subtitle">{site.home.newSubtitle}</p>
      </Reveal>

      <ul className="ng-rail">
        {products.map((product) => (
          <li key={product.id} className="ng-rail__item">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}
