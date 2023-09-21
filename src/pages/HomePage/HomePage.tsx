import { useLocation } from 'react-router-dom'
import { ErrorPage } from '..'
import { Carousel, ProductCard } from '../../components'
import { Loader } from '../../components/UI'
import { useGetProductsQuery } from '../../slices'
import styles from './HomePage.module.scss'
import { getClassNames } from '../../utils'

function HomePage() {
  const { search } = useLocation()
  const keywords = search.split('keywords=')[1]
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsQuery(keywords ? { keywords } : {})

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

  function renderProducts() {
    if (products) {
      if (products.length === 0) {
        return <h1 className={styles.title}>No products found...</h1>
      }

      return (
        <>
          <Carousel
            images={products.map((product) => ({
              name: product.name,
              id: product._id,
              images: product.image,
              alt: product.name,
              price: product.price,
            }))}
          />

          <h1
            className={getClassNames([
              styles.title,
              search && styles.titleMargin,
            ])}
          >
            Latest Products
          </h1>
          <div className={styles.container}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )
    }
    return null
  }

  return renderProducts()
}

export default HomePage
