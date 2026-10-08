import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider } from './router/Router'
import { UiProvider } from './store/ui'

/* Design system — imported in cascade order (tokens -> base -> layout ->
   components -> page sections) so the layer order is explicit. */
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/home.css'
import './styles/pages.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider>
      <UiProvider>
        <App />
      </UiProvider>
    </RouterProvider>
  </StrictMode>,
)
