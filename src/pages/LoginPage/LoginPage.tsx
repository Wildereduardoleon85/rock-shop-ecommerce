import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useFormValues } from '../../hooks'
import { UseInput, UserInfo } from '../../types'
import { useLoginMutation } from '../../slices/usersApiSlice'
import { RootState } from '../../store'
import { setAlert, setCredentials } from '../../slices'
import { AuthFormContainer, Form } from '../../components'
import styles from './Login.module.scss'
import { loginFormValues } from '../../config'
import { isFormValid } from '../../helpers'

function LoginPage() {
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const { search } = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') ?? '/'
  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const formValues = useFormValues(loginFormValues)
  const [emailInput, passwordInput] = formValues

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isFormValid(formValues)) {
      try {
        const credentials: UserInfo = await login({
          email: emailInput.value,
          password: passwordInput.value,
        }).unwrap()
        dispatch(setCredentials(credentials))
        navigate(redirect)
      } catch (err: any) {
        dispatch(
          setAlert({
            variant: 'error',
            message: err?.data?.message || 'Internal server error',
          })
        )
      }
    } else {
      formValues.forEach((formValue: UseInput) => {
        formValue.onBlur()
      })
    }
  }

  return (
    <AuthFormContainer variant='login' redirect={redirect}>
      <Form
        className={styles.form}
        onFormSubmit={onFormSubmit}
        formInputs={formValues}
        isLoading={isLoading}
        buttonLabel='SIGN IN'
      />
    </AuthFormContainer>
  )
}

export default LoginPage
