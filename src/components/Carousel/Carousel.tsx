import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { BASE_URL, IMAGES_URL, ROUTES } from '../../constants'
import { formatCurrency, getClassNames } from '../../utils'
import styles from './Carousel.module.scss'

type CarouselProps = {
  products: {
    id: string
    images: string
    name: string
    price: number
  }[]
}

function Carousel({ products }: CarouselProps) {
  const [activeSlide, setActiveSlide] = useState<number>(0)

  const onNextSlide = () => {
    setActiveSlide(activeSlide === products.length - 1 ? 0 : activeSlide + 1)
  }

  const onPrevSlide = () => {
    setActiveSlide(activeSlide === 0 ? products.length - 1 : activeSlide - 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      onNextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [activeSlide])

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

      {products.map((product, index) => (
        <Link
          key={product.id}
          to={ROUTES.product.replace(':id', product.id)}
          className={getClassNames([
            styles.slide,
            index === activeSlide && styles.active,
          ])}
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
      ))}
    </div>
  )
}

export default Carousel
