import { useEffect, useState } from 'react'
import { CategoryService } from '../services/CategoryService'

/** Load product categories once for navigation surfaces. */
export function useCategories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    let active = true
    CategoryService.list().then((list) => {
      if (active) setCategories(list)
    })
    return () => {
      active = false
    }
  }, [])

  return categories
}

export default useCategories
