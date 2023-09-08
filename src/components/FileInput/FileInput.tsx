/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { useRef } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import styles from './FileInput.module.scss'
import { capitalize, getClassNames } from '../../utils'

type FileInputProps = {
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  file: File | null
  errorMessage: string
}

function FileInput({ onFileInputChange, file, errorMessage }: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function onUploadKeyDown(e: React.KeyboardEvent<HTMLLabelElement>) {
    if (e.key === 'Enter') {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.labelGroup}>
        <span>Product image</span>
        {errorMessage && (
          <span className={styles.labelError}>{capitalize(errorMessage)}</span>
        )}
      </div>
      <div
        className={getClassNames([
          styles.inputContainer,
          errorMessage && styles.error,
        ])}
      >
        <label
          tabIndex={0}
          role='button'
          aria-label='upload image'
          htmlFor='input-file'
          onKeyDown={onUploadKeyDown}
        >
          <input
            ref={fileInputRef}
            id='input-file'
            type='file'
            name='image'
            onChange={onFileInputChange}
            accept='.jpg,.jpeg,.png,.webp'
          />
          Choose file
          <span>
            <FaCloudUploadAlt />
          </span>
        </label>
        <span>{file?.name ?? 'No file chosen'}</span>
      </div>
    </div>
  )
}

export default FileInput
