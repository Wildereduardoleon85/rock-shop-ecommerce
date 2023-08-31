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
