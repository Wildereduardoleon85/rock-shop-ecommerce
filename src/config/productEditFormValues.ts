import { InputConfig } from '../types'
import { validateString } from '../helpers'

type ProductEditFormValues = {
  nameValue: string
  priceValue: string
  brandValue: string
  categoryValue: string
  countInStockValue: string
  descriptionValue: string
  currentImageValue: string
}

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
    validation: {
      validateFunction: validateString,
      opts: {
        required: true,
        min: 2,
        max: 200,
      },
    },
  },
  {
    initialValue: brandValue,
    name: 'brand',
    type: 'text',
    placeholder: 'Product brand',
    label: 'Brand',
    validation: {
      validateFunction: validateString,
      opts: {
        alphanum: true,
        required: true,
        min: 2,
        max: 50,
      },
    },
  },
  {
    initialValue: categoryValue,
    name: 'category',
    type: 'text',
    placeholder: 'Product category',
    label: 'Category',
    validation: {
      validateFunction: validateString,
      opts: {
        required: true,
        alphanum: true,
        min: 2,
        max: 50,
      },
    },
  },
  {
    initialValue: priceValue,
    name: 'price',
    type: 'text',
    placeholder: 'Product price',
    label: 'Price',
    validation: {
      validateFunction: validateString,
      opts: {
        required: true,
        currency: true,
      },
    },
  },
  {
    initialValue: countInStockValue,
    name: 'countInStock',
    type: 'text',
    placeholder: 'Product count in stock',
    label: 'Count in stock',
    validation: {
      validateFunction: validateString,
      opts: {
        required: true,
        numeric: true,
      },
    },
  },
  {
    initialValue: descriptionValue,
    name: 'description',
    type: 'textarea',
    placeholder: 'Product description',
    label: 'Description',
    validation: {
      validateFunction: validateString,
      opts: {
        required: true,
        min: 3,
        max: 1500,
      },
    },
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
