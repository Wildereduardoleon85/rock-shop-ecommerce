export function maskCardNumberInput(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setValue: (value: string) => void
) {
  const value = e.target.value.replace(/\D/g, '') // Remove non-digit characters

  let formattedValue = ''
  for (let i = 0; i < value.length; i += 1) {
    formattedValue += value[i]
    if ((i + 1) % 4 === 0 && i !== value.length - 1) {
      formattedValue += '  '
    }
  }

  if (formattedValue.length <= 22) {
    setValue(formattedValue)
  }
}

export function maskExpirationDateInput(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setValue: (value: string) => void
) {
  const value = e.target.value.replace(/\D/g, '')

  let formattedValue = ''
  for (let i = 0; i < value.length; i += 1) {
    formattedValue += value[i]
    if (i + 1 === 2 && i !== value.length - 1) {
      formattedValue += '/'
    }
  }

  if (formattedValue.length <= 7) {
    setValue(formattedValue)
  }
}

export function maskCvvInput(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setValue: (value: string) => void
) {
  const value = e.target.value.replace(/\D/g, '')

  if (value.length <= 3) {
    setValue(value)
  }
}

export function maskCardNameInput(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setValue: (value: string) => void
) {
  const value = e.target.value.replace(/\d+/g, '')

  setValue(value)
}
