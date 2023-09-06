import { useInput } from '..'
import { InputConfig } from '../../types'

function useFormValues(inputConfig: InputConfig) {
  return inputConfig.map((input) => {
    const populatedInput = useInput({
      initialValue: input.initialValue,
      validateFunction: input.validateFunction,
      validateArg: input.validateArg,
    })

    return {
      name: input.name,
      type: input.type,
      placeholder: input.placeholder,
      label: input.label,
      ...populatedInput,
    }
  })
}

export default useFormValues
