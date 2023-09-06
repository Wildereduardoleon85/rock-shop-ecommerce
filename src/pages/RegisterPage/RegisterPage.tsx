import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useFormValues, useInput } from '../../hooks'
import { UserInfo } from '../../types'
import { useRegisterMutation } from '../../slices/usersApiSlice'
import { RootState } from '../../store'
import { setCredentials } from '../../slices'
import { AuthFormContainer, Form } from '../../components'
import styles from './Register.module.scss'
import { registerFormValues } from '../../config'
import { isFormValid, validateConfirmPassword } from '../../helpers'

function RegisterPage() {
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const { search } = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') ?? '/'
  const [register, { isLoading }] = useRegisterMutation()
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const initialValues = useFormValues(registerFormValues)
  const [nameInput, emailInput, passwordInput] = initialValues
  const confirmPasswordInput = useInput({
    initialValue: '',
    validateFunction: validateConfirmPassword,
    validateArg: passwordInput.value,
  })

  const formValues = [
    ...initialValues,
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm password',
      onChange: confirmPasswordInput.onChange,
      onBlur: confirmPasswordInput.onBlur,
      value: confirmPasswordInput.value,
      error: confirmPasswordInput.error,
      label: 'Confirm Password',
      isValid: confirmPasswordInput.isValid,
    },
  ]

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (errorMessage) setErrorMessage('')

    if (!isFormValid(formValues)) {
      formValues.forEach((formValue) => {
        formValue.onBlur()
      })
      return
    }

    try {
      const credentials: UserInfo = await register({
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      }).unwrap()
      dispatch(setCredentials(credentials))
      navigate(redirect)
    } catch (err: any) {
      setErrorMessage(err?.data?.message || 'internal server error')
    }
  }

  return (
    <AuthFormContainer
      errorMessage={errorMessage}
      variant='register'
      redirect={redirect}
    >
      <Form
        className={styles.form}
        onFormSubmit={onFormSubmit}
        formInputs={formValues}
        isLoading={isLoading}
        buttonLabel='REGISTER'
      />
    </AuthFormContainer>
  )
}

export default RegisterPage
