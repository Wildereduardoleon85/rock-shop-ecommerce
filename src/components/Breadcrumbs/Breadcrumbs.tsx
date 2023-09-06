import { FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styles from './Breadcrumbs.module.scss'
import { ROUTES } from '../../constants'
import { getClassNames } from '../../utils'

type BreadcrumbsProps = {
  step1?: boolean
  step2?: boolean
  step3?: boolean
}

function Breadcrumbs({ step1, step2, step3 }: BreadcrumbsProps) {
  return (
    <div className={styles.root}>
      <Link
        className={getClassNames([styles.link, styles.active])}
        to={ROUTES.home}
      >
        Home
      </Link>
      <FaChevronRight
        className={getClassNames([styles.icon, styles.iconActive])}
      />

      {step1 ? (
        <Link
          className={getClassNames([styles.link, step1 && styles.active])}
          to={ROUTES.shipping}
        >
          Shipping
        </Link>
      ) : (
        <p>Shipping</p>
      )}
      <FaChevronRight
        className={getClassNames([styles.icon, step1 && styles.iconActive])}
      />

      {step2 ? (
        <Link
          className={getClassNames([styles.link, step2 && styles.active])}
          to={ROUTES.payment}
        >
          Payment
        </Link>
      ) : (
        <p>Payment</p>
      )}
      <FaChevronRight
        className={getClassNames([styles.icon, step2 && styles.iconActive])}
      />

      <p className={step3 ? styles.pActive : ''}>Place Order</p>
    </div>
  )
}

export default Breadcrumbs
