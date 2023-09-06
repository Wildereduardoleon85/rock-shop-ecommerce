import { validateEmail, validateName, validatePassword } from '../helpers'
import { InputConfig } from '../types'

export const registerFormValues: InputConfig = [
  {
    initialValue: '',
    name: 'name',
    label: 'Name',
    placeholder: 'e.g. John Doe',
    type: 'text',
    validateFunction: validateName,
  },
  {
    initialValue: '',
    name: 'email',
    label: 'Email',
    placeholder: 'john@email.com',
    type: 'text',
    validateFunction: validateEmail,
  },
  {
    initialValue: '',
    name: 'password',
    label: 'Password',
    placeholder: 'Enter password',
    type: 'text',
    validateFunction: validatePassword,
    validateArg: true,
  },
]
