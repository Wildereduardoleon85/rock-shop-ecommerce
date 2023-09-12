export function getFileExtension(file: File): string {
  const splittedName = file.name.split('.')

  return splittedName[splittedName.length - 1]
}
