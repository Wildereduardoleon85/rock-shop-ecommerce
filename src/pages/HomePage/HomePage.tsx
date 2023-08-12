/* eslint-disable no-underscore-dangle */
import { ProductCard } from '../../components'
import { useGetProductsQuery } from '../../slices'
import styles from './HomePage.module.scss'

function HomePage() {
  const { data: products, isError, isLoading } = useGetProductsQuery()

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>An error occurs </h2>
  }

  return (
    products && (
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
