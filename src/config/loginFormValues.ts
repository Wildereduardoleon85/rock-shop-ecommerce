import { validateString } from '../helpers'
import { InputConfig } from '../types'

export const loginFormValues: InputConfig = [
  {
    initialValue: '',
    name: 'email',
    type: 'text',
    placeholder: 'joe@email.com',
    label: 'Email',
    validation: {
      validateFunction: validateString,
      opts: {
        required: true,
        email: true,
      },
    },
  },
  {
    initialValue: '',
    name: 'password',
    type: 'password',
    placeholder: 'Enter password',
    label: 'Password',
    validation: {
      validateFunction: validateString,
      opts: {
        required: true,
        min: 6,
        max: 12,
      },
    },
  },
]
