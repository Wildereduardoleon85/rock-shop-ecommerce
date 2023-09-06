export function isformValid(values: { isValid: boolean }[]) {
  let isValid = true

  values.forEach((value) => {
    if (!value.isValid) {
      isValid = false
    }
  })

  return isValid
}
