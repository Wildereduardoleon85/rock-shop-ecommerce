/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Breadcrumbs, PaymentForm } from '../../components'
import styles from './PaymentPage.module.scss'
import { ROUTES } from '../../constants'
import { savePaymentMethod } from '../../slices'
import { RootState } from '../../store'
import { isNotCartInfo } from '../../helpers'

const CARD = 'New credit or debit card'

function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>(CARD)
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
    setSelectedMethod(e.target.value)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLLabelElement>): void {
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement
      const input = target.firstChild as HTMLInputElement
      setSelectedMethod(input.value)
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
            htmlFor={CARD}
            onKeyDown={handleKeyDown}
          >
            <input
              id={CARD}
              type='radio'
              value={CARD}
              name='payment-method'
              checked={selectedMethod === CARD}
              onChange={handleRadioChange}
            />
            {CARD}
            <span />
          </label>
          {/* <label
            role='button'
            tabIndex={0}
            htmlFor='new-debit-card'
            onKeyDown={handleKeyDown}
          >
            <input
              id='new-debit-card'
              value='new-debit-card'
              type='radio'
              name='payment-method'
              checked={selectedMethod === 'new-debit-card'}
              onChange={handleRadioChange}
            />
            New debit card
            <span />
          </label> */}
        </div>
        <div className={styles.buttons}>
          <Link to={ROUTES.shipping}>GO BACK</Link>
          <button type='button' onClick={onContinueButtonClick}>
            CONTINUE
          </button>
        </div>
        <PaymentForm />
      </div>
    </>
  )
}

export default PaymentPage
