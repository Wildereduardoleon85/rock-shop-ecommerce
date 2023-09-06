import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import styles from './ProductEdit.module.scss'
import { Product } from '../../types'
import { useFormValues } from '../../hooks'
import { Form } from '..'
import { productEditFormValues } from '../../config'
import { ROUTES } from '../../constants'
import { useUpdateProductMutation } from '../../slices'
import { isFormValid } from '../../helpers'
import { Alert } from '../UI'

type ProductEditProps = {
  product: Product
}

function ProductEdit({ product }: ProductEditProps) {
  const navigate = useNavigate()
  const [updateProduct, { isLoading }] = useUpdateProductMutation()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const formValues = useFormValues(
    productEditFormValues({
      nameValue: product.name,
      priceValue: String(product.price),
      brandValue: product.brand,
      categoryValue: product.category,
      countInStockValue: String(product.countInStock),
      descriptionValue: product.description,
    })
  )

  const [
    nameInput,
    priceInput,
    descriptionInput,
    brandInput,
    categoryInput,
    countInStockInput,
  ] = formValues

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (errorMessage) setErrorMessage('')

    if (isFormValid(formValues)) {
      try {
        const body = {
          productId: product._id,
          name: nameInput.value,
          price: Number(priceInput.value),
          description: descriptionInput.value,
          brand: brandInput.value,
          category: categoryInput.value,
          countInStock: Number(countInStockInput.value),
        }
        await updateProduct(body).unwrap()
        navigate(ROUTES.productList)
      } catch (error: any) {
        setErrorMessage(error.data.message ?? 'something went wrong')
      }
    }
  }

  return (
    <>
      <Alert variant='error' message={errorMessage} />
      <div className={styles.root}>
        <Link className={styles.goBackButton} to={ROUTES.productList}>
          <IoMdArrowRoundBack />
          Go Back
        </Link>
        <div className={styles.formContainer}>
          <h1>Product Edit</h1>
          <Form
            className={styles.form}
            formInputs={formValues}
            buttonLabel='UPDATE'
            onFormSubmit={onFormSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  )
}

export default ProductEdit
