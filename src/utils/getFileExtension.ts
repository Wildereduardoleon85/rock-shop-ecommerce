export function getFileExtension(file: File): string {
  const result = file.name
    .trim()
    .substring(file.name.length - 4)
    .replace('.', '')

  return result
}
