import { ProductCard } from '../../components'
import { ErrorPage, Loader } from '../../components/UI'
import { useGetProductsQuery } from '../../slices'
import styles from './HomePage.module.scss'

function HomePage() {
  const { data: products, isError, isLoading } = useGetProductsQuery()

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <ErrorPage />
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
