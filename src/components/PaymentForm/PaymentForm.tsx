import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { PaymentCard } from '..'
import { useFormValues, useInput } from '../../hooks'
import { Button, Input } from '../UI'
import styles from './PaymentForm.module.scss'
import { isFormValid, maskCvvInput, validateString } from '../../helpers'
import { ROUTES } from '../../constants'
import { savePaymentMethod } from '../../slices'
import { paymentFormValues } from '../../config/paymentFormValues'

function PaymentForm() {
  const [rotate, setRotate] = useState<boolean>(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialFormValues = useFormValues(paymentFormValues)
  const [cardNumberInput, nameAndSurnameInput, expirationDateInput] =
    initialFormValues

  const cvvCodeInput = useInput({
    initialValue: '',
    validation: {
      validateFunction: validateString,
      opts: {
        required: true,
        min: 3,
        messages: {
          required: 'required',
          min: '3 characters min',
        },
      },
    },
    onInputFocus: () => setRotate(true),
    onInputBlur: () => setRotate(false),
    maskFunction: maskCvvInput,
  })

  const cvvCodeInputProps = {
    name: 'cvv',
    label: 'CVV / CVC',
    error: cvvCodeInput.error,
    type: 'text',
    placeholder: 'Enter cvv / cvc',
    onChange: cvvCodeInput.onChange,
    onBlur: cvvCodeInput.onBlur,
    onFocus: cvvCodeInput.onFocus,
    value: cvvCodeInput.value,
    isValid: cvvCodeInput.isValid,
  }

  const formValues = [...initialFormValues, cvvCodeInputProps]

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isFormValid(formValues)) {
      formValues.forEach((formValue) => {
        formValue.onBlur()
      })
      return
    }

    dispatch(savePaymentMethod(cardNumberInput.value.slice(-5)))
    navigate(ROUTES.placeOrder)
  }

  return (
    <form onSubmit={onSubmit} className={styles.formContainer}>
      <div className={styles.formCard}>
        <div className={styles.leftContainer}>
          <Input className={styles.input} inputProps={cardNumberInput} />
          <Input className={styles.input} inputProps={nameAndSurnameInput} />
          <div className={styles.shortInputs}>
            <Input
              className={styles.shortInput}
              inputProps={expirationDateInput}
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
        <Button type='submit'>CONTINUE</Button>
      </div>
    </form>
  )
}

export default PaymentForm
