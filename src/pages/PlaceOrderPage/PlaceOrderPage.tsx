import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Breadcrumbs } from '../../components'
import styles from './PlaceOrderPage.module.scss'
import { RootState } from '../../store'
import { ROUTES } from '../../constants'
import { capitalize, formatCurrency } from '../../utils'

function PlaceOrderPage() {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = useSelector((state: RootState) => state.cart)

  return (
    <>
      <Breadcrumbs />
      <div className={styles.root}>
        <div className={styles.leftContainer}>
          <div className={styles.descriptionCard}>
            <h2>Shipping</h2>
            <p>
              Address:
              <span>{capitalize(shippingAddress.address)}</span>
            </p>
          </div>
          <div className={styles.descriptionCard}>
            <h2>Payment Method</h2>
            <p>
              Method: <span>{capitalize(paymentMethod)}</span>
            </p>
          </div>
          <div className={styles.descriptionCard}>
            <h2>Order Items</h2>
            {cartItems.map((item) => (
              <div key={item._id} className={styles.items}>
                <img src={item.image} alt={item.name} width={50} />
                <Link to={ROUTES.product.replace(':id', item._id)}>
                  {item.name}
                </Link>
                <p>
                  {`${item.qty} x $${formatCurrency(
                    item.price
                  )} = $${formatCurrency(item.price * item.qty)}`}
                </p>
              </div>
            ))}
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
            <button className={styles.placeOrderButton} type='button'>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaceOrderPage
