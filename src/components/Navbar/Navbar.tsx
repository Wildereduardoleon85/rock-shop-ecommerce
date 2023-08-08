import styles from './Navbar.module.scss'
import logo from '../../assets/img/logo.png'

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.iconContainer}>
        <img src={logo} alt='logo' />
      </div>
    </nav>
  )
}

export default Navbar
