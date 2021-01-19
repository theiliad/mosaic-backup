import React, { useState, useEffect } from 'react'
import { useEmblaCarousel } from 'embla-carousel/react'

const EmblaCarousel = ({ slides }) => {
  const [initialized, setInitialized] = useState(false)

  const [viewportRef, embla] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  })

  useEffect(() => {
    if (!embla) return

    if (!initialized) {
      setTimeout(() => {
        embla.reInit()
        setInitialized(true)
      }, 200)
    }
  }, [embla])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__inner">
                <img
                  className="embla__slide__img"
                  src={slide.src}
                  alt="A cool cat."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
