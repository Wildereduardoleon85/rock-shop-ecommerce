import { validateString } from '../helpers'
import { InputConfig } from '../types'

type ProfileFormValuesArgs = {
  nameValue: string
  emailValue: string
}

export function profileFormValues({
  nameValue,
  emailValue,
}: ProfileFormValuesArgs): InputConfig {
  return [
    {
      name: 'name',
      initialValue: nameValue,
      label: 'Name',
      type: 'text',
      placeholder: 'e.g. John Doe',
      validation: {
        validateFunction: validateString,
        opts: {
          required: true,
          alphabetic: true,
          min: 2,
          max: 50,
        },
      },
    },
    {
      name: 'email',
      initialValue: emailValue,
      label: 'Email',
      type: 'text',
      placeholder: 'john@email.com',
      validation: {
        validateFunction: validateString,
        opts: {
          required: true,
          email: true,
        },
      },
    },
    {
      name: 'password',
      initialValue: '',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
      validation: {
        validateFunction: validateString,
        opts: {
          required: true,
          password: true,
          min: 6,
          max: 12,
        },
      },
    },
  ]
}
