import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './CartPage.module.scss'
import { PRODUCT_IMAGE_ASPECT_RATIO, ROUTES } from '../../constants'
import { subString } from '../../utils'
import { RootState } from '../../store'
import { QtyButton } from '../../components'
import { Product } from '../../types'

const IMAGE_WIDTH = 150

function CartPage() {
  const { cartItems } = useSelector((state: RootState) => state.cart)

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Shopping Cart</h1>
      <div className={styles.container}>
        <div>
          {cartItems.map((product: Product) => (
            <div key={product._id} className={styles.productCard}>
              <img
                width={IMAGE_WIDTH}
                height={IMAGE_WIDTH * PRODUCT_IMAGE_ASPECT_RATIO}
                src={product.image}
                alt={product.name}
              />
              <div className={styles.descriptionContainer}>
                <Link to={ROUTES.product.replace(':id', product._id)}>
                  {subString(product.description, 30)}
                </Link>
                <QtyButton
                  className={styles.qtyButton}
                  countInStock={product.countInStock}
                />
                <p className={styles.price}>${product.price}</p>
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
