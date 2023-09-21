import { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BASE_URL, IMAGES_URL, ROUTES } from '../../constants'
import { formatCurrency, getClassNames } from '../../utils'
import styles from './Carousel.module.scss'

const IMAGE_WIDTH = 560
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7954545454545455
const GUTTER = 40

type CarouselProps = {
  products: {
    id: string
    images: string
    name: string
    price: number
  }[]
}

function Carousel({ products }: CarouselProps) {
  const lastSlide = products.length - 1
  const [positions, setPositions] = useState<{
    active: number
    prev: number
    next: number
  }>({ active: 0, prev: lastSlide, next: 1 })

  function onNextSlideClick() {
    setPositions({
      active: positions.active === lastSlide ? 0 : positions.active + 1,
      prev: positions.prev === lastSlide ? 0 : positions.prev + 1,
      next: positions.next === lastSlide ? 0 : positions.next + 1,
    })
  }

  function onPrevSlideClick() {
    setPositions({
      active: positions.active === 0 ? lastSlide : positions.active - 1,
      prev: positions.prev === 0 ? lastSlide : positions.prev - 1,
      next: positions.next === 0 ? lastSlide : positions.next - 1,
    })
  }

  function onSliderButtonClick(index: number) {
    if (index !== positions.active) {
      setPositions({
        active: index,
        prev: index - 1 < 0 ? lastSlide : index - 1,
        next: index + 1 > lastSlide ? 0 : index + 1,
      })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      onNextSlideClick()
    }, 4000)

    return () => clearInterval(interval)
  }, [positions])

  return (
    <div
      style={{ width: IMAGE_WIDTH * 2 + GUTTER }}
      className={styles.carousel}
    >
      <button
        style={{
          top: (IMAGE_HEIGHT + GUTTER) / 2 - 20,
        }}
        className={styles.prevButton}
        type='button'
        onClick={onPrevSlideClick}
        aria-label='previous slide'
      >
        <FaChevronLeft />
      </button>
      <button
        style={{
          top: (IMAGE_HEIGHT + GUTTER) / 2 - 20,
        }}
        className={styles.nextButton}
        type='button'
        onClick={onNextSlideClick}
        aria-label='next slide'
      >
        <FaChevronRight />
      </button>
      <div className={styles.sliderButtons}>
        {products.map((product, index) => (
          <button
            key={product.id}
            type='button'
            onClick={() => onSliderButtonClick(index)}
          >
            <div className={index === positions.active ? styles.active : ''} />
          </button>
        ))}
      </div>
      <div
        style={{
          width: IMAGE_WIDTH * 2 + GUTTER,
          height: IMAGE_HEIGHT + GUTTER,
        }}
        className={styles.root}
      >
        {products.map((product, index) => (
          <Link
            to={ROUTES.product.replace(':id', product.id)}
            key={product.id}
            className={styles.slideContainer}
          >
            <div
              style={{ width: IMAGE_WIDTH * 2 }}
              className={getClassNames([
                styles.slide,
                positions.active === index && styles.active,
                positions.prev === index && styles.prev,
                positions.next === index && styles.next,
              ])}
            >
              <img
                src={`${BASE_URL}${IMAGES_URL}/${product.images}`}
                alt={product.name}
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
              />
              <div
                style={{ width: IMAGE_WIDTH }}
                className={styles.description}
              >
                <div>
                  <h2>{product.name}</h2>
                  <span>{`$${formatCurrency(product.price)}`}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Carousel
