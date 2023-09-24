import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaChevronDown } from 'react-icons/fa'
import { ClickAwayWrapper, SmallLoader } from '../UI'
import styles from './SignInButton.module.scss'
import { RootState } from '../../store'
import { getClassNames } from '../../utils'
import { ROUTES } from '../../constants'
import { clearUserInfo, useLogoutMutation } from '../../slices'

function SignInButton() {
  const [isActive, setIsActive] = useState<boolean>(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const [logout, { isLoading }] = useLogoutMutation()

  function onProfileButtonClick(linkTo: string) {
    setIsActive(false)
    navigate(linkTo)
  }

  async function onLogout() {
    await logout()
    setIsActive(false)
    dispatch(clearUserInfo())
    navigate(ROUTES.login)
  }

  return userInfo ? (
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
                    onClick={() => onProfileButtonClick(ROUTES.orderList)}
                  >
                    Orders
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    onClick={() => onProfileButtonClick(ROUTES.productList)}
                  >
                    Products
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    onClick={() => onProfileButtonClick(ROUTES.userList)}
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
  )
}

export default SignInButton
