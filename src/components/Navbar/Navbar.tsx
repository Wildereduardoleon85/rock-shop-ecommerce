import { useState } from 'react'
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
import { useMediaQuery } from '../../hooks'

function Navbar() {
  const [isActive, setIsActive] = useState<boolean>(false)
  const { cartItems } = useSelector((state: RootState) => state.cart)
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [logout, { isLoading }] = useLogoutMutation()
  const dispatch = useDispatch()
  const screenSize = useMediaQuery()

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

  function onProfileButtonClick(linkTo: string) {
    setIsActive(false)
    navigate(linkTo)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to={ROUTES.home} className={styles.iconContainer}>
          <img width={260} src={logo} alt='logo' />
        </Link>
        <div>
          {screenSize > 945 && <Search />}
          <Link to={ROUTES.cart} className={styles.iconButton}>
            {itemsInTheCart > 0 && (
              <div className={styles.cartItems}>{itemsInTheCart}</div>
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
                      <button
                        type='button'
                        onClick={() => onProfileButtonClick(ROUTES.profile)}
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button type='button' onClick={onLogout}>
                        {isLoading ? (
                          <SmallLoader className={styles.loader} />
                        ) : (
                          'Logout'
                        )}
                      </button>
                    </li>

                    {userInfo.isAdmin && (
                      <>
                        <p>Admin:</p>
                        <li>
                          <button
                            type='button'
                            onClick={() =>
                              onProfileButtonClick(ROUTES.orderList)
                            }
                          >
                            Orders
                          </button>
                        </li>
                        <li>
                          <button
                            type='button'
                            onClick={() =>
                              onProfileButtonClick(ROUTES.productList)
                            }
                          >
                            Products
                          </button>
                        </li>
                        <li>
                          <button
                            type='button'
                            onClick={() =>
                              onProfileButtonClick(ROUTES.userList)
                            }
                          >
                            Users
                          </button>
                        </li>
                      </>
                    )}
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
