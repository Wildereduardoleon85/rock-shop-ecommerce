import { Link } from 'react-router-dom'
import styles from './ErrorPage.module.scss'
import { ERROR_PAGE_CONFIG, ROUTES } from '../../constants'
import { ErrorPageEnums } from '../../types'

type ErrorPageProps = {
  variant?: ErrorPageEnums
}

function ErrorPage({ variant = 'internal-server-error' }: ErrorPageProps) {
  return (
    <div className={styles.root}>
      <p className={styles.code}>{ERROR_PAGE_CONFIG[variant].code}</p>
      <h2 className={styles.title}>{ERROR_PAGE_CONFIG[variant].title}</h2>
      <p className={styles.message}>{ERROR_PAGE_CONFIG[variant].message}</p>
      {variant !== 'internal-server-error' && (
        <Link to={ROUTES.home}>GO TO HOME PAGE</Link>
      )}
    </div>
  )
}

export default ErrorPage
