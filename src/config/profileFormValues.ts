import { validateEmail, validateName, validatePassword } from '../helpers'
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
      validateFunction: validateName,
    },
    {
      name: 'email',
      initialValue: emailValue,
      label: 'Email',
      type: 'text',
      placeholder: 'john@email.com',
      validateFunction: validateEmail,
    },
    {
      name: 'password',
      initialValue: '',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
      validateFunction: validatePassword,
      validateArg: false,
    },
  ]
}
