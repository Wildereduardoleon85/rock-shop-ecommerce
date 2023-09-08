import joi from 'joi'
import { validateNumber, validateSingleString } from '../helpers'
import { InputConfig } from '../types'

type ProductEditFormValues = {
  nameValue: string
  priceValue: string
  brandValue: string
  categoryValue: string
  countInStockValue: string
  descriptionValue: string
  currentImageValue: string
}

const onlyLettersValidation = joi
  .string()
  .required()
  .min(3)
  .pattern(/^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s]+$/u)
  .max(60)
  .messages({
    'string.pattern.base': '"value" must contain only letters',
    'string.max': '"value" must not exceed {#limit} characters long',
  })

const onLyNumbersValidation = joi
  .string()
  .pattern(/^[0-9.]+$/)
  .required()
  .messages({
    'string.pattern.base': '"value" must contain only numbers',
    'string.max': '"value" must not exceed {#limit} characters long',
  })

export const productEditFormValues = ({
  nameValue,
  priceValue,
  brandValue,
  categoryValue,
  countInStockValue,
  descriptionValue,
  currentImageValue,
}: ProductEditFormValues): InputConfig => [
  {
    initialValue: nameValue,
    name: 'name',
    type: 'text',
    placeholder: 'Product name',
    label: 'Name',
    validation: onlyLettersValidation,
  },
  {
    initialValue: brandValue,
    name: 'brand',
    type: 'text',
    placeholder: 'Product brand',
    label: 'Brand',
    validation: joi.string().required().min(2).max(60),
  },
  {
    initialValue: categoryValue,
    name: 'category',
    type: 'text',
    placeholder: 'Product category',
    label: 'Category',
    validation: onlyLettersValidation,
  },
  {
    initialValue: priceValue,
    name: 'price',
    type: 'text',
    placeholder: 'Product price',
    label: 'Price',
    validation: onLyNumbersValidation,
  },
  {
    initialValue: countInStockValue,
    name: 'countInStock',
    type: 'text',
    placeholder: 'Product count in stock',
    label: 'Count in stock',
    validation: joi.string().pattern(/^\d+$/).required().messages({
      'string.pattern.base': '"value" must contain only numbers',
      'string.max': '"value" must not exceed {#limit} characters long',
    }),
  },
  {
    initialValue: descriptionValue,
    name: 'description',
    type: 'textarea',
    placeholder: 'Product description',
    label: 'Description',
    validation: joi.string().required().min(2).max(200),
  },
  {
    initialValue: currentImageValue,
    name: 'currentImage',
    type: 'text',
    placeholder: 'Current image',
    label: 'Current image',
    readOnly: true,
  },
]
