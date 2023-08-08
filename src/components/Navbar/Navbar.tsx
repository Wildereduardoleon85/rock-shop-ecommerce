import { RiShoppingCartFill } from 'react-icons/ri'
import styles from './Navbar.module.scss'
import logo from '../../assets/img/logo.png'
import { Search } from '../Search'

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <img src={logo} alt='logo' />
        </div>
        <div>
          <Search />
          <button type='button' className={styles.iconButton}>
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
