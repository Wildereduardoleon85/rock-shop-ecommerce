function validateString(
  value,
  { required, min, max, fieldName, regex, regexError }
) {
  let isValid = true
  let error = ''

  if (!value && required) {
    return {
      isValid: false,
      error: `filed ${fieldName} is required`,
    }
  }

  if (typeof value !== 'string') {
    return {
      isValid: false,
      error: `field ${fieldName} must be a string`,
    }
  }

  if (required && value.trim().length === 0) {
    return {
      isValid: false,
      error: `filed ${fieldName} must not be empty`,
    }
  }

  if (min && value.trim().length < min) {
    return {
      isValid: false,
      error: `field ${fieldName} must be at least ${min} characters long`,
    }
  }

  if (max && value.trim().length > max) {
    return {
      isValid: false,
      error: `field ${fieldName} must not exceed ${max} characters`,
    }
  }

  if (!regex.test(value)) {
    return {
      isValid: false,
      error:
        regexError ?? `field ${fieldName} must match with ${regex} pattern`,
    }
  }

  return {
    isValid,
    error,
  }
}

const opts = {
  fieldName: 'name',
  regex: /^[]+$/,
  regexError: 'field name must contain only numbers',
}

const microhpne =
  'Sondery Metal Distortion Guitar Effect Pedal, Warm Smooth Wide Range of Vintage Distortion - True Bypass, 3 Modes of Solo Turbo and Normal - Mini Size, Art Design Series'

console.log(microhpne.length)
