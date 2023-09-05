import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '../../helpers'
import { useInput } from '../../hooks'
import { UseInput, VariantEnums } from '../../types'
import styles from './ProfilePage.module.scss'
import { RootState } from '../../store'
import { Form, Table } from '../../components'
import {
  setCredentials,
  useGetMyOrdersQuery,
  useUpdateProfileMutation,
} from '../../slices'
import { Alert } from '../../components/UI'

function ProfilePage() {
  const [alert, setAlert] = useState<{
    variant: string
    message: string
  } | null>(null)
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  const dispatch = useDispatch()
  const {
    data: orders,
    error,
    isLoading: isOrdersLoading,
  } = useGetMyOrdersQuery()

  const nameInput = useInput({
    initialValue: userInfo?.name ?? '',
    validateFunction: validateName,
  })
  const emailInput = useInput({
    initialValue: userInfo?.email ?? '',
    validateFunction: validateEmail,
  })
  const passwordInput = useInput({
    initialValue: '',
    validateFunction: validatePassword,
    validateArg: false,
  })
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

    if (
      userInfo?.email !== emailInput.value ||
      userInfo?.name !== nameInput.value ||
      passwordInput.value
    ) {
      if (alert) {
        setAlert(null)
      }

      if (!isFormValid) {
        formValues.forEach((formValue: UseInput) => {
          formValue.onBlur()
        })
        return
      }

      try {
        const credentials = await updateProfile({
          name: nameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        }).unwrap()
        dispatch(setCredentials(credentials))
        setAlert({ variant: 'success', message: 'Profile updated successfuly' })
        passwordInput.reset()
        confirmPasswordInput.reset()
      } catch (err: any) {
        setAlert({
          variant: 'error',
          message: err?.data?.message || 'something went wrong',
        })
      }
    }
  }

  return (
    <>
      <Alert
        variant={alert?.variant as VariantEnums}
        message={alert?.message}
      />

      <div className={styles.root}>
        <div className={styles.userProfile}>
          <h1>Profile</h1>
          <Form
            onFormSubmit={onFormSubmit}
            formInputs={formInputs}
            isLoading={isLoading}
            buttonLabel='UPDATE'
          />
        </div>
        <Table
          className={styles.table}
          variant='orders'
          data={orders}
          error={error}
          isLoading={isOrdersLoading}
        />
      </div>
    </>
  )
}

export default ProfilePage
