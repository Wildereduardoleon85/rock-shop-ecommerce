import { validateString } from '../helpers'
import { InputConfig } from '../types'

type ShippingFormValuesArgs = {
  addressValue: string
  cityValue: string
  postalCodeValue: string
  countryValue: string
}

export function shippingFormValues({
  addressValue,
  cityValue,
  postalCodeValue,
  countryValue,
}: ShippingFormValuesArgs): InputConfig {
  return [
    {
      initialValue: addressValue,
      name: 'address',
      label: 'Address',
      placeholder: 'Enter address',
      type: 'text',
      validation: {
        validateFunction: validateString,
        opts: {
          required: true,
          min: 3,
          max: 200,
        },
      },
    },
    {
      initialValue: cityValue,
      name: 'city',
      label: 'City',
      placeholder: 'Enter city',
      type: 'text',
      validation: {
        validateFunction: validateString,
        opts: {
          required: true,
          min: 3,
          max: 50,
        },
      },
    },
    {
      initialValue: postalCodeValue,
      name: 'postalCode',
      label: 'Postal code',
      placeholder: 'Enter postal code',
      type: 'text',
      validation: {
        validateFunction: validateString,
        opts: {
          required: true,
          min: 3,
          max: 50,
        },
      },
    },
    {
      initialValue: countryValue,
      name: 'country',
      label: 'Country',
      placeholder: 'Enter country',
      type: 'text',
      validation: {
        validateFunction: validateString,
        opts: {
          required: true,
          min: 3,
          max: 50,
        },
      },
    },
  ]
}
