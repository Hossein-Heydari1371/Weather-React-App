import Hero from '../components/home/Hero'
import CategoryShowcase from '../components/home/CategoryShowcase'
import FeaturedProducts from '../components/home/FeaturedProducts'
import BrandStory from '../components/home/BrandStory'
import NewCollection from '../components/home/NewCollection'
import WhyNilgoon from '../components/home/WhyNilgoon'
import Newsletter from '../components/layout/Newsletter'
import { useSeo } from '../hooks/useSeo'
import { site } from '../data/site'
import { IMAGES } from '../data/products'

export default function HomePage() {
  useSeo({
    title: 'کیف‌های دست‌دوز لوکس زنانه',
    description:
      'نیلگون گالری؛ مجموعه‌ای از خاص‌ترین کیف‌های زنانه دست‌دوز با پارچه‌های طرح‌دار سوزن‌دوزی هندی روی قالب خام.',
    canonical: '/',
    image: IMAGES.pearl,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.name,
      alternateName: site.nameEn,
      inLanguage: 'fa-IR',
      description: site.tagline,
    },
  })

  return (
    <>
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts />
      <BrandStory />
      <NewCollection />
      <WhyNilgoon />
      <Newsletter />
    </>
  )
}
