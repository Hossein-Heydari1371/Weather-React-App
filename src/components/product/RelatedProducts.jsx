import { useEffect, useState } from 'react'
import ProductGrid from './ProductGrid'
import Reveal from '../ui/Reveal'
import { ProductService } from '../../services/ProductService'

/** RelatedProducts — same-category suggestions for the detail page. */
export default function RelatedProducts({ product }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    let active = true
    if (!product) return undefined
    ProductService.getRelated(product, 4).then((related) => {
      if (active) setItems(related)
    })
    return () => {
      active = false
    }
  }, [product])

  if (!items.length) return null

  return (
    <section className="ng-section ng-section--tight" aria-labelledby="ng-related-title">
      <Reveal className="ng-section__head">
        <span className="ng-eyebrow">پیشنهاد نیلگون</span>
        <h2 id="ng-related-title" className="ng-title">
          محصولات مرتبط
        </h2>
      </Reveal>
      <ProductGrid products={items} />
    </section>
  )
}
