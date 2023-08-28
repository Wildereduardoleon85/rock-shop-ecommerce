import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useInput } from '../../hooks'
import { validateEmail, validatePassword } from '../../utils'
import { UseInput, UserInfo } from '../../types'
import { useLoginMutation } from '../../slices/usersApiSlice'
import { RootState } from '../../store'
import { setCredentials } from '../../slices'
import { Form } from '../../components'
import { Alert } from '../../components/UI'

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
  const [login, { isLoading, isError }] = useLoginMutation()
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

  const handleSubmit = async () => {
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
    <>
      {isError && (
        <Alert variant='error' message={errorMessage} trigger={isError} />
      )}
      <Form
        handleSubmit={handleSubmit}
        formInputs={formInputs}
        isLoading={isLoading}
        redirect={redirect}
        formValues={formValues}
      />
    </>
  )
}

export default LoginPage
