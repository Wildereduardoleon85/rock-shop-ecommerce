import { ProductCard } from '../../components'
import data from '../../data'
import styles from './HomePage.module.scss'

function HomePage() {
  return (
    <>
      <h1 className={styles.title}>Latest Products</h1>
      <div className={styles.container}>
        {data.map((product) => (
          // eslint-disable-next-line no-underscore-dangle
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  )
}

export default HomePage
