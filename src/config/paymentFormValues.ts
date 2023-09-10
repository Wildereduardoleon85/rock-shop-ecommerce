import {
  maskCardNumberInput,
  maskExpirationDateInput,
  validateExpirationDate,
  validateString,
} from '../helpers'
import { InputConfig } from '../types'

export const paymentFormValues: InputConfig = [
  {
    initialValue: '',
    name: 'card-number',
    label: 'Card Number',
    type: 'text',
    placeholder: 'Enter card number',
    validation: {
      validateFunction: validateString,
      opts: {
        min: 22,
        required: true,
        messages: {
          min: 'at least 16 characters long',
        },
      },
    },
    maskFunction: maskCardNumberInput,
  },
  {
    initialValue: '',
    name: 'name-and-surname',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter name as it appears on card',
    validation: {
      validateFunction: validateString,
      opts: {
        min: 2,
        required: true,
        max: 50,
        alphabetic: true,
      },
    },
  },
  {
    initialValue: '',
    name: 'expiration-date',
    label: 'Expiration date',
    type: 'text',
    placeholder: 'Enter expiration date',
    maskFunction: maskExpirationDateInput,
    validation: {
      validateFunction: validateExpirationDate,
      opts: {
        required: true,
        messages: {
          required: 'required',
        },
      },
    },
  },
]
