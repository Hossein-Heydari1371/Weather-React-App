import { useEffect, useRef } from 'react'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import { site } from '../../data/site'

/**
 * Hero — the cinematic stage.
 *
 * The film is scrubbed by the page scroll: the section is a tall runway whose
 * inner stage is pinned to the viewport, and every scroll position seeks the
 * video to the matching frame. Nothing autoplays — the visitor's scroll drives
 * the film, starting from the first movement.
 *
 * A second, blurred copy of the same film fills the rest of the screen, so the
 * picture covers everything edge to edge while the footage itself keeps its
 * native framing: never cropped, never stretched, never zoomed.
 */
export default function Hero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const backdropRef = useRef(null)
  const hintRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return undefined

    const backdrop = backdropRef.current
    let raf = 0
    let primed = false

    const seek = (time) => {
      const duration = video.duration
      if (!Number.isFinite(duration) || duration <= 0) return
      const target = Math.min(Math.max(time, 0), duration - 0.05)
      if (Math.abs(target - video.currentTime) < 0.008) return
      video.currentTime = target
      if (backdrop) backdrop.currentTime = target
    }

    const render = () => {
      raf = 0
      const rect = section.getBoundingClientRect()
      const runway = rect.height - window.innerHeight
      const progress = runway > 0 ? Math.min(1, Math.max(0, -rect.top / runway)) : 0
      section.style.setProperty('--ng-hero-progress', progress.toFixed(4))
      if (hintRef.current) hintRef.current.classList.toggle('is-hidden', progress > 0.04)
      if (video.readyState >= 1) seek(progress * (video.duration - 0.05))
    }

    const onScroll = () => {
      if (!primed) {
        primed = true
        /* iOS only paints seeked frames after the film has played once. */
        const attempt = video.play()
        if (attempt && typeof attempt.then === 'function') {
          attempt.then(() => video.pause()).catch(() => {})
        } else {
          video.pause()
        }
      }
      if (!raf) raf = window.requestAnimationFrame(render)
    }

    render()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    video.addEventListener('loadedmetadata', render)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      video.removeEventListener('loadedmetadata', render)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  /* The cue starts the film rather than skipping past it. */
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="ng-hero" aria-label="نیلگون گالری">
      <div className="ng-hero__sticky">
        <video
          ref={backdropRef}
          className="ng-hero__video-bg"
          src={site.hero.video}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
        />
        <video
          ref={videoRef}
          className="ng-hero__video"
          src={site.hero.video}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
        />

        <span className="ng-hero__scrim" aria-hidden="true" />
        <span className="ng-hero__grain" aria-hidden="true" />

        <div className="ng-hero__inner">
          <div className="ng-hero__text">
            <span className="ng-eyebrow">{site.hero.eyebrow}</span>
            <h1 className="ng-hero__title">{site.hero.title}</h1>
            <p className="ng-hero__subtitle">{site.hero.subtitle}</p>
            <div className="ng-hero__cta">
              <Button to="/products" variant="gold">
                {site.home.videoCta}
              </Button>
              <Button to="/about" variant="ghost">
                درباره نیلگون
              </Button>
            </div>
          </div>
        </div>

        <button ref={hintRef} type="button" className="ng-hero__scroll" onClick={scrollDown}>
          <span className="ng-hero__scroll-icon" aria-hidden="true">
            <Icon name="mouse" size={22} />
          </span>
          {site.hero.scroll}
        </button>

        <span className="ng-hero__progress" aria-hidden="true">
          <span className="ng-hero__progress-fill" />
        </span>
      </div>
    </section>
  )
}
