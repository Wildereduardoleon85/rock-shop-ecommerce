import { Link } from 'react-router-dom'
import { FaRegTimesCircle } from 'react-icons/fa'
import styles from './Auth.module.scss'
import { capitalize, getClassNames } from '../../utils'
import { Input, SmallLoader } from '../UI'
import { ROUTES } from '../../constants'
import { UseInput } from '../../types'

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
  formValues: UseInput[]
  formInputs: FormInputs[]
  isLoading: boolean
  redirect: string
  handleAuth: () => void
  variant?: 'login' | 'register'
}

function Auth({
  errorMessage,
  formValues,
  formInputs,
  isLoading,
  redirect,
  handleAuth,
  variant = 'login',
}: AuthProps) {
  function checkValidation(values: UseInput) {
    if (values.isValid) {
      return true
    }
    return false
  }

  const isFormValid = formValues.every(checkValidation)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isFormValid) {
      formValues.forEach((formValue: UseInput) => {
        formValue.onBlur()
      })
      return
    }

    handleAuth()
  }

  const buttonLabel = variant === 'login' ? 'SIGN IN' : 'REGISTER'

  return (
    <>
      <div
        className={getClassNames([styles.toast, errorMessage && styles.show])}
      >
        <FaRegTimesCircle />
        {`Error: ${capitalize(errorMessage)}`}
      </div>
      <div className={styles.root}>
        <h1>{variant === 'login' ? 'Sign In' : 'Register'}</h1>
        <form onSubmit={onSubmit}>
          {formInputs.map((formInputProps) => (
            <Input key={formInputProps.name} inputProps={formInputProps} />
          ))}
          <button
            type='submit'
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? <SmallLoader /> : buttonLabel}
          </button>
          <p className={styles.toRegister}>
            {variant === 'login' ? 'New Customer?' : 'Alredy have an account?'}{' '}
            <span>
              <Link
                to={`${
                  variant === 'login' ? ROUTES.register : ROUTES.login
                }?redirect=${redirect}`}
              >
                {variant === 'login' ? 'Register' : 'Login'}
              </Link>
            </span>
          </p>
        </form>
      </div>
    </>
  )
}

export default Auth
