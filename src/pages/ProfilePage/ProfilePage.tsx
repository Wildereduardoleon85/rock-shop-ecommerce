import { useSelector } from 'react-redux'
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '../../helpers'
import { useInput } from '../../hooks'
import { UseInput } from '../../types'
import styles from './ProfilePage.module.scss'
import { RootState } from '../../store'
import { Form, Orders } from '../../components'

function ProfilePage() {
  const { userInfo } = useSelector((state: RootState) => state.auth)

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

  const handleSubmit = () => {
    // console.log('submit')
  }

  return (
    <div className={styles.root}>
      <div className={styles.userProfile}>
        <Form
          handleSubmit={handleSubmit}
          formInputs={formInputs}
          formValues={formValues}
          variant='profile'
        />
      </div>
      <Orders />
    </div>
  )
}

export default ProfilePage
