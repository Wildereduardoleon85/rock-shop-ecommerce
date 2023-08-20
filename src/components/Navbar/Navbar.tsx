import { useEffect, useState } from 'react'
import { RiShoppingCartFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.scss'
import logo from '../../assets/img/logo.png'
import { Search } from '../Search'
import { RootState } from '../../store'
import { CartItem } from '../../types'
import { getClassNames } from '../../utils'
import { ROUTES } from '../../constants'

function Navbar() {
  const { cartItems } = useSelector((state: RootState) => state.cart)
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setShouldAnimate(true)
    const timer = setTimeout(() => {
      setShouldAnimate(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [cartItems])

  const itemsInTheCart = cartItems.reduce(
    (acc: number, curr: CartItem) => acc + curr.qty,
    0
  )

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <img src={logo} alt='logo' />
        </div>
        <div>
          <Search />
          <Link to={ROUTES.cart} className={styles.iconButton}>
            {itemsInTheCart > 0 && (
              <div
                className={getClassNames([
                  styles.cartItems,
                  shouldAnimate && styles.animate,
                ])}
              >
                {itemsInTheCart}
              </div>
            )}
            <RiShoppingCartFill className={styles.cartIcon} />
          </Link>
          <Link
            className={styles.sigInButton}
            to={`${ROUTES.login}?redirect=${pathname}`}
          >
            SIGN IN
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
