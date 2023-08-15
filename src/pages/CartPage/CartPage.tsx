import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './CartPage.module.scss'
import { PRODUCT_IMAGE_ASPECT_RATIO, ROUTES } from '../../constants'
import { formatCurrency, subString } from '../../utils'
import { RootState } from '../../store'
import { CartItem } from '../../types'
import { QtyButton } from '../../components'

const IMAGE_WIDTH = 150

function CartPage() {
  const { cartItems } = useSelector((state: RootState) => state.cart)

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Shopping Cart</h1>
      <div className={styles.container}>
        <div>
          {cartItems.map((product: CartItem) => (
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
              </div>
            </div>
          ))}
        </div>

        <div className={styles.totalCard}>total card</div>
      </div>
    </div>
  )
}

export default CartPage
