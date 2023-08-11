/* eslint-disable no-underscore-dangle */
import { ProductCard } from '../../components'
import { useProducts } from '../../hooks'
import styles from './HomePage.module.scss'

function HomePage() {
  const { products, error, isLoading } = useProducts()

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>An error occurs {error}</h2>
  }

  return (
    products.length && (
      <>
        <h1 className={styles.title}>Latest Products</h1>
        <div className={styles.container}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </>
    )
  )
}

export default HomePage
