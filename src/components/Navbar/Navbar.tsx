import { useEffect, useState } from 'react'
import { RiShoppingCartFill } from 'react-icons/ri'
import { FaChevronDown } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.scss'
import logo from '../../assets/img/logo.png'
import { Search } from '../Search'
import { RootState } from '../../store'
import { CartItem } from '../../types'
import { getClassNames } from '../../utils'
import { ROUTES } from '../../constants'
import { ClickAwayWrapper, SmallLoader } from '../UI'
import { useLogoutMutation, clearUserInfo } from '../../slices'

function Navbar() {
  const [isActive, setIsActive] = useState<boolean>(false)
  const { cartItems } = useSelector((state: RootState) => state.cart)
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [logout, { isLoading }] = useLogoutMutation()
  const dispatch = useDispatch()

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

  async function onLogout() {
    await logout()
    setIsActive(false)
    dispatch(clearUserInfo())
    navigate(ROUTES.login)
  }

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
          {userInfo ? (
            <ClickAwayWrapper onClickAway={() => setIsActive(false)}>
              <div className={styles.drawerContainer}>
                <button
                  onClick={() => setIsActive(!isActive)}
                  type='button'
                  className={styles.sigInButton}
                >
                  {userInfo.name}
                  <span>
                    <FaChevronDown
                      className={getClassNames([
                        styles.chevronIcon,
                        isActive && styles.rotate,
                      ])}
                    />
                  </span>
                </button>
                {isActive && (
                  <ul className={styles.drawer}>
                    <li>
                      <button type='button' onClick={onLogout}>
                        {isLoading ? (
                          <SmallLoader className={styles.loader} />
                        ) : (
                          'Logout'
                        )}
                      </button>
                    </li>
                    <li>
                      <Link to='/'>Profile</Link>
                    </li>
                  </ul>
                )}
              </div>
            </ClickAwayWrapper>
          ) : (
            <Link
              className={styles.sigInButton}
              to={`${ROUTES.login}?redirect=${pathname}`}
            >
              SIGN IN
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
