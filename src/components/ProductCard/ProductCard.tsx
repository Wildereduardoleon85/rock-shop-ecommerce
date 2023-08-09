/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom'
import styles from './ProductCard.module.scss'

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
      <Link to={product._id}>
        <img width={265} height={211} src={product.image} alt={product.name} />
      </Link>
      <Link to={product._id}>
        <h3 className={styles.productName}>{product.name}</h3>
      </Link>
      <p className={styles.price}>${product.price}</p>
    </div>
  )
}

export default ProductCard
