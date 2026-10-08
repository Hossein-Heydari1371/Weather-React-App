import CategoryCard from './CategoryCard'

/** CategoryGrid — responsive category tiles. */
export default function CategoryGrid({ categories = [] }) {
  return (
    <div className="ng-catgrid">
      {categories.map((category, index) => (
        <CategoryCard key={category.id} category={category} index={index} />
      ))}
    </div>
  )
}
