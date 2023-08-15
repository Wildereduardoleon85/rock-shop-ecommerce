import { useEffect, useState } from 'react'
import { RiShoppingCartFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import styles from './Navbar.module.scss'
import logo from '../../assets/img/logo.png'
import { Search } from '../Search'
import { RootState } from '../../store'
import { CartItem } from '../../types'
import { getClassNames } from '../../utils'

function Navbar() {
  const { cartItems } = useSelector((state: RootState) => state.cart)
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false)

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
          <button type='button' className={styles.iconButton}>
            {itemsInTheCart && (
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
          </button>
          <button className={styles.sigInButton} type='button'>
            SIGN IN
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
