export function renameImageFile(originalFile: File, newFileName: string) {
  return new File([originalFile], newFileName, { type: originalFile.type })
}
