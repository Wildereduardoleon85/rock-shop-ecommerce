import { Link, useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import styles from './Form.module.scss'
import { getClassNames } from '../../utils'
import { Input, SmallLoader } from '../UI'
import { ROUTES } from '../../constants'

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
  profile: {
    title: 'User Profile',
    linkTo: null,
    linkToLabelP: null,
    linkToLabelSpan: null,
    buttonLabel: 'UPDATE',
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
  formInputs: FormInputs[]
  isLoading?: boolean
  redirect?: string
  onFormSubmit:
    | ((e: React.FormEvent<HTMLFormElement>) => Promise<void>)
    | ((e: React.FormEvent<HTMLFormElement>) => void)
  variant?: 'login' | 'register' | 'shipping' | 'profile'
  className?: string
}

function Form({
  formInputs,
  isLoading = false,
  redirect = '/',
  onFormSubmit,
  variant = 'login',
  className = '',
}: FormProps) {
  const navigate = useNavigate()

  const isAuthForm = variant === 'login' || variant === 'register'

  return (
    <div className={getClassNames([styles.root, className])}>
      {isAuthForm && (
        <button
          type='button'
          className={styles.goBackButton}
          onClick={() => navigate(-1)}
        >
          <IoMdArrowRoundBack />
          Go Back
        </button>
      )}
      <div className={styles.formContainer}>
        <h1>{CONFIG[variant].title}</h1>
        <form onSubmit={onFormSubmit}>
          <div className={styles.inputsCard}>
            {formInputs.map((formInputProps) => (
              <Input key={formInputProps.name} inputProps={formInputProps} />
            ))}
          </div>
          <div className={styles.buttonsContainer}>
            {variant === 'shipping' && <Link to={ROUTES.cart}>GO BACK</Link>}
            <button
              type='submit'
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? <SmallLoader /> : CONFIG[variant].buttonLabel}
            </button>
          </div>
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
    </div>
  )
}

export default Form
