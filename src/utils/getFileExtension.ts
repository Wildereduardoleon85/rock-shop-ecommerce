export function getFileExtension(file: File): string {
  return file.name.split('.')[1].toLowerCase()
}
