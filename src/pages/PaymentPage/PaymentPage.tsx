/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Breadcrumbs } from '../../components'
import styles from './PaymentPage.module.scss'
import { ROUTES } from '../../constants'
import { savePaymentMethod } from '../../slices'
import { RootState } from '../../store'
import { isNotCartInfo } from '../../helpers'

type SelectedMethod = 'paypal' | 'other'

function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<SelectedMethod>('paypal')
  const cart = useSelector((state: RootState) => state.cart)
  const { shippingAddress } = cart
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isNotCartInfo(cart)) {
      navigate(ROUTES.home)
    }

    if (!shippingAddress.address) {
      navigate(ROUTES.shipping)
    }
  }, [cart])

  function handleRadioChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setSelectedMethod(e.target.value as SelectedMethod)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLLabelElement>): void {
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement
      const input = target.firstChild as HTMLInputElement
      setSelectedMethod(input.value as SelectedMethod)
    }
  }

  function onContinueButtonClick(): void {
    dispatch(savePaymentMethod(selectedMethod))
    navigate(ROUTES.placeOrder)
  }

  return (
    <>
      <Breadcrumbs />
      <div className={styles.root}>
        <h1>Payment Method</h1>
        <h2>Select Method</h2>
        <div className={styles.checkboxContainer}>
          <label
            role='button'
            tabIndex={0}
            htmlFor='paypal-method'
            onKeyDown={handleKeyDown}
          >
            <input
              id='paypal-method'
              type='radio'
              value='paypal'
              name='payment-method'
              checked={selectedMethod === 'paypal'}
              onChange={handleRadioChange}
            />
            Paypal or Credit Card
            <span />
          </label>
          <label role='button' tabIndex={0} htmlFor='another-method'>
            <input
              id='another-method'
              value='other'
              type='radio'
              name='payment-method'
              checked={selectedMethod === 'other'}
              onChange={handleRadioChange}
              disabled
            />
            Another method
            <span />
          </label>
        </div>
        <div className={styles.buttons}>
          <Link to={ROUTES.shipping}>GO BACK</Link>
          <button type='button' onClick={onContinueButtonClick}>
            CONTINUE
          </button>
        </div>
      </div>
    </>
  )
}

export default PaymentPage
