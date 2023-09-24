import { RiShoppingCartFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './CartButton.module.scss'
import { ROUTES } from '../../constants'
import { RootState } from '../../store'
import { CartItem } from '../../types'

function CartButton() {
  const { cartItems } = useSelector((state: RootState) => state.cart)
  const itemsInTheCart = cartItems.reduce(
    (acc: number, curr: CartItem) => acc + curr.qty,
    0
  )

  return (
    <Link to={ROUTES.cart} className={styles.iconButton}>
      {itemsInTheCart > 0 && (
        <div className={styles.cartItems}>{itemsInTheCart}</div>
      )}
      <RiShoppingCartFill className={styles.cartIcon} />
    </Link>
  )
}

export default CartButton
