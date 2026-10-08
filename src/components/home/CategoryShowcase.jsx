import Reveal from '../ui/Reveal'
import CategoryGrid from '../product/CategoryGrid'
import useCategories from '../../hooks/useCategories'
import { site } from '../../data/site'

/** CategoryShowcase — «دسته‌بندی محصولات». */
export default function CategoryShowcase() {
  const categories = useCategories()

  if (!categories.length) return null

  return (
    <section className="ng-section" id="ng-categories" aria-labelledby="ng-categories-title">
      <Reveal className="ng-section__head">
        <span className="ng-eyebrow">مجموعه‌ها</span>
        <h2 id="ng-categories-title" className="ng-title">
          {site.home.categoriesTitle}
        </h2>
        <p className="ng-subtitle">{site.home.categoriesSubtitle}</p>
      </Reveal>

      <CategoryGrid categories={categories} />
    </section>
  )
}
