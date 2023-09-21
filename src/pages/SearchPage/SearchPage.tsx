import { useSearchParams } from 'react-router-dom'
import { useGetProductsQuery } from '../../slices'
import { GobackButton, Loader } from '../../components/UI'
import { ErrorPage } from '..'
import { Showcase } from '../../components'
import styles from './SearchPage.module.scss'
import { capitalize } from '../../utils'

function SearchPage() {
  const [searchParams] = useSearchParams()
  const keywords = searchParams.get('keywords')

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

  console.log(products)

  return products && products.length > 0 ? (
    <>
      <GobackButton className={styles.backButton} />
      <Showcase
        title={capitalize(keywords as string)}
        className={styles.root}
        products={products}
      />
    </>
  ) : (
    <h1 className={styles.title}>No products found...</h1>
  )
}

export default SearchPage
