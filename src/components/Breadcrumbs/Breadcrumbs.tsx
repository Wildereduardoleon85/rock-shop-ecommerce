import { FaChevronRight } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import styles from './Breadcrumbs.module.scss'
import { ROUTES } from '../../constants'

function Breadcrumbs() {
  const { pathname } = useLocation()
  const isPaymentActive = pathname === '/place-order' || pathname === '/payment'
  const isPlaceOrderActive = pathname === '/place-order'

  return (
    <div className={styles.root}>
      {isPaymentActive ? (
        <Link to={ROUTES.shipping}>Shipping</Link>
      ) : (
        <p>Shipping</p>
      )}
      <FaChevronRight />
      {isPlaceOrderActive ? (
        <Link to={ROUTES.payment}>Payment</Link>
      ) : (
        <p className={isPaymentActive ? styles.active : ''}>Payment</p>
      )}

      <FaChevronRight className={isPaymentActive ? styles.iconActive : ''} />
      <p className={isPlaceOrderActive ? styles.active : ''}>Place Order</p>
    </div>
  )
}

export default Breadcrumbs
