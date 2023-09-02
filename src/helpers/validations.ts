import { Validation } from '../types'

export function validateName(value: string): Validation {
  if (!value) {
    return {
      isValid: false,
      error: 'field name is required',
    }
  }

  if (typeof value !== 'string') {
    return {
      isValid: false,
      error: 'field name must be a string',
    }
  }

  if (value.trim().length === 0) {
    return {
      isValid: false,
      error: 'field name must not be empty',
    }
  }

  if (value.trim().length < 2) {
    return {
      isValid: false,
      error: 'field name is invalid',
    }
  }

  return {
    isValid: true,
    error: '',
  }
}

export function validateEmail(value: string): Validation {
  if (value.trim() === '') {
    return {
      isValid: false,
      error: 'This field is required',
    }
  }

  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return {
      isValid: false,
      error: 'You must enter a valid email',
    }
  }

  return {
    isValid: true,
    error: '',
  }
}

export const validatePassword = (
  password: any,
  required: boolean = true
): Validation => {
  let error = ''
  let isValid = true

  if (required && !password) {
    isValid = false
    error = 'Field password is required'
  }

  if (typeof password !== 'string') {
    isValid = false
    error = 'Field password must be a string'
  }

  if (password.trim().length > 0 && password.trim().length < 6) {
    isValid = false
    error = 'Field password must be at least 6 characters'
  }

  if (password.trim().length > 16) {
    isValid = false
    error = 'Field password must must not exceed 16 characters'
  }

  if (
    password.trim().length > 0 &&
    !(
      /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>?~]/.test(password) &&
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)
    )
  ) {
    isValid = false
    error =
      'must contain: Uppercase letter, Lowercase letter, number and a special character'
  }

  return {
    isValid,
    error,
  }
}

export function validateConfirmPassword(
  password: string,
  confirmValue?: string
): Validation {
  if (password !== confirmValue) {
    return {
      isValid: false,
      error: 'Passwords do not match',
    }
  }

  return {
    isValid: true,
    error: '',
  }
}

function validateSingleStringWithCustomMessage(
  value: string,
  customMessage: string,
  min: number = 2
): Validation {
  const errorMessage =
    customMessage || `field must be at least ${min} characters length`

  if (!value) {
    return {
      isValid: false,
      error: 'field required',
    }
  }

  if (typeof value !== 'string') {
    return {
      isValid: false,
      error: 'this field must be a string',
    }
  }

  if (value.trim().length === 0) {
    return {
      isValid: false,
      error: 'this field must not be empty',
    }
  }

  if (value.trim().length < min) {
    return {
      isValid: false,
      error: errorMessage,
    }
  }

  return {
    isValid: true,
    error: '',
  }
}

export function validateSingleString(
  value: string,
  min: number = 2
): Validation {
  return validateSingleStringWithCustomMessage(value, '', min)
}

export function validateCardNumber(value: string, min: number): Validation {
  return validateSingleStringWithCustomMessage(
    value,
    'Card number must be at least 16 characters long',
    min
  )
}

export function validateCvv(value: string, min: number): Validation {
  return validateSingleStringWithCustomMessage(value, 'invalid cvv / cvc', min)
}

export function validateExpirationDate(value: string): Validation {
  let isValid = true
  let error = ''

  const month = value.split('/')[0]
  const year = value.split('/')[1]
  const defaultErrorMessage = 'invalid date'
  const currentYear = new Date().getFullYear()

  if (Number(month) < 1 || Number(month) > 12) {
    isValid = false
    error = defaultErrorMessage
  }

  if (Number(year) < currentYear) {
    isValid = false
    error = defaultErrorMessage
  }

  return {
    isValid,
    error,
  }
}
