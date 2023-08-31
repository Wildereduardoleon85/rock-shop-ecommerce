export function capitalize(value: string): string {
  const cleanedValue = value.toLowerCase().trim()
  const firstLetter = cleanedValue.charAt(0)
  const rest = cleanedValue.slice(1, cleanedValue.length)

  return `${firstLetter.toUpperCase()}${rest}`
}
