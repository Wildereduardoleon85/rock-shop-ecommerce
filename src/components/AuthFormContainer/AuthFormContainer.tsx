import { Link } from 'react-router-dom'
import styles from './AuthFormContainer.module.scss'
import { ROUTES } from '../../constants'
import { Meta } from '..'

type AuthformContainerProps = {
  children: React.ReactNode
  redirect: string
  variant: 'login' | 'register'
}

function AuthFormContainer({
  redirect,
  children,
  variant,
}: AuthformContainerProps) {
  return (
    <>
      <Meta />
      <div className={styles.container}>
        <h1>{variant === 'login' ? 'Sign In' : 'Register'}</h1>
        {children}
        <div className={styles.links}>
          <p>
            {variant === 'login' ? 'New Customer?' : 'Alredy have an account?'}
          </p>
          <Link
            to={`${
              variant === 'login' ? ROUTES.register : ROUTES.login
            }?redirect=${redirect}`}
          >
            {variant === 'login' ? 'Register' : 'Login'}
          </Link>
        </div>
      </div>
    </>
  )
}

export default AuthFormContainer
