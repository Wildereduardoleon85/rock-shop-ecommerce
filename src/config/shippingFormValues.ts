import { validateSingleString } from '../helpers'
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
      validateFunction: validateSingleString,
    },
    {
      initialValue: cityValue,
      name: 'city',
      label: 'City',
      placeholder: 'Enter city',
      type: 'text',
      validateFunction: validateSingleString,
    },
    {
      initialValue: postalCodeValue,
      name: 'postalCode',
      label: 'Postal code',
      placeholder: 'Enter postal code',
      type: 'text',
      validateFunction: validateSingleString,
    },
    {
      initialValue: countryValue,
      name: 'country',
      label: 'Country',
      placeholder: 'Enter country',
      type: 'text',
      validateFunction: validateSingleString,
    },
  ]
}
