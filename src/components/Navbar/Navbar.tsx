import { Link } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import styles from './Navbar.module.scss'
import logo from '../../assets/img/logo.png'
import { Search } from '../Search'
import { ROUTES } from '../../constants'
import { useMediaQuery } from '../../hooks'
import { CartButton, SignInButton } from '..'
import { toggleRibbon } from '../../slices'

function Navbar() {
  const screenSize = useMediaQuery()
  const dispatch = useDispatch()

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to={ROUTES.home} className={styles.iconContainer}>
          <img width={260} src={logo} alt='logo' />
        </Link>
        <div>
          {screenSize > 945 && <Search />}
          {screenSize <= 650 ? (
            <button
              className={styles.hamburguerMenu}
              type='button'
              aria-label='menu'
              onClick={() => dispatch(toggleRibbon())}
            >
              <AiOutlineMenu />
            </button>
          ) : (
            <>
              <CartButton />
              <SignInButton />
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
