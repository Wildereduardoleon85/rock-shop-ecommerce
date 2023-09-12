export function renameImage(name: string): string {
  const splittedName = name.split('.')
  const extension = splittedName[splittedName.length - 1]

  return `image-${Date.now()}.${extension}`
}
