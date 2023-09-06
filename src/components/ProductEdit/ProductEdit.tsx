import styles from './ProductEdit.module.scss'
import { Product } from '../../types'
import { useFormValues } from '../../hooks'
import { Form } from '..'
import { productEditFormValues } from '../../config'

type ProductEditProps = {
  product: Product
}

function ProductEdit({ product }: ProductEditProps) {
  const formValues = useFormValues(
    productEditFormValues({
      nameValue: product.name,
      priceValue: String(product.price),
      brandValue: product.brand,
      categoryValue: product.category,
      countInStockValue: String(product.countInStock),
    })
  )

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className={styles.root}>
      <h1>Product Edit</h1>
      <Form
        className={styles.form}
        formInputs={formValues}
        buttonLabel='UPDATE'
        onFormSubmit={onFormSubmit}
      />
    </div>
  )
}

export default ProductEdit
