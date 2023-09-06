import { validateNumber, validateSingleString } from '../helpers'

type ProductEditFormValues = {
  nameValue: string
  priceValue: string
  brandValue: string
  categoryValue: string
  countInStockValue: string
}

export const productEditFormValues = ({
  nameValue,
  priceValue,
  brandValue,
  categoryValue,
  countInStockValue,
}: ProductEditFormValues) => [
  {
    initialValue: nameValue,
    name: 'name',
    type: 'text',
    placeholder: 'Product name',
    label: 'Name',
    validateFunction: validateSingleString,
  },
  {
    initialValue: priceValue,
    name: 'price',
    type: 'text',
    placeholder: 'Product price',
    label: 'Price',
    validateFunction: validateNumber,
  },
  {
    initialValue: brandValue,
    name: 'brand',
    type: 'text',
    placeholder: 'Product brand',
    label: 'Price',
    validateFunction: validateSingleString,
  },
  {
    initialValue: categoryValue,
    name: 'category',
    type: 'text',
    placeholder: 'Product category',
    label: 'Category',
    validateFunction: validateSingleString,
  },
  {
    initialValue: countInStockValue,
    name: 'countInStock',
    type: 'text',
    placeholder: 'Product count in stock',
    label: 'Count in stock',
    validateFunction: validateNumber,
  },
]
