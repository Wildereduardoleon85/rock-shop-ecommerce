import { useState, ChangeEvent } from 'react'
import { UseInput } from '../../types'

function useInput(
  initialValue: string,
  validateFunction: Function,
  validateArg: number | string = ''
): UseInput {
  const [value, setValue] = useState<string>(initialValue)
  const [isTouched, setIsTouched] = useState<boolean>(false)

  const { isValid, error: validationError } = validateFunction(
    value,
    validateArg
  )
  const error = !isValid && isTouched ? validationError : ''

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  function onBlur() {
    setIsTouched(true)
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
  }
}

export default useInput
