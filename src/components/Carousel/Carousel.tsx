import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { BASE_URL, IMAGES_URL, ROUTES } from '../../constants'
import { formatCurrency } from '../../utils'
import styles from './Carousel.module.scss'
import { useMediaQuery } from '../../hooks'

type Positions = { [key: number]: number }

type CarouselProps = {
  products: {
    id: string
    images: string
    name: string
    price: number
  }[]
}

function generatePositions(numberOfSlides: number, slideWidth: number) {
  const positions: Positions = {}
  const slides = [...Array(numberOfSlides).keys()]

  slides.forEach((slide) => {
    positions[slide] = slideWidth * slide * -1
  })

  return positions
}

function Carousel({ products }: CarouselProps) {
  const slideRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<Positions | null>(null)
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const screenSize = useMediaQuery()

  useLayoutEffect(() => {
    if (slideRef.current) {
      setPositions(
        generatePositions(products.length, slideRef.current.offsetWidth)
      )
    }
  }, [slideRef, screenSize])

  const onNextSlide = () => {
    setActiveSlide(activeSlide === products.length - 1 ? 0 : activeSlide + 1)
  }

  const onPrevSlide = () => {
    setActiveSlide(activeSlide === 0 ? products.length - 1 : activeSlide - 1)
  }

  return (
    <div className={styles.root}>
      <button className={styles.prevButton} type='button' onClick={onPrevSlide}>
        <FaChevronLeft />
      </button>
      <button className={styles.nextButton} type='button' onClick={onNextSlide}>
        <FaChevronRight />
      </button>
      <div className={styles.bullets}>
        {[...Array(products.length).keys()].map((slide) => (
          <button
            className={slide === activeSlide ? styles.active : ''}
            type='button'
            key={slide}
            aria-label={`slide ${slide + 1}`}
            onClick={() => setActiveSlide(slide)}
          />
        ))}
      </div>
      <div className={styles.carousel}>
        <div
          style={{
            transform: positions
              ? `translateX(${positions[activeSlide]}px)`
              : 'translateX(0)',
          }}
          className={styles.sliderStripe}
        >
          {products.map((product) => (
            <div
              ref={slideRef}
              key={product.id}
              className={styles.slideContainer}
            >
              <Link
                to={ROUTES.product.replace(':id', product.id)}
                className={styles.slide}
              >
                <img
                  src={`${BASE_URL}${IMAGES_URL}/${product.images}`}
                  alt={product.name}
                  width='50%'
                />
                <div className={styles.description}>
                  <div>
                    <h2>{product.name}</h2>
                    <span>{`$${formatCurrency(product.price)}`}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel
