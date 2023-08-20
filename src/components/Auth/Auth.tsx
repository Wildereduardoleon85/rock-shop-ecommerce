import { Link } from 'react-router-dom'
import { FaRegTimesCircle } from 'react-icons/fa'
import styles from 'Auth.module.scss'
import { getClassNames } from '../../utils'
import { Input, SmallLoader } from '../UI'
import { ROUTES } from '../../constants'

type FormInputs = {
  name: string
  type: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  value: string
  error: string
  label: string
}

type AuthProps = {
  errorMessage: string
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  formInputs: FormInputs[]
  isLoading: boolean
  redirect: string
}

function Auth({
  errorMessage,
  onSubmit,
  formInputs,
  isLoading,
  redirect,
}: AuthProps) {
  return (
    <>
      <div
        className={getClassNames([styles.toast, errorMessage && styles.show])}
      >
        <FaRegTimesCircle />
        {errorMessage}
      </div>
      <div className={styles.root}>
        <h1>Sign In</h1>
        <form onSubmit={onSubmit}>
          {formInputs.map((formInputProps) => (
            <Input key={formInputProps.name} inputProps={formInputProps} />
          ))}
          <button
            type='submit'
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? <SmallLoader /> : 'SIGN IN'}
          </button>
          <p className={styles.toRegister}>
            New Customer?{' '}
            <span>
              <Link to={`${ROUTES.register}?redirect=${redirect}`}>
                Register
              </Link>
            </span>
          </p>
        </form>
      </div>
    </>
  )
}

export default Auth
