import { Link } from 'react-router-dom'
import { FaRegTimesCircle } from 'react-icons/fa'
import styles from './Form.module.scss'
import { capitalize, getClassNames } from '../../utils'
import { Input, SmallLoader } from '../UI'
import { ROUTES } from '../../constants'
import { UseInput } from '../../types'

const CONFIG = {
  login: {
    title: 'Sign In',
    linkTo: ROUTES.register,
    linkToLabelP: 'New Customer?',
    linkToLabelSpan: 'Register',
    buttonLabel: 'SIGN IN',
  },
  register: {
    title: 'Register',
    linkTo: ROUTES.login,
    linkToLabelP: 'Alredy have an account?',
    linkToLabelSpan: 'Login',
    buttonLabel: 'REGISTER',
  },
  shipping: {
    title: 'Shipping',
    linkTo: null,
    linkToLabelP: null,
    linkToLabelSpan: null,
    buttonLabel: 'CONTINUE',
  },
}

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

type FormProps = {
  errorMessage?: string
  formValues: UseInput[]
  formInputs: FormInputs[]
  isLoading?: boolean
  redirect?: string
  handleSubmit: () => void
  variant?: 'login' | 'register' | 'shipping'
  className?: string
}

function Form({
  errorMessage = '',
  formValues,
  formInputs,
  isLoading = false,
  redirect = '/',
  handleSubmit,
  variant = 'login',
  className = '',
}: FormProps) {
  function checkValidation(values: UseInput) {
    if (values.isValid) {
      return true
    }
    return false
  }

  const isFormValid = formValues.every(checkValidation)
  const isAuthForm = variant === 'login' || variant === 'register'

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isFormValid) {
      formValues.forEach((formValue: UseInput) => {
        formValue.onBlur()
      })
      return
    }

    handleSubmit()
  }

  return (
    <>
      {isAuthForm && (
        <div
          className={getClassNames([styles.toast, errorMessage && styles.show])}
        >
          <FaRegTimesCircle />
          {`Error: ${capitalize(errorMessage)}`}
        </div>
      )}
      <div className={getClassNames([styles.root, className])}>
        <h1>{CONFIG[variant].title}</h1>
        <form onSubmit={onSubmit}>
          {formInputs.map((formInputProps) => (
            <Input key={formInputProps.name} inputProps={formInputProps} />
          ))}
          <button
            type='submit'
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? <SmallLoader /> : CONFIG[variant].buttonLabel}
          </button>
          {isAuthForm && (
            <p className={styles.linkTo}>
              {CONFIG[variant].linkToLabelP}{' '}
              <span>
                <Link to={`${CONFIG[variant].linkTo}?redirect=${redirect}`}>
                  {CONFIG[variant].linkToLabelSpan}
                </Link>
              </span>
            </p>
          )}
        </form>
      </div>
    </>
  )
}

export default Form
