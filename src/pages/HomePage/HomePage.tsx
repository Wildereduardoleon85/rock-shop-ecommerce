import { ErrorPage } from '..'
import { ProductCard } from '../../components'
import { Loader } from '../../components/UI'
import { useGetProductsQuery } from '../../slices'
import styles from './HomePage.module.scss'

function HomePage() {
  const { data: products, error, isLoading } = useGetProductsQuery()

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    const err = error as any
    if (err.status === 404) {
      return <ErrorPage variant='not-found' message={err.data.message} />
    }
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
