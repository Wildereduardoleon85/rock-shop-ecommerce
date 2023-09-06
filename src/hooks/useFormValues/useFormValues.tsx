import { useInput } from '..'

type InputConfig = {
  initialValue: string
  name: string
  type: string
  placeholder: string
  label: string
  validateFunction: Function
  validateArg?: any
}[]

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
