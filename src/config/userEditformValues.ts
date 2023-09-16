import { validateString } from '../helpers'
import { InputConfig } from '../types'

type UserEditFormValues = {
  nameValue: string
  emailValue: string
}

export const userEditFormValues = ({
  nameValue,
  emailValue,
}: UserEditFormValues): InputConfig => [
  {
    initialValue: nameValue,
    name: 'name',
    type: 'text',
    placeholder: 'User name',
    label: 'Name',
    validation: {
      validateFunction: validateString,
      opts: {
        required: true,
        alphabetic: true,
        min: 2,
        max: 200,
      },
    },
  },
  {
    initialValue: emailValue,
    name: 'email',
    type: 'text',
    placeholder: 'User email',
    label: 'Email',
    validation: {
      validateFunction: validateString,
      opts: {
        required: true,
        email: true,
      },
    },
  },
]
