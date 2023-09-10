import { ValidateOptions, Validation } from '../types'

export function validateExpirationDate(
  value: string,
  { required }: ValidateOptions
): Validation {
  const month = value.split('/')[0]
  const year = value.split('/')[1]
  const defaultErrorMessage = 'invalid date'
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getUTCMonth() + 1

  if (required && !value) {
    return {
      isValid: false,
      error: 'required',
    }
  }

  if (value.length < 7) {
    return {
      isValid: false,
      error: '6 chars min',
    }
  }

  if (Number(month) < 1 || Number(month) > 12) {
    return {
      isValid: false,
      error: defaultErrorMessage,
    }
  }

  if (Number(month) <= currentMonth && Number(year) < currentYear) {
    return {
      isValid: false,
      error: defaultErrorMessage,
    }
  }

  if (Number(year) < currentYear) {
    return {
      isValid: false,
      error: defaultErrorMessage,
    }
  }

  return {
    isValid: true,
    error: '',
  }
}

export function validateString(
  value: any,
  {
    required,
    min,
    max,
    regex,
    alphanum,
    numeric,
    currency,
    email,
    password,
    alphabetic,
    matchWithValue,
    messages,
  }: ValidateOptions
): Validation {
  if (!value && required) {
    return {
      isValid: false,
      error: messages?.required ?? 'this field is required',
    }
  }

  if (typeof value !== 'string') {
    return {
      isValid: false,
      error: 'must be a string',
    }
  }

  if (required && value.trim().length === 0) {
    return {
      isValid: false,
      error: 'empty field not allowed',
    }
  }

  if (min && value.trim().length < min) {
    return {
      isValid: false,
      error: messages?.min ?? `at least ${min} characters long`,
    }
  }

  if (max && value.trim().length > max) {
    return {
      isValid: false,
      error: messages?.max ?? 'max character length exceeded',
    }
  }

  if (regex && !regex.test(value)) {
    return {
      isValid: false,
      error: messages?.regex ?? `must match with ${regex} pattern`,
    }
  }

  if (alphanum && !/^[a-zA-ZÀ-ÖØ-öø-ÿ\s0-9]+$/.test(value)) {
    return {
      isValid: false,
      error: messages?.alphanum ?? 'only alphanumeric allowed',
    }
  }

  if (alphabetic && !/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(value)) {
    return {
      isValid: false,
      error: messages?.alphabetic ?? 'only letters allowed',
    }
  }

  if (numeric && !/^\d+$/.test(value)) {
    return {
      isValid: false,
      error: messages?.numeric ?? 'only number allowed',
    }
  }

  if (currency && !/^[0-9.]+$/.test(value)) {
    return {
      isValid: false,
      error: messages?.currency ?? 'invalid format',
    }
  }

  if (
    email &&
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
  ) {
    return {
      isValid: false,
      error: messages?.email ?? 'invalid email',
    }
  }

  if (
    value.trim().length > 0 &&
    password &&
    !/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).+$/.test(value)
  ) {
    return {
      isValid: false,
      error:
        messages?.password ??
        'must contain: uppercased, lowercased letter, number and special character',
    }
  }

  if (matchWithValue && value !== matchWithValue) {
    return {
      isValid: false,
      error: messages?.matchWithValue ?? "field value doesn't match",
    }
  }

  return {
    isValid: true,
    error: '',
  }
}
