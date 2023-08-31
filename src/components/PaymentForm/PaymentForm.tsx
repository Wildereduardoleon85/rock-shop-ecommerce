import { useState } from 'react'
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

function PaymentForm() {
  const [rotate, setRotate] = useState<boolean>(false)

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
    placeholder: 'Enter expiration date',
    onChange: cvvCodeInput.onChange,
    onBlur: cvvCodeInput.onBlur,
    value: cvvCodeInput.value,
    onFocus: cvvCodeInput.onFocus,
  }

  return (
    <div className={styles.formCard}>
      <div className={styles.leftContainer}>
        <Input className={styles.input} inputProps={cardInputProps} />
        <Input className={styles.input} inputProps={nameAndSurnameInputProps} />
        <div className={styles.shortInputs}>
          <Input
            className={styles.shortInput}
            inputProps={expirationDateInputProps}
          />
          <Input className={styles.shortInput} inputProps={cvvCodeInputProps} />
        </div>
        {/* <Input className={styles.input} inputProps={input1} /> */}
      </div>
      <div className={styles.rightContainer}>
        <PaymentCard flipCard={rotate} />
      </div>
    </div>
  )
}

export default PaymentForm
