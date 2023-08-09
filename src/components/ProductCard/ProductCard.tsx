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
      <img width={265} height={211} src={product.image} alt={product.name} />
      <h3 className={styles.productName}>{product.name}</h3>
      <p className={styles.price}>${product.price}</p>
    </div>
  )
}

export default ProductCard
