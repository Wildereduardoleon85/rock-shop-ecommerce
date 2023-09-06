import { validateEmail, validatePassword } from '../helpers'
import { InputConfig } from '../types'

export const loginFormValues: InputConfig = [
  {
    initialValue: '',
    name: 'email',
    type: 'text',
    placeholder: 'joe@email.com',
    label: 'Email',
    validateFunction: validateEmail,
  },
  {
    initialValue: '',
    name: 'password',
    type: 'password',
    placeholder: 'Enter password',
    label: 'Password',
    validateFunction: validatePassword,
    validateArg: true,
  },
]
