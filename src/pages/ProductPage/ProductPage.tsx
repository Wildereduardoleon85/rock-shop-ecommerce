import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { IoMdArrowRoundBack } from 'react-icons/io'
import styles from './ProductPage.module.scss'
import { Rating } from '../../components/Rating'
import { QtyButton } from '../../components'
import { addToCart, setQty, useGetProductDetailsQuery } from '../../slices'
import { Alert, ErrorPage, Loader } from '../../components/UI'
import { Product } from '../../types'
import { ROUTES } from '../../constants'
import { RootState } from '../../store'

function ProductPage() {
  const { id: productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductDetailsQuery(productId as string)
  const fetchBaseQueryError = error as FetchBaseQueryError
  const { qty } = useSelector((state: RootState) => state.qty)
  const cart = useSelector((state: RootState) => state.cart)

  useEffect(() => {
    dispatch(setQty(1))
  }, [])

  function onAddToCart() {
    dispatch(addToCart({ product: product as Product, qty }))
    setShowAlert(true)
  }

  function onByuNow() {
    dispatch(addToCart({ product: product as Product, qty }))
    navigate(ROUTES.cart)
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
      <>
        {showAlert && (
          <Alert
            variant='productAddedToCart'
            product={product}
            trigger={cart}
            duration={5000}
          />
        )}
        <div className={styles.root}>
          <Link to={ROUTES.home}>
            <IoMdArrowRoundBack />
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
              <QtyButton className={styles.qtyButton} product={product} />
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
                onClick={onByuNow}
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
      </>
    )
  )
}

export default ProductPage
