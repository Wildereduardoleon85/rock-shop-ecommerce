import { Link } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import styles from './Navbar.module.scss'
import logo from '../../assets/img/logo.png'
import { Search } from '../Search'
import { LG_BREAKPOINT, ROUTES } from '../../constants'
import { useMediaQuery } from '../../hooks'
import { CartButton, SignInButton } from '..'
import { toggleRibbon } from '../../slices'

function Navbar() {
  const screenSize = useMediaQuery()
  const dispatch = useDispatch()
  const isMobile = screenSize <= LG_BREAKPOINT

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link
          to={ROUTES.home}
          className={styles.iconContainer}
          aria-label='home page'
        >
          <img width={260} src={logo} alt='logo' />
        </Link>
        <div>
          {isMobile ? (
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
              <Search />
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
