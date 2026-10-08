import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import { site } from '../../data/site'

/** WhyNilgoon — «چرا نیلگون»: four promises of the atelier. */
export default function WhyNilgoon() {
  return (
    <section className="ng-section ng-why" aria-labelledby="ng-why-title">
      <Reveal className="ng-section__head">
        <span className="ng-eyebrow">تعهد ما</span>
        <h2 id="ng-why-title" className="ng-title">
          {site.home.whyTitle}
        </h2>
      </Reveal>

      <ul className="ng-why__grid">
        {site.why.map((item, index) => (
          <Reveal as="li" key={item.title} className="ng-why__item" delay={index * 80}>
            <span className="ng-why__icon" aria-hidden="true">
              <Icon name={item.icon} size={24} />
            </span>
            <h3 className="ng-why__title">{item.title}</h3>
            <p className="ng-why__text">{item.text}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
