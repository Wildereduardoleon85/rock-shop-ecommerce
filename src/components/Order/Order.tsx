import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { IoIosWarning } from 'react-icons/io'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import styles from './Order.module.scss'
import { capitalize, formatCurrency, subString } from '../../utils'
import { BASE_URL, IMAGES_URL, ROUTES } from '../../constants'
import { Button, GobackButton } from '../UI'
import { ShippingAddress, CartItem } from '../../types'
import { setAlert, useDeliverOrderMutation } from '../../slices'
import { RootState } from '../../store'

type OrderItem = {
  name: string
  qty: number
  image: string
  price: number
  product: string
  _id: string
}

type OrderProps = {
  variant: 'place-order' | 'order-details'
  cartItems: OrderItem[] | CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  isLoading?: boolean
  orderId?: string
  onPlaceOrder?: () => Promise<void>
  isPaid?: boolean
  isDelivered?: boolean
  user?: {
    _id: string
    name: string
    email: string
  }
  refetch?: () => void
}

type PaidDeliveredTagProps = {
  isDelivered?: boolean
  isPaid?: boolean
  variant: 'paid' | 'delivered'
}

function PaidDeliveredTag({
  variant,
  isDelivered,
  isPaid,
}: PaidDeliveredTagProps) {
  if (variant === 'delivered') {
    return isDelivered ? (
      <div className={styles.paidDeliveredBanner}>
        <BsFillCheckCircleFill className={styles.checkIcon} /> Delivered
      </div>
    ) : (
      <div className={styles.paidDeliveredBanner}>
        <IoIosWarning className={styles.warningIcon} /> Not delivered
      </div>
    )
  }

  return isPaid ? (
    <div className={styles.paidDeliveredBanner}>
      <BsFillCheckCircleFill className={styles.checkIcon} /> Paid
    </div>
  ) : (
    <div className={styles.paidDeliveredBanner}>
      <IoIosWarning className={styles.warningIcon} /> Not paid
    </div>
  )
}

function Order({
  cartItems,
  shippingAddress,
  paymentMethod,
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
  isLoading,
  orderId,
  onPlaceOrder,
  variant,
  isPaid,
  isDelivered,
  user,
  refetch,
}: OrderProps) {
  const { pathname } = useLocation()
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const [deliverOrder, { isLoading: isDeliverLoading }] =
    useDeliverOrderMutation()
  const dispatch = useDispatch()

  const onMarkAsDelivered = async () => {
    try {
      await deliverOrder(orderId as string).unwrap()
      dispatch(setAlert({ message: 'mark as delivered successfully' }))
      if (refetch) refetch()
    } catch (error: any) {
      dispatch(
        setAlert({
          variant: 'error',
          message: error?.data?.message || 'something went wrong',
        })
      )
    }
  }

  return (
    <>
      {variant === 'order-details' && (
        <>
          <GobackButton className={styles.gobackButton} to={ROUTES.orderList} />
          <h1 className={styles.title}>
            Order <span>{orderId}</span>
          </h1>
        </>
      )}
      <div className={styles.root}>
        <div className={styles.leftContainer}>
          <div className={styles.descriptionCard}>
            <h2>Shipping</h2>
            {variant === 'order-details' && (
              <>
                <p>
                  Name:
                  <span>{user?.name}</span>
                </p>
                <p>
                  Email:
                  <span>{user?.email}</span>
                </p>
              </>
            )}
            <p>
              Address:
              <span>{capitalize(shippingAddress.address)}</span>
            </p>
            {variant === 'order-details' && (
              <PaidDeliveredTag isDelivered={isDelivered} variant='delivered' />
            )}
          </div>
          <div className={styles.descriptionCard}>
            <h2>Payment Method</h2>
            <p>
              Method: <span>{`Card ending in ${paymentMethod}`}</span>
            </p>
            {variant === 'order-details' && (
              <PaidDeliveredTag variant='paid' isPaid={isPaid} />
            )}
          </div>
          <div className={styles.descriptionCard}>
            <h2>Order Items</h2>
            {cartItems.map((item) => {
              const orderItem = item as OrderItem
              return (
                <div key={item._id} className={styles.items}>
                  <img
                    src={`${BASE_URL}${IMAGES_URL}/${item.image}`}
                    alt={item.name}
                    width={50}
                  />
                  <Link
                    to={`${ROUTES.product.replace(
                      ':id',
                      orderItem.product
                    )}?redirect=${pathname}`}
                  >
                    {subString(item.name, 100)}
                  </Link>
                  <p>
                    {`${item.qty} x $${formatCurrency(
                      item.price
                    )} = $${formatCurrency(item.price * item.qty)}`}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.summaryCard}>
            <h1>Order Summary</h1>
            <div>
              <p>Items:</p>
              <p>${formatCurrency(itemsPrice)}</p>
            </div>
            <div>
              <p>Shipping:</p>
              <p>${formatCurrency(shippingPrice)}</p>
            </div>
            <div>
              <p>Tax:</p>
              <p>${formatCurrency(taxPrice)}</p>
            </div>
            <div>
              <p>Total:</p>
              <p>${formatCurrency(totalPrice)}</p>
            </div>
            {variant === 'order-details' &&
              userInfo?.isAdmin &&
              isPaid &&
              !isDelivered && (
                <Button
                  className={styles.placeOrderButton}
                  onClick={onMarkAsDelivered}
                  disabled={isDeliverLoading}
                  isLoading={isDeliverLoading}
                  large
                >
                  MARK AS DELIVERED
                </Button>
              )}
            {variant === 'place-order' && (
              <Button
                className={styles.placeOrderButton}
                onClick={onPlaceOrder}
                disabled={isLoading}
                isLoading={isLoading}
                large
              >
                PLACE ORDER
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Order
