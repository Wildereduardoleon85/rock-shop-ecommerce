import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import styles from './CartPage.module.scss'
import { PRODUCT_IMAGE_ASPECT_RATIO, ROUTES } from '../../constants'
import { formatCurrency, subString } from '../../utils'
import { RootState } from '../../store'
import { CartItem } from '../../types'
import { QtyButton } from '../../components'
import { removeItem } from '../../slices'

const IMAGE_WIDTH = 150

function CartPage() {
  const { cartItems, itemsPrice } = useSelector(
    (state: RootState) => state.cart
  )
  const { userInfo } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Shopping Cart</h1>
      <div className={styles.container}>
        <div>
          {cartItems.length > 0 &&
            cartItems[0]._id &&
            cartItems.map((product: CartItem) => (
              <div key={product._id} className={styles.productCard}>
                <img
                  width={IMAGE_WIDTH}
                  height={IMAGE_WIDTH * PRODUCT_IMAGE_ASPECT_RATIO}
                  src={product.image}
                  alt={product.name}
                />
                <div className={styles.descriptionContainer}>
                  <Link to={ROUTES.product.replace(':id', product._id)}>
                    {subString(product.name, 40)}
                  </Link>
                  <QtyButton
                    className={styles.qtyButton}
                    product={product}
                    isCartContext
                  />
                  <p className={styles.price}>
                    ${formatCurrency(product.price * product.qty)}
                  </p>
                  <button
                    onClick={() => dispatch(removeItem(product._id))}
                    className={styles.deleteButton}
                    type='button'
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className={styles.totalCard}>
          <h2>
            Subtotal (
            {cartItems.reduce(
              (acc: number, curr: CartItem) => acc + curr.qty,
              0
            )}
            ) items
          </h2>
          <p className={styles.subtotalPrice}>${formatCurrency(itemsPrice)}</p>
          <Link
            to={
              userInfo ? ROUTES.shipping : `${ROUTES.login}?redirect=/shipping`
            }
          >
            PROCEED TO CHECKOUT
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartPage
