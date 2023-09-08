import Joi from 'joi'
import { useState, ChangeEvent } from 'react'
import { UseInput } from '../../types'

type UseInputArgs = {
  initialValue: string
  onInputBlur?: () => void
  onInputFocus?: () => void
  maskFunction?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: string) => void
  ) => void
  schemaValidation?: Joi.Schema
  name: string
}

function useInput({
  initialValue,
  onInputBlur,
  onInputFocus,
  maskFunction,
  schemaValidation,
  name,
}: UseInputArgs): UseInput {
  const [value, setValue] = useState<string>(initialValue)
  const [isTouched, setIsTouched] = useState<boolean>(false)

  let isValid = true
  let error = ''

  if (schemaValidation) {
    const { error: err } = schemaValidation.validate(value)
    if (err && isTouched) {
      error = err.details[0].message.replace('"value"', `field ${name}`)
      isValid = false
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (maskFunction) {
      maskFunction(e, setValue)
    } else {
      setValue(e.target.value)
    }
  }

  function onBlur() {
    setIsTouched(true)
    if (onInputBlur) {
      onInputBlur()
    }
  }

  function onFocus() {
    if (onInputFocus) {
      onInputFocus()
    }
  }

  function reset() {
    setValue('')
    setIsTouched(false)
  }

  return {
    value,
    isValid,
    error,
    onChange,
    onBlur,
    reset,
    onFocus,
  }
}

export default useInput
