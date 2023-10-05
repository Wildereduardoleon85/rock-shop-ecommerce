import { useEffect, useRef, useState } from 'react'
import { ImCheckmark } from 'react-icons/im'
import { v4 as uuidv4 } from 'uuid'
import { getClassNames } from '../../../utils'
import styles from './Checkbox.module.scss'

type CheckboxProps = {
  label: string
  checked: boolean
  setChecked: React.Dispatch<React.SetStateAction<boolean>>
  className?: string
}

function Checkbox({
  label,
  checked,
  setChecked,
  className = '',
}: CheckboxProps) {
  const [id, setId] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setId(uuidv4())
  }, [])

  function onCheckboxKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === ' ' || e.key === 'Enter') {
      inputRef.current?.click()
    }
  }

  function onCheckboxInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }

  return (
    <label className={getClassNames([styles.label, className])} htmlFor={id}>
      <input
        ref={inputRef}
        checked={checked}
        type='checkbox'
        id={id}
        onChange={onCheckboxInputChange}
      />
      <span
        role='checkbox'
        tabIndex={0}
        aria-checked={checked}
        aria-label='is admin'
        onKeyDown={onCheckboxKeyDown}
        className={styles.checkbox}
      >
        <ImCheckmark />
      </span>
      {label}
    </label>
  )
}

export default Checkbox
