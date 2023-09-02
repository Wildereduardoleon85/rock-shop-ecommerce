export function parseDate(rawDate: Date): string {
  const day = new Date(rawDate).getDate()
  const month = new Date(rawDate).getMonth()
  const year = new Date(rawDate).getFullYear()

  let cleanedDay: number | string = day
  let cleanedMonth: number | string = month + 1

  if (String(day).length < 2) {
    cleanedDay = `${0}${day}`
  }

  if (String(month).length < 2) {
    cleanedMonth = `${0}${cleanedMonth}`
  }

  return `${year}-${cleanedMonth}-${cleanedDay}`
}
