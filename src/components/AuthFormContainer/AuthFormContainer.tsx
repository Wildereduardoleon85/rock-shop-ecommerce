import { Link } from 'react-router-dom'
import styles from './AuthFormContainer.module.scss'
import { Alert } from '../UI'
import { ROUTES } from '../../constants'

type AuthformContainerProps = {
  errorMessage: string
  children: React.ReactNode
  redirect: string
  variant: 'login' | 'register'
}

function AuthFormContainer({
  errorMessage,
  redirect,
  children,
  variant,
}: AuthformContainerProps) {
  return (
    <>
      <Alert variant='error' message={errorMessage} />
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
