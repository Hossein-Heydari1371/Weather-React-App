/**
 * Tiny observable store used by the services.
 *
 * Standard-library only (localStorage + subscription set) so it behaves
 * identically inside a WordPress theme. Services expose it through React's
 * `useSyncExternalStore`, which keeps commerce state decoupled from the UI.
 */

export function createPersistentStore(initialState, storageKey) {
  const hasStorage = typeof window !== 'undefined' && !!window.localStorage

  const read = () => {
    if (!hasStorage) return initialState
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (!raw) return initialState
      return { ...initialState, ...JSON.parse(raw) }
    } catch {
      return initialState
    }
  }

  let state = read()
  const listeners = new Set()

  const persist = () => {
    if (!hasStorage) return
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state))
    } catch {
      /* storage full / disabled — state simply stays in memory */
    }
  }

  const subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const setState = (updater) => {
    const next = typeof updater === 'function' ? updater(state) : { ...state, ...updater }
    if (next === state) return
    state = next
    persist()
    listeners.forEach((listener) => listener())
  }

  return { getState: () => state, subscribe, setState }
}
