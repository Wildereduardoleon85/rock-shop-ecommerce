import { ChangeEvent } from 'react'
import styles from './Input.module.scss'
import { getClassNames } from '../../../utils'

const { labelGroup, errorClassName } = styles

type InputProps = {
  inputProps: {
    name: string
    label: string
    error: string
    type: string
    placeholder: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur: () => void
    value: string
  }
  className?: string
}

function Input({ inputProps, className = '' }: InputProps) {
  const { name, label, error, type, placeholder, onChange, onBlur, value } =
    inputProps

  return (
    <div className={getClassNames([styles.root, className])}>
      <div className={labelGroup}>
        <label htmlFor={name}>{label}</label>
        {error && <span>{error}</span>}
      </div>
      <input
        autoComplete='off'
        name={name}
        type={type}
        placeholder={placeholder}
        className={error ? errorClassName : ''}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </div>
  )
}

export default Input
