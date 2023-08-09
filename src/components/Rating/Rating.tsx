import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import styles from './Rating.module.scss'

type RatingProps = {
  value: number
  text: string
}

type StarIconProps = {
  value: number
  iterator: number
  className?: string
}

function StarIcon({ value, iterator, className = '' }: StarIconProps) {
  if (Math.floor(value) >= iterator + 1) {
    return <FaStar className={className} />
  }

  if (value >= iterator + 0.5) {
    return <FaStarHalfAlt className={className} />
  }

  return <FaRegStar className={className} />
}

function Rating({ value, text }: RatingProps) {
  return (
    <div className={styles.root}>
      {[...Array(5).keys()].map((_mapValue, index) => (
        <span key={String(Math.random()).replace('0.', '')}>
          <StarIcon value={value} iterator={index} className={styles.icon} />
        </span>
      ))}
      <span className={styles.ratingText}>{text ?? ''}</span>
    </div>
  )
}

export default Rating
