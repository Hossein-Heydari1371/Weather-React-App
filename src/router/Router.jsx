/**
 * Minimal client-side router built on the History API.
 *
 * Deliberately dependency-free and standards-based so the same routing model
 * (clean URLs such as /products and /product/<slug>) can be reproduced in a
 * WordPress theme with rewrite rules.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const RouterContext = createContext(null)

const currentLocation = () => ({
  pathname: window.location.pathname,
  search: window.location.search,
})

export function RouterProvider({ children }) {
  const [location, setLocation] = useState(currentLocation)

  useEffect(() => {
    const onPopState = () => setLocation(currentLocation())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((to, options = {}) => {
    const url = String(to)
    if (/^https?:\/\//.test(url)) {
      window.location.assign(url)
      return
    }
    if (url === window.location.pathname + window.location.search) return

    if (options.replace) window.history.replaceState({}, '', url)
    else window.history.pushState({}, '', url)

    setLocation(currentLocation())
    if (!options.keepScroll) window.scrollTo(0, 0)
  }, [])

  const value = useMemo(
    () => ({ pathname: location.pathname, search: location.search, navigate }),
    [location, navigate],
  )

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) throw new Error('useRouter must be used within <RouterProvider>')
  return context
}

/** Anchor that performs a client-side navigation, with real hrefs for SEO. */
export function Link({ to, children, onClick, replace = false, keepScroll = false, ...rest }) {
  const { navigate } = useRouter()

  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    navigate(to, { replace, keepScroll })
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
