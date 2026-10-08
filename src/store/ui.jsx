/**
 * UI state — overlays, drawers and transient toasts.
 *
 * Pure presentation state, kept separate from commerce state so components can
 * be ported to a WordPress theme without carrying any store dependency.
 */

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const UiContext = createContext(null)

export function UiProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [quickView, setQuickView] = useState(null)
  const [toast, setToast] = useState(null)

  const overlayOpen = cartOpen || searchOpen || menuOpen || Boolean(quickView)

  useEffect(() => {
    if (!overlayOpen) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [overlayOpen])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])

  const value = useMemo(
    () => ({
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),

      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),

      menuOpen,
      openMenu: () => setMenuOpen(true),
      closeMenu: () => setMenuOpen(false),

      quickView,
      openQuickView: (product) => setQuickView(product),
      closeQuickView: () => setQuickView(null),

      toast,
      showToast: (message) => setToast(message),
      hideToast: () => setToast(null),
    }),
    [cartOpen, searchOpen, menuOpen, quickView, toast],
  )

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

export function useUi() {
  const context = useContext(UiContext)
  if (!context) throw new Error('useUi must be used within <UiProvider>')
  return context
}
