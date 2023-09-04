export function subString(value: string, limit: number): string {
  if (limit >= value.length) {
    return value
  }
  return `${value.slice(0, limit)}...`
}
