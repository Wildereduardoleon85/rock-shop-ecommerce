export function formatCurrency(num: number): string {
  const roundedNumber = Number(num.toFixed(2))

  return new Intl.NumberFormat('en-US').format(roundedNumber)
}
