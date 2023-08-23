import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useInput } from '../../hooks'
import { validateEmail, validatePassword } from '../../utils'
import { UseInput, UserInfo } from '../../types'
import { useLoginMutation } from '../../slices/usersApiSlice'
import { RootState } from '../../store'
import { setCredentials } from '../../slices'
import { Auth } from '../../components'

function LoginPage() {
  const emailInput = useInput('', validateEmail)
  const passwordInput = useInput('', validatePassword)
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

  const handleAuth = async () => {
    try {
      const credentials: UserInfo = await login({
        email: emailInput.value,
        password: passwordInput.value,
      }).unwrap()
      dispatch(setCredentials(credentials))
      navigate(redirect)
    } catch (err: any) {
      if (err.status === 401) {
        setErrorMessage(err.data.message)
      } else {
        setErrorMessage('Something went wrong')
      }
    }
  }

  return (
    <Auth
      errorMessage={errorMessage}
      handleAuth={handleAuth}
      formInputs={formInputs}
      isLoading={isLoading}
      redirect={redirect}
      formValues={formValues}
    />
  )
}

export default LoginPage
