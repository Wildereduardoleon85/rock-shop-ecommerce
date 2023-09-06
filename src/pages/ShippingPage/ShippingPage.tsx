import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormValues } from '../../hooks'
import { saveShippingAddress } from '../../slices'
import { Breadcrumbs, Form } from '../../components'
import { RootState } from '../../store'
import styles from './ShippingPage.module.scss'
import { ROUTES } from '../../constants'
import { isFormValid, isNotCartInfo } from '../../helpers'
import { shippingFormValues } from '../../config'

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

  const formValues = useFormValues(
    shippingFormValues({
      addressValue: shippingAddress.address,
      cityValue: shippingAddress.city,
      countryValue: shippingAddress.country,
      postalCodeValue: shippingAddress.postalCode,
    })
  )

  const [addressInput, cityInput, postalCodeInput, countryInput] = formValues

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isFormValid(formValues)) {
      formValues.forEach((formValue) => {
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
      <Breadcrumbs step1 />
      <div className={styles.container}>
        <h1>Shipping</h1>
        <Form
          className={styles.form}
          onFormSubmit={onFormSubmit}
          formInputs={formValues}
          buttonLabel='CONTINUE'
        />
      </div>
    </>
  )
}

export default ShippingPage
