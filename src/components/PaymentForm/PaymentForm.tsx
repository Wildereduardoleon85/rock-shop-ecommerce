import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { PaymentCard } from '..'
import { useInput } from '../../hooks'
import { Input } from '../UI'
import styles from './PaymentForm.module.scss'
import {
  maskCardNameInput,
  maskCardNumberInput,
  maskCvvInput,
  maskExpirationDateInput,
  validateCardNumber,
  validateCvv,
  validateExpirationDate,
  validateSingleString,
} from '../../helpers'
import { ROUTES } from '../../constants'
import { UseInput } from '../../types'
import { savePaymentMethod } from '../../slices'

function PaymentForm() {
  const [rotate, setRotate] = useState<boolean>(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cardNumberInput = useInput({
    initialValue: '',
    validateFunction: validateCardNumber,
    validateArg: 22,
    maskFunction: maskCardNumberInput,
  })

  const nameAndSurnameInput = useInput({
    initialValue: '',
    validateFunction: validateSingleString,
    maskFunction: maskCardNameInput,
  })

  const expirationDateInput = useInput({
    initialValue: '',
    validateFunction: validateExpirationDate,
    validateArg: 7,
    maskFunction: maskExpirationDateInput,
  })

  const cvvCodeInput = useInput({
    initialValue: '',
    validateFunction: validateCvv,
    validateArg: 3,
    onInputFocus: () => setRotate(true),
    onInputBlur: () => setRotate(false),
    maskFunction: maskCvvInput,
  })

  const formValues: UseInput[] = [
    cardNumberInput,
    nameAndSurnameInput,
    expirationDateInput,
    cvvCodeInput,
  ]

  function checkValidation(values: UseInput) {
    if (values.isValid) {
      return true
    }
    return false
  }

  const isFormValid = formValues.every(checkValidation)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isFormValid) {
      formValues.forEach((formValue: UseInput) => {
        formValue.onBlur()
      })
      return
    }

    dispatch(savePaymentMethod(cardNumberInput.value.slice(-5)))
    navigate(ROUTES.placeOrder)
  }

  const cardInputProps = {
    name: 'card-number',
    label: 'Card Number',
    error: cardNumberInput.error,
    type: 'text',
    placeholder: 'Enter card number',
    onChange: cardNumberInput.onChange,
    onBlur: cardNumberInput.onBlur,
    value: cardNumberInput.value,
  }

  const nameAndSurnameInputProps = {
    name: 'name-and-surname',
    label: 'Name',
    error: nameAndSurnameInput.error,
    type: 'text',
    placeholder: 'Enter name as it appears on card',
    onChange: nameAndSurnameInput.onChange,
    onBlur: nameAndSurnameInput.onBlur,
    value: nameAndSurnameInput.value,
  }

  const expirationDateInputProps = {
    name: 'expiration-date',
    label: 'Expiration date',
    error: expirationDateInput.error,
    type: 'text',
    placeholder: 'Enter expiration date',
    onChange: expirationDateInput.onChange,
    onBlur: expirationDateInput.onBlur,
    value: expirationDateInput.value,
  }

  const cvvCodeInputProps = {
    name: 'cvv-code',
    label: 'CVV / CVC',
    error: cvvCodeInput.error,
    type: 'text',
    placeholder: 'Enter CVV / CVC',
    onChange: cvvCodeInput.onChange,
    onBlur: cvvCodeInput.onBlur,
    value: cvvCodeInput.value,
    onFocus: cvvCodeInput.onFocus,
  }

  return (
    <form onSubmit={onSubmit} className={styles.formContainer}>
      <div className={styles.formCard}>
        <div className={styles.leftContainer}>
          <Input className={styles.input} inputProps={cardInputProps} />
          <Input
            className={styles.input}
            inputProps={nameAndSurnameInputProps}
          />
          <div className={styles.shortInputs}>
            <Input
              className={styles.shortInput}
              inputProps={expirationDateInputProps}
            />
            <Input
              className={styles.shortInput}
              inputProps={cvvCodeInputProps}
            />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <PaymentCard flipCard={rotate} />
        </div>
      </div>

      <div className={styles.buttons}>
        <Link to={ROUTES.shipping}>GO BACK</Link>
        <button type='submit'>CONTINUE</button>
      </div>
    </form>
  )
}

export default PaymentForm
