import { Validation } from '../types'

export function getClassNames(
  classList: (string | undefined | null | boolean)[]
): string {
  const cleanedValues: (string | undefined | null | boolean)[] = []

  classList.forEach((value) => {
    if (typeof value === 'string' || (value as unknown) instanceof String) {
      cleanedValues.push(value)
    }
  })

  return cleanedValues.join(' ').trim()
}

export function subString(value: string, limit: number): string {
  return `${value.slice(0, limit)}...`
}

export function formatCurrency(num: number): string {
  const roundedNumber = Number(num.toFixed(2))

  return new Intl.NumberFormat('en-US').format(roundedNumber)
}

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

export const validatePassword = (password: any): Validation => {
  if (!password) {
    return {
      isValid: false,
      error: 'Field password is required',
    }
  }

  if (typeof password !== 'string') {
    return {
      isValid: false,
      error: 'Field password must be a string',
    }
  }

  if (password.trim().length < 6) {
    return {
      isValid: false,
      error: 'Field password must be at least 6 characters',
    }
  }

  if (password.trim().length > 16) {
    return {
      isValid: false,
      error: 'Field password must must not exceed 16 characters',
    }
  }

  if (
    /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>?~]/.test(password) &&
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)
  ) {
    return {
      isValid: true,
      error: '',
    }
  }

  return {
    isValid: false,
    error:
      'must contain: Uppercase letter, Lowercase letter, number and a special character',
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

export function capitalize(value: string): string {
  const cleanedValue = value.toLowerCase().trim()
  const firstLetter = cleanedValue.charAt(0)
  const rest = cleanedValue.slice(1, cleanedValue.length)

  return `${firstLetter.toUpperCase()}${rest}`
}

export function validateSingleString(value: string, min: number = 2) {
  if (!value) {
    return {
      isValid: false,
      error: 'this field is required',
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
      error: `field must be at least ${min} characters length`,
    }
  }

  return {
    isValid: true,
    error: '',
  }
}
