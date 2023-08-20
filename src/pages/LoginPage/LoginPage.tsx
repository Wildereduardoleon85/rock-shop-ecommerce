import { Link } from 'react-router-dom'
import styles from './LoginPage.module.scss'
import { useInput } from '../../hooks'
import { validateEmail, validateName } from '../../utils'
import { Input } from '../../components/UI'
import { UseInput } from '../../types'
import { ROUTES } from '../../constants'

function LoginPage() {
  const nameInput = useInput('', validateName)
  const emailInput = useInput('', validateEmail)

  const formValues: UseInput[] = [nameInput, emailInput]

  function checkValidation(values: UseInput) {
    if (values.isValid) {
      return true
    }
    return false
  }

  const isFormValid = formValues.every(checkValidation)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!isFormValid) {
      formValues.forEach((formValue: UseInput) => {
        formValue.onBlur()
      })
      return
    }

    console.log('the form is valid')
  }

  const formInputs = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'e.g John Doe',
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
  ]

  return (
    <div className={styles.root}>
      <h1>Sign In</h1>
      <form onSubmit={onSubmit}>
        {formInputs.map((formInputProps) => (
          <Input key={formInputProps.name} inputProps={formInputProps} />
        ))}
        <button type='submit' className={styles.submitButton}>
          SIGN IN
        </button>
        <p className={styles.toRegister}>
          New Customer?{' '}
          <span>
            <Link to={ROUTES.register}>Register</Link>
          </span>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
