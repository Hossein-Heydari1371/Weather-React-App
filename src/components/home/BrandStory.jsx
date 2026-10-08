import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { site } from '../../data/site'
import { IMAGES } from '../../data/products'

/** BrandStory — «داستان نیلگون»: editorial image beside the brand narrative. */
export default function BrandStory() {
  return (
    <section className="ng-section ng-story" aria-labelledby="ng-story-title">
      <div className="ng-story__grid">
        <Reveal className="ng-story__media">
          <img src={IMAGES.mosaic} alt="کیف دست‌ساز نیلگون" loading="lazy" decoding="async" />
          <span className="ng-story__badge">{site.founded}</span>
        </Reveal>

        <Reveal className="ng-story__text" delay={120}>
          <span className="ng-eyebrow">روایت برند</span>
          <h2 id="ng-story-title" className="ng-title ng-title--start">
            {site.home.storyTitle}
          </h2>
          <p className="ng-story__lead">{site.story.lead}</p>
          {site.story.paragraphs.map((paragraph) => (
            <p key={paragraph} className="ng-story__p">
              {paragraph}
            </p>
          ))}
          <Button to="/about" variant="dark">
            بیشتر بخوانید
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
