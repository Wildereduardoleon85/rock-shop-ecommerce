import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaRegTimesCircle } from 'react-icons/fa'
import styles from './LoginPage.module.scss'
import { useInput } from '../../hooks'
import { getClassNames, validateEmail, validatePassword } from '../../utils'
import { Input, SmallLoader } from '../../components/UI'
import { UseInput, UserInfo } from '../../types'
import { ROUTES } from '../../constants'
import { useLoginMutation } from '../../slices/usersApiSlice'
import { RootState } from '../../store'
import { setCredentials } from '../../slices'

function LoginPage() {
  const emailInput = useInput('', validateEmail)
  const passwordInput = useInput('', validatePassword)
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const { search } = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') ?? '/'
  const [login, { isLoading }] = useLoginMutation()
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('')
    }, 3000)
    return () => clearTimeout(timer)
  }, [errorMessage])

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const formValues: UseInput[] = [emailInput, passwordInput]

  function checkValidation(values: UseInput) {
    if (values.isValid) {
      return true
    }
    return false
  }

  const isFormValid = formValues.every(checkValidation)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!isFormValid) {
      formValues.forEach((formValue: UseInput) => {
        formValue.onBlur()
      })
      return
    }

    try {
      const credentials: UserInfo = await login({
        email: emailInput.value,
        password: passwordInput.value,
      }).unwrap()
      dispatch(setCredentials(credentials))
      navigate(redirect)
    } catch (err: any) {
      if (err.status === 401) {
        setErrorMessage('Invalid credentials')
      } else {
        setErrorMessage('Something went wrong')
      }
    }
  }

  const formInputs = [
    {
      name: 'email',
      type: 'text',
      placeholder: 'joe@email.com',
      onChange: emailInput.onChange,
      onBlur: emailInput.onBlur,
      value: emailInput.value,
      error: emailInput.error,
      label: 'Email',
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Enter password',
      onChange: passwordInput.onChange,
      onBlur: passwordInput.onBlur,
      value: passwordInput.value,
      error: passwordInput.error,
      label: 'Password',
    },
  ]

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

export default LoginPage
