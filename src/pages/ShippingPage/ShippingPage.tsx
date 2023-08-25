import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useInput } from '../../hooks'
import { saveShippingAddress } from '../../slices'
import { UseInput } from '../../types'
import { validateSingleString } from '../../utils'
import { Breadcrumbs, Form } from '../../components'
import { RootState } from '../../store'
import styles from './ShippingPage.module.scss'
import { ROUTES } from '../../constants'

function ShippingPage() {
  const dispatch = useDispatch()
  const { shippingAddress } = useSelector((state: RootState) => state.cart)
  const navigate = useNavigate()
  const addressInput = useInput(
    shippingAddress.address,
    validateSingleString,
    5
  )
  const cityInput = useInput(shippingAddress.city, validateSingleString, 4)
  const postalCodeInput = useInput(
    shippingAddress.postalCode,
    validateSingleString,
    5
  )
  const countryInput = useInput(
    shippingAddress.country,
    validateSingleString,
    4
  )

  const formValues: UseInput[] = [
    addressInput,
    cityInput,
    postalCodeInput,
    countryInput,
  ]

  const formInputs = [
    {
      name: 'address',
      type: 'text',
      placeholder: 'Enter Address',
      onChange: addressInput.onChange,
      onBlur: addressInput.onBlur,
      value: addressInput.value,
      error: addressInput.error,
      label: 'Address',
    },
    {
      name: 'city',
      type: 'text',
      placeholder: 'Enter City',
      onChange: cityInput.onChange,
      onBlur: cityInput.onBlur,
      value: cityInput.value,
      error: cityInput.error,
      label: 'City',
    },
    {
      name: 'postal code',
      type: 'text',
      placeholder: 'Enter postal code',
      onChange: postalCodeInput.onChange,
      onBlur: postalCodeInput.onBlur,
      value: postalCodeInput.value,
      error: postalCodeInput.error,
      label: 'Postal Code',
    },
    {
      name: 'country',
      type: 'text',
      placeholder: 'Enter Country',
      onChange: countryInput.onChange,
      onBlur: countryInput.onBlur,
      value: countryInput.value,
      error: countryInput.error,
      label: 'Country',
    },
  ]

  const handleSubmit = () => {
    dispatch(
      saveShippingAddress({
        address: addressInput.value,
        city: cityInput.value,
        country: countryInput.value,
        postalCode: postalCodeInput.value,
      })
    )
    navigate(ROUTES.payment)
  }

  return (
    <>
      <Breadcrumbs />
      <Form
        className={styles.form}
        handleSubmit={handleSubmit}
        formInputs={formInputs}
        formValues={formValues}
        variant='shipping'
      />
    </>
  )
}

export default ShippingPage
