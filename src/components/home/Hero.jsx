import { useCallback, useEffect, useState } from 'react'
import { Link } from '../../router/Router'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import Price from '../ui/Price'
import { site } from '../../data/site'
import { ProductService } from '../../services/ProductService'
import { toPersianDigits } from '../../utils/format'

const AUTOPLAY_MS = 6500

/**
 * Hero — the cinematic stage from reference image 1.
 *
 * Layers: warm interior gradient, architectural arch, golden spotlights and a
 * reflective marble floor (all CSS, so nothing depends on a stock photo).
 * On the platform sits one real product image per slide, inside a circular
 * disc — the bags keep their aspect ratio and are never distorted.
 */
export default function Hero() {
  const [slides, setSlides] = useState([])
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    let active = true
    ProductService.getFeatured(12).then((items) => {
      if (!active) return
      const seen = new Set()
      const unique = []
      items.forEach((product) => {
        if (seen.has(product.thumbnail) || unique.length >= 4) return
        seen.add(product.thumbnail)
        unique.push(product)
      })
      setSlides(unique)
    })
    return () => {
      active = false
    }
  }, [])

  const goTo = useCallback(
    (next) => {
      if (!slides.length) return
      setIndex(((next % slides.length) + slides.length) % slides.length)
    },
    [slides.length],
  )

  useEffect(() => {
    if (paused || slides.length < 2) return undefined
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % slides.length), AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [paused, slides.length])

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') goTo(index + 1)
    if (event.key === 'ArrowRight') goTo(index - 1)
  }

  const current = slides[index]

  return (
    <section
      className="ng-hero"
      aria-label="نیلگون گالری"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="ng-hero__bg" aria-hidden="true">
        <span className="ng-hero__arch" />
        <span className="ng-hero__haze" />
        <span className="ng-hero__floor" />
        <span className="ng-hero__grain" />
      </div>

      <div className="ng-hero__inner">
        <div className="ng-hero__text">
          <span className="ng-eyebrow">{site.hero.eyebrow}</span>
          <h1 className="ng-hero__title">{site.hero.title}</h1>
          <p className="ng-hero__subtitle">{site.hero.subtitle}</p>
          <div className="ng-hero__cta">
            <Button to="/products" variant="gold">
              {site.home.videoCta}
            </Button>
            <Button to="/about" variant="ghost">
              درباره نیلگون
            </Button>
          </div>
        </div>

        <div className="ng-hero__stage">
          {slides.length > 1 && (
            <button
              type="button"
              className="ng-hero__arrow ng-hero__arrow--prev"
              onClick={() => goTo(index + 1)}
              aria-label="محصول قبلی"
            >
              <Icon name="chevronRight" size={22} />
            </button>
          )}

          <div className="ng-hero__stack">
            <div className="ng-hero__plate">
              {slides.map((product, slideIndex) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className={`ng-hero__slide ${slideIndex === index ? 'is-active' : ''}`}
                  tabIndex={slideIndex === index ? 0 : -1}
                  aria-hidden={slideIndex !== index}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    loading={slideIndex === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </Link>
              ))}
            </div>
            <span className="ng-hero__disc" aria-hidden="true" />
          </div>

          {slides.length > 1 && (
            <button
              type="button"
              className="ng-hero__arrow ng-hero__arrow--next"
              onClick={() => goTo(index - 1)}
              aria-label="محصول بعدی"
            >
              <Icon name="chevronLeft" size={22} />
            </button>
          )}
        </div>
      </div>

      {current && (
        <div className="ng-hero__caption" aria-live="polite">
          <Link to={`/product/${current.slug}`} className="ng-hero__caption-name">
            {current.name}
          </Link>
          <Price price={current.price} salePrice={current.salePrice} size="sm" currency={current.currency} />
        </div>
      )}

      {slides.length > 1 && (
        <div className="ng-hero__dots" role="tablist" aria-label="اسلایدهای محصول">
          {slides.map((product, dotIndex) => (
            <button
              key={product.id}
              type="button"
              role="tab"
              aria-selected={dotIndex === index}
              aria-label={`اسلاید ${toPersianDigits(dotIndex + 1)}`}
              className={`ng-hero__dot ${dotIndex === index ? 'is-active' : ''}`}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>
      )}

      <a className="ng-hero__scroll" href="#ng-categories">
        <span className="ng-hero__scroll-icon" aria-hidden="true">
          <Icon name="mouse" size={22} />
        </span>
        {site.hero.scroll}
      </a>
    </section>
  )
}
