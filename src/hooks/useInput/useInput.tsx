import { useState, ChangeEvent } from 'react'
import { UseInput } from '../../types'

type UseInputArgs = {
  initialValue: string
  validateFunction: Function
  validateArg?: any
  onInputBlur?: () => void
  onInputFocus?: () => void
  maskFunction?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: string) => void
  ) => void
}

function useInput({
  initialValue,
  validateFunction,
  validateArg = '',
  onInputBlur,
  onInputFocus,
  maskFunction,
}: UseInputArgs): UseInput {
  const [value, setValue] = useState<string>(initialValue)
  const [isTouched, setIsTouched] = useState<boolean>(false)

  const { isValid, error: validationError } = validateFunction(
    value,
    validateArg
  )
  const error = !isValid && isTouched ? validationError : ''

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
