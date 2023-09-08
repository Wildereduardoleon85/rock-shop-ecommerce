import { validateString } from '../helpers'
import { InputConfig } from '../types'

export const registerFormValues: InputConfig = [
  {
    initialValue: '',
    name: 'name',
    label: 'Name',
    placeholder: 'e.g. John Doe',
    type: 'text',
    validation: {
      validateFunction: validateString,
      opts: {
        required: true,
        min: 2,
        max: 50,
        alphabetic: true,
      },
    },
  },
  {
    initialValue: '',
    name: 'email',
    label: 'Email',
    placeholder: 'john@email.com',
    type: 'text',
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
    label: 'Password',
    placeholder: 'Enter password',
    type: 'text',
    validation: {
      validateFunction: validateString,
      opts: {
        required: true,
        min: 6,
        max: 12,
        password: true,
      },
    },
  },
]
