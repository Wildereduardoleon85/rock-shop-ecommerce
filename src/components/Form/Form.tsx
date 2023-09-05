import styles from './Form.module.scss'
import { getClassNames } from '../../utils'
import { Button, Input } from '../UI'

type FormInputs = {
  name: string
  type: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  value: string
  error: string
  label: string
}

type FormProps = {
  formInputs: FormInputs[]
  onFormSubmit:
    | ((e: React.FormEvent<HTMLFormElement>) => Promise<void>)
    | ((e: React.FormEvent<HTMLFormElement>) => void)
  className?: string
  isLoading?: boolean
  buttonLabel: string
}

function Form({
  formInputs,
  onFormSubmit,
  className = '',
  isLoading,
  buttonLabel,
}: FormProps) {
  return (
    <form
      className={getClassNames([styles.root, className])}
      onSubmit={onFormSubmit}
    >
      <div className={styles.formCard}>
        {formInputs.map((formInputProps) => (
          <Input key={formInputProps.name} inputProps={formInputProps} />
        ))}
      </div>
      <Button
        type='submit'
        className={styles.button}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {buttonLabel}
      </Button>
    </form>
  )
}

export default Form
