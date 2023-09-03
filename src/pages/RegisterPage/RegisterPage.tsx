import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useInput } from '../../hooks'
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '../../helpers'
import { UseInput, UserInfo } from '../../types'
import { useRegisterMutation } from '../../slices/usersApiSlice'
import { RootState } from '../../store'
import { setCredentials } from '../../slices'
import { Form } from '../../components'
import { Alert } from '../../components/UI'
import styles from './Register.module.scss'

const nameInputProps = {
  initialValue: '',
  validateFunction: validateName,
}

const emailInputProps = {
  initialValue: '',
  validateFunction: validateEmail,
}

const passwordInputProps = {
  initialValue: '',
  validateFunction: validatePassword,
  validateArg: true,
}

function RegisterPage() {
  const nameInput = useInput(nameInputProps)
  const emailInput = useInput(emailInputProps)
  const passwordInput = useInput(passwordInputProps)
  const confirmPasswordInput = useInput({
    initialValue: '',
    validateFunction: validateConfirmPassword,
    validateArg: passwordInput.value,
  })
  const formValues: UseInput[] = [
    nameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
  ]
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

  const formInputs = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'e.g. John Doe',
      onChange: nameInput.onChange,
      onBlur: nameInput.onBlur,
      value: nameInput.value,
      error: nameInput.error,
      label: 'Name',
    },
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
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm password',
      onChange: confirmPasswordInput.onChange,
      onBlur: confirmPasswordInput.onBlur,
      value: confirmPasswordInput.value,
      error: confirmPasswordInput.error,
      label: 'Confirm Password',
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

    if (errorMessage) setErrorMessage('')

    if (!isFormValid) {
      formValues.forEach((formValue: UseInput) => {
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
    <>
      <Alert message={errorMessage} />
      <Form
        className={styles.form}
        onFormSubmit={onFormSubmit}
        formInputs={formInputs}
        isLoading={isLoading}
        redirect={redirect}
        variant='register'
      />
    </>
  )
}

export default RegisterPage
