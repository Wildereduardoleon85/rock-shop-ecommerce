import { useState, ChangeEvent } from 'react'
import { UseInput, ValidateOptions, Validation } from '../../types'

type UseInputArgs = {
  initialValue: string
  onInputBlur?: () => void
  onInputFocus?: () => void
  maskFunction?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: string) => void
  ) => void
  validation?: {
    validateFunction: (value: any, opts: ValidateOptions) => Validation
    opts: ValidateOptions
  }
}

function useInput({
  initialValue,
  onInputBlur,
  onInputFocus,
  maskFunction,
  validation,
}: UseInputArgs): UseInput {
  const [value, setValue] = useState<string>(initialValue)
  const [isTouched, setIsTouched] = useState<boolean>(false)

  let isValid = true
  let error = ''

  if (validation) {
    const validationResult = validation.validateFunction(value, validation.opts)
    if (!validationResult.isValid && isTouched) {
      error = validationResult.error
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
