import { useInput } from '..'
import { InputConfig } from '../../types'

function useFormValues(inputConfig: InputConfig) {
  return inputConfig.map((input) => {
    const populatedInput = useInput({
      initialValue: input.initialValue,
      name: input.name,
      schemaValidation: input.validation,
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
