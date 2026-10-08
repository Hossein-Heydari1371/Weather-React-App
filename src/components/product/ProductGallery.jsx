import { useRef, useState } from 'react'
import Icon from '../ui/Icon'
import Modal from '../ui/Modal'

/**
 * ProductGallery — main image, thumbnails, zoom/fullscreen, prev-next and
 * touch swipe. `object-fit: contain` keeps every bag sharp and undistorted.
 */
export default function ProductGallery({ images = [], name = '' }) {
  const list = images.length ? images : ['']
  const [index, setIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const touchStartX = useRef(null)

  const safeIndex = Math.min(index, list.length - 1)
  const current = list[safeIndex]

  const go = (delta) => setIndex((value) => (value + delta + list.length) % list.length)

  const onTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX
  }

  const onTouchEnd = (event) => {
    if (touchStartX.current === null) return
    const dx = event.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 45) go(dx > 0 ? 1 : -1)
    touchStartX.current = null
  }

  return (
    <div className="ng-gallery">
      <div className="ng-gallery__stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <img className="ng-gallery__main" src={current} alt={name} decoding="async" />

        {list.length > 1 && (
          <>
            <button
              type="button"
              className="ng-gallery__nav ng-gallery__nav--prev"
              onClick={() => go(-1)}
              aria-label="تصویر قبلی"
            >
              <Icon name="chevronRight" size={20} />
            </button>
            <button
              type="button"
              className="ng-gallery__nav ng-gallery__nav--next"
              onClick={() => go(1)}
              aria-label="تصویر بعدی"
            >
              <Icon name="chevronLeft" size={20} />
            </button>
          </>
        )}

        <button
          type="button"
          className="ng-gallery__zoom"
          onClick={() => setFullscreen(true)}
          aria-label="نمایش تمام‌صفحه"
        >
          <Icon name="expand" size={18} />
        </button>
      </div>

      {list.length > 1 && (
        <ul className="ng-gallery__thumbs">
          {list.map((image, thumbIndex) => (
            <li key={`${image}-${thumbIndex}`}>
              <button
                type="button"
                className={`ng-gallery__thumb ${thumbIndex === safeIndex ? 'is-active' : ''}`}
                onClick={() => setIndex(thumbIndex)}
                aria-label={`تصویر ${thumbIndex + 1}`}
                aria-current={thumbIndex === safeIndex}
              >
                <img src={image} alt="" loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={fullscreen}
        onClose={() => setFullscreen(false)}
        title={name}
        size="full"
        variant="dark"
      >
        <div className="ng-lightbox" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <img src={current} alt={name} decoding="async" />
          {list.length > 1 && (
            <div className="ng-lightbox__nav">
              <button type="button" className="ng-gallery__nav" onClick={() => go(-1)} aria-label="تصویر قبلی">
                <Icon name="chevronRight" size={22} />
              </button>
              <button type="button" className="ng-gallery__nav" onClick={() => go(1)} aria-label="تصویر بعدی">
                <Icon name="chevronLeft" size={22} />
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
