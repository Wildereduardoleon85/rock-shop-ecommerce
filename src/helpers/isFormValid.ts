export function isFormValid(formValues: { value: any; isValid: boolean }[]) {
  let isValid = true

  formValues.forEach((formValue) => {
    if (!formValue.value || !formValue.isValid) {
      isValid = false
    }
  })

  return isValid
}
