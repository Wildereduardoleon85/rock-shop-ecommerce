import { useInput } from '..'
import { InputConfig } from '../../types'

function useFormValues(inputConfig: InputConfig) {
  return inputConfig.map((input) => {
    const populatedInput = useInput({
      initialValue: input.initialValue,
      validation: input.validation,
      maskFunction: input.maskFunction,
      onInputBlur: input.onBlur,
      onInputFocus: input.onFocus,
    })

    return {
      name: input.name,
      type: input.type,
      placeholder: input.placeholder,
      label: input.label,
      readOnly: input.readOnly,
      ...populatedInput,
    }
  })
}

export default useFormValues
