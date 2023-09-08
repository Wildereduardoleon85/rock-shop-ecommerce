import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import { IoMdArrowRoundBack } from 'react-icons/io'
import styles from './CartPage.module.scss'
import { PRODUCT_IMAGE_ASPECT_RATIO, ROUTES } from '../../constants'
import { formatCurrency, subString } from '../../utils'
import { RootState } from '../../store'
import { CartItem } from '../../types'
import { QtyButton } from '../../components'
import { isNotCartInfo } from '../../helpers'
import { ShoppingBagIcon } from '../../components/Icons'
import { removeItem } from '../../slices'
import { Button } from '../../components/UI'

const IMAGE_WIDTH = 150

function CartPage() {
  const cart = useSelector((state: RootState) => state.cart)
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const { cartItems, itemsPrice } = cart
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onCheckoutClick = () => {
    navigate(userInfo ? ROUTES.shipping : `${ROUTES.login}?redirect=/shipping`)
  }

  return (
    <div className={styles.root}>
      <Link to={ROUTES.home} className={styles.goBackButton}>
        <IoMdArrowRoundBack />
        Go Back
      </Link>
      <h1 className={styles.title}>Shopping Cart</h1>
      <div className={styles.container}>
        <div>
          {isNotCartInfo(cart) ? (
            <div className={styles.emptyCartContainer}>
              <ShoppingBagIcon />
              <h2 className={styles.emptyCartTitle}>Your Cart is Empty</h2>
              <h3>Start adding products to the cart!</h3>
              <Link to={ROUTES.home}>DISCOVER PRODUCTS</Link>
            </div>
          ) : (
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
            ))
          )}
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

          <Button
            className={styles.checkoutButton}
            onClick={onCheckoutClick}
            disabled={isNotCartInfo(cart)}
            large
          >
            PROCEED TO CHECKOUT
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartPage
