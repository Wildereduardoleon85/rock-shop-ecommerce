import { Link } from 'react-router-dom'
import styles from './ProductCard.module.scss'
import { Rating } from '../Rating'
import { subString } from '../../utils'
import {
  BASE_URL,
  IMAGES_URL,
  PRODUCT_CARD_STRING_LIMIT,
  ROUTES,
} from '../../constants'

type ProductCardProps = {
  product: {
    _id: string
    name: string
    images: {
      default: string
      md?: string
    }
    description: string
    brand: string
    category: string
    price: number
    countInStock: number
    rating: number
    numReviews: number
  }
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      className={styles.root}
      to={ROUTES.product.replace(':id', product._id)}
    >
      <img
        width={282}
        height={224.34}
        src={`${BASE_URL}${IMAGES_URL}/${product.images.default}`}
        alt={product.name}
      />

      <h2 className={styles.productName}>
        {product.name.length > PRODUCT_CARD_STRING_LIMIT
          ? subString(product.name, PRODUCT_CARD_STRING_LIMIT)
          : product.name}
      </h2>

      <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      <p className={styles.price}>${product.price}</p>
    </Link>
  )
}

export default ProductCard
