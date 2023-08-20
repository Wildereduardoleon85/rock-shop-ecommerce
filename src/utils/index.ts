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
  if (value.trim() === '') {
    return {
      isValid: false,
      error: 'This field is required',
    }
  }

  if (!/^[a-zA-Z ]+$/.test(value)) {
    return {
      isValid: false,
      error: 'This field must contain only letters',
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
