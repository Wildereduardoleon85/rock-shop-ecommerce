import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useInput } from '../../hooks'
import { validateEmail, validatePassword } from '../../helpers'
import { UseInput, UserInfo } from '../../types'
import { useLoginMutation } from '../../slices/usersApiSlice'
import { RootState } from '../../store'
import { setCredentials } from '../../slices'
import { AuthFormContainer, Form } from '../../components'
import styles from './Login.module.scss'

const emailInputProps = {
  initialValue: '',
  validateFunction: validateEmail,
}

const passwordInputProps = {
  initialValue: '',
  validateFunction: validatePassword,
  validateArg: true,
}

function LoginPage() {
  const emailInput = useInput(emailInputProps)
  const passwordInput = useInput(passwordInputProps)
  const formValues: UseInput[] = [emailInput, passwordInput]
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const { search } = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') ?? '/'
  const [login, { isLoading }] = useLoginMutation()
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

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

  function checkValidation(values: UseInput) {
    if (values.isValid) {
      return true
    }
    return false
  }

  const isFormValid = formValues.every(checkValidation)

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (errorMessage) {
      setErrorMessage('')
    }

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
      setErrorMessage(err?.data?.message || 'Internal server error')
    }
  }

  return (
    <AuthFormContainer
      variant='login'
      errorMessage={errorMessage}
      redirect={redirect}
    >
      <Form
        className={styles.form}
        onFormSubmit={onFormSubmit}
        formInputs={formInputs}
        isLoading={isLoading}
        buttonLabel='SIGN IN'
      />
    </AuthFormContainer>
  )
}

export default LoginPage
