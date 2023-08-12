/* eslint-disable no-underscore-dangle */
import { useParams, Link } from 'react-router-dom'
import styles from './ProductPage.module.scss'
import { Rating } from '../../components/Rating'
import { QtyButton } from '../../components'
import { useGetProductDetailsQuery } from '../../slices'
import { Loader } from '../../components/UI'

function ProductPage() {
  const { id: productId } = useParams()

  const {
    data: product,
    isError,
    isLoading,
  } = useGetProductDetailsQuery(productId as string)

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <h2>THIS SHOULD BE AN ERROR PAGE</h2>
  }

  return (
    product && (
      <div className={styles.root}>
        <Link className={styles.goBackButton} to='/'>
          Go Back
        </Link>
        <div className={styles.container}>
          <img
            width={636}
            height={506}
            src={product.image}
            alt={product.name}
          />
          <div className={styles.details}>
            <h1>{product.name}</h1>
            <p className={styles.price}>${product.price}</p>
            <QtyButton countInStock={product.countInStock} />
            <button
              disabled={product.countInStock === 0}
              type='button'
              className={styles.addToCartButton}
            >
              add to cart
            </button>
            <button
              disabled={product.countInStock === 0}
              type='button'
              className={styles.buyNowButton}
            >
              buy now
            </button>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            <h3>Description</h3>
            <p className={styles.description}>{product.description}</p>
          </div>
        </div>
      </div>
    )
  )
}

export default ProductPage
