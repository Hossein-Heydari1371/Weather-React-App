import PageHeader from '../components/layout/PageHeader'
import Newsletter from '../components/layout/Newsletter'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import { useSeo } from '../hooks/useSeo'
import { site } from '../data/site'
import { IMAGES } from '../data/products'

/** AboutPage — «درباره نیلگون»: luxury editorial layout. */
export default function AboutPage() {
  useSeo({
    title: site.about.title,
    description: site.about.lead,
    canonical: '/about',
    image: IMAGES.crescent,
  })

  return (
    <>
      <PageHeader
        title={site.about.title}
        subtitle={site.about.lead}
        crumbs={[{ label: 'درباره ما' }]}
      />

      <section className="ng-section ng-about">
        <Reveal className="ng-about__hero">
          <img src={IMAGES.crescent} alt="کیف دست‌ساز نیلگون" loading="lazy" decoding="async" />
          <div className="ng-about__quote">
            <span className="ng-eyebrow">امضای نیلگون</span>
            <p>{site.tagline}</p>
          </div>
        </Reveal>

        <div className="ng-about__grid">
          {site.about.sections.map((section, index) => (
            <Reveal as="article" key={section.title} className="ng-about__card" delay={index * 70}>
              <h2 className="ng-about__title">{section.title}</h2>
              <p className="ng-about__text">{section.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="ng-about__band">
          <div>
            <h2 className="ng-title ng-title--start">کارگاه نیلگون</h2>
            <p className="ng-subtitle">
              هر کیف از یک قالب خام آغاز می‌شود و با پارچه طرح‌دار سوزن‌دوزی هندی به قطعه نهایی تبدیل می‌شود.
            </p>
          </div>
          <Button to="/products" variant="gold">
            مشاهده مجموعه
          </Button>
        </Reveal>
      </section>

      <Newsletter />
    </>
  )
}
