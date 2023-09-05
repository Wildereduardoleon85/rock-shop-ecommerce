import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useInput } from '../../hooks'
import { saveShippingAddress } from '../../slices'
import { UseInput } from '../../types'
import { Breadcrumbs, Form } from '../../components'
import { RootState } from '../../store'
import styles from './ShippingPage.module.scss'
import { ROUTES } from '../../constants'
import { isNotCartInfo, validateSingleString } from '../../helpers'

function ShippingPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state: RootState) => state.cart)
  const { shippingAddress } = cart

  useEffect(() => {
    if (isNotCartInfo(cart)) {
      navigate(ROUTES.home)
    }
  }, [])

  const addressInput = useInput({
    initialValue: shippingAddress.address,
    validateFunction: validateSingleString,
    validateArg: 5,
  })

  const cityInput = useInput({
    initialValue: shippingAddress.city,
    validateFunction: validateSingleString,
    validateArg: 4,
  })

  const postalCodeInput = useInput({
    initialValue: shippingAddress.postalCode,
    validateFunction: validateSingleString,
    validateArg: 5,
  })

  const countryInput = useInput({
    initialValue: shippingAddress.country,
    validateFunction: validateSingleString,
    validateArg: 4,
  })

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

  function checkValidation(values: UseInput) {
    if (values.isValid) {
      return true
    }
    return false
  }

  const isFormValid = formValues.every(checkValidation)

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isFormValid) {
      formValues.forEach((formValue: UseInput) => {
        formValue.onBlur()
      })
      return
    }

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
      <div className={styles.container}>
        <h1>Shipping</h1>
        <Form
          className={styles.form}
          onFormSubmit={onFormSubmit}
          formInputs={formInputs}
          buttonLabel='CONTINUE'
        />
      </div>
    </>
  )
}

export default ShippingPage
