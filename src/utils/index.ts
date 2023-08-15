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
