/* eslint-disable no-underscore-dangle */
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import styles from './ProductPage.module.scss'
import { Rating } from '../../components/Rating'
import { QtyButton } from '../../components'
import { addToCart, useGetProductDetailsQuery } from '../../slices'
import { ErrorPage, Loader } from '../../components/UI'

function ProductPage() {
  const { id: productId } = useParams()
  const dispatch = useDispatch()

  const {
    data: product,
    error,
    isLoading,
  } = useGetProductDetailsQuery(productId as string)
  const fetchBaseQueryError = error as FetchBaseQueryError

  function onAddToCart() {
    dispatch(addToCart({ product, qty: 5 }))
  }

  if (isLoading) {
    return <Loader />
  }

  if (fetchBaseQueryError) {
    return fetchBaseQueryError.status === 404 ? (
      <ErrorPage variant='not-found' />
    ) : (
      <ErrorPage />
    )
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
              onClick={onAddToCart}
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
