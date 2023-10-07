import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import styles from './ProductPage.module.scss'
import { Rating } from '../../components/Rating'
import { Meta, QtyButton, Reviews } from '../../components'
import {
  addToCart,
  setAlert,
  setQty,
  useGetProductDetailsQuery,
} from '../../slices'
import { Button, GobackButton, Loader } from '../../components/UI'
import { Product, Review } from '../../types'
import { BASE_URL, IMAGES_URL, LG_BREAKPOINT, ROUTES } from '../../constants'
import { RootState } from '../../store'
import { ErrorPage } from '..'
import { useMediaQuery } from '../../hooks'

function ProductPage() {
  const { id: productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    data: product,
    error,
    isLoading,
    refetch,
  } = useGetProductDetailsQuery(productId as string)
  const fetchBaseQueryError = error as FetchBaseQueryError
  const { qty } = useSelector((state: RootState) => state.qty)
  const screenSize = useMediaQuery()

  useEffect(() => {
    dispatch(setQty(1))
  }, [])

  const onAddToCart = () => {
    dispatch(addToCart({ product: product as Product, qty }))
    dispatch(setAlert({ message: 'product added to the cart' }))
  }

  const onByuNow = () => {
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
        <Meta title={product.name} description={product.description} />
        <div className={styles.root}>
          <GobackButton />
          <div className={styles.container}>
            <div className={styles.imageContainer}>
              <img
                width={644}
                height={512}
                src={`${BASE_URL}${IMAGES_URL}/${product.image}`}
                alt={product.name}
              />
              {screenSize > LG_BREAKPOINT && (
                <Reviews
                  refetch={refetch}
                  productId={product._id}
                  reviews={product.reviews as Review[]}
                />
              )}
            </div>

            <div className={styles.details}>
              <h1>{product.name}</h1>
              <p className={styles.price}>${product.price}</p>
              <QtyButton className={styles.qtyButton} product={product} />
              <Button
                disabled={product.countInStock === 0}
                className={styles.addToCartButton}
                onClick={onAddToCart}
              >
                ADD TO CART
              </Button>
              <Button
                color='black'
                disabled={product.countInStock === 0}
                className={styles.buyNowButton}
                onClick={onByuNow}
              >
                BUY NOW
              </Button>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <h2>Description</h2>
              <p className={styles.description}>{product.description}</p>
            </div>
            {screenSize <= LG_BREAKPOINT && (
              <Reviews
                refetch={refetch}
                productId={product._id}
                reviews={product.reviews as Review[]}
              />
            )}
          </div>
        </div>
      </>
    )
  )
}

export default ProductPage
