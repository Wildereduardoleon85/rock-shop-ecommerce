import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isFormValid, validateConfirmPassword } from '../../helpers'
import { useFormValues, useInput } from '../../hooks'
import { VariantEnums } from '../../types'
import styles from './ProfilePage.module.scss'
import { RootState } from '../../store'
import { Form, Table } from '../../components'
import {
  setCredentials,
  useGetMyOrdersQuery,
  useUpdateProfileMutation,
} from '../../slices'
import { Alert } from '../../components/UI'
import { profileFormValues } from '../../config'

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

  const initialFormValues = useFormValues(
    profileFormValues({
      nameValue: userInfo?.name ?? '',
      emailValue: userInfo?.email ?? '',
    })
  )
  const [nameInput, emailInput, passwordInput] = initialFormValues

  const confirmPasswordInput = useInput({
    initialValue: '',
    validateFunction: validateConfirmPassword,
    validateArg: passwordInput.value,
  })

  const formValues = [
    ...initialFormValues,
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

    if (
      userInfo?.email !== emailInput.value ||
      userInfo?.name !== nameInput.value ||
      passwordInput.value
    ) {
      if (alert) {
        setAlert(null)
      }

      if (isFormValid(formValues)) {
        try {
          const credentials = await updateProfile({
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
          }).unwrap()
          dispatch(setCredentials(credentials))
          setAlert({
            variant: 'success',
            message: 'Profile updated successfuly',
          })
          passwordInput.reset()
          confirmPasswordInput.reset()
        } catch (err: any) {
          setAlert({
            variant: 'error',
            message: err?.data?.message || 'something went wrong',
          })
        }
      } else {
        formValues.forEach((formValue) => {
          formValue.onBlur()
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
            formInputs={formValues}
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
