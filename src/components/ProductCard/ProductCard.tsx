import { Link } from 'react-router-dom'
import styles from './ProductCard.module.scss'
import { Rating } from '../Rating'
import { subString } from '../../utils'
import { PRODUCT_CARD_STRING_LIMIT } from '../../constants'

type ProductCardProps = {
  product: {
    _id: string
    name: string
    image: string
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
    <div className={styles.root}>
      <Link to={`product/${product._id}`}>
        <img width={265} height={211} src={product.image} alt={product.name} />
      </Link>
      <Link to={`product/${product._id}`}>
        <h3 className={styles.productName}>
          {product.name.length > PRODUCT_CARD_STRING_LIMIT
            ? subString(product.name, PRODUCT_CARD_STRING_LIMIT)
            : product.name}
        </h3>
      </Link>
      <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      <p className={styles.price}>${product.price}</p>
    </div>
  )
}

export default ProductCard
