import { useEffect } from 'react'

/**
 * Head/meta management without a dependency.
 *
 * Keeps titles, descriptions, canonical URLs, Open Graph tags and JSON-LD
 * structured data in one place — the same tags a WordPress theme would emit
 * server-side (or via Yoast / Rank Math).
 */

const SITE_NAME = 'نیلگون گالری'

function setMeta(attribute, key, content) {
  if (!content) return
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export function useSeo({ title, description, canonical, image, type = 'website', jsonLd } = {}) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title || SITE_NAME)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:image', image)
    setMeta('name', 'twitter:card', 'summary_large_image')

    if (canonical) {
      let link = document.head.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonical)
    }
  }, [title, description, canonical, image, type])

  const serializedJsonLd = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const existing = document.getElementById('ng-structured-data')
    if (!serializedJsonLd) {
      if (existing) existing.remove()
      return
    }
    const script = existing || document.createElement('script')
    script.id = 'ng-structured-data'
    script.type = 'application/ld+json'
    script.textContent = serializedJsonLd
    if (!existing) document.head.appendChild(script)
  }, [serializedJsonLd])
}
