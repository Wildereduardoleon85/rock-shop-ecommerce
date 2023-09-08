import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import React, { useState } from 'react'
import styles from './ProductEdit.module.scss'
import { ROUTES } from '../../constants'
import { Product } from '../../types'
import { Button, Input } from '../UI'
import { FileInput } from '..'
import { useFormValues } from '../../hooks'
import { productEditFormValues } from '../../config'
import { getFileExtension } from '../../utils'

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']

type ProductEditProps = {
  product: Product
}

function ProductEdit({ product }: ProductEditProps) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [fileErrorMessage, setFileErrorMessage] = useState<string>('')
  const formValues = useFormValues(
    productEditFormValues({
      nameValue: product.name,
      categoryValue: product.category,
      countInStockValue: String(product.countInStock),
      descriptionValue: product.description,
      currentImageValue: product.image,
      priceValue: String(product.price),
      brandValue: product.brand,
    })
  )

  const [
    nameInput,
    brandInput,
    categoryInput,
    priceInput,
    countInStockInput,
    descriptionInput,
    currentImageInput,
  ] = formValues

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (fileErrorMessage) setFileErrorMessage('')

    if (files && files.length > 0) {
      if (!ALLOWED_EXTENSIONS.includes(getFileExtension(files[0]))) {
        setFileErrorMessage('only (.png, .jpeg, .jpg or .webp) is allowed!')
        return
      }
      setImageFile(files[0])
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('submit')
  }

  return (
    <div className={styles.root}>
      <Link className={styles.goBackButton} to={ROUTES.productList}>
        <IoMdArrowRoundBack />
        Go Back
      </Link>
      <form onSubmit={onSubmit} className={styles.formContainer}>
        <h1>Product Edit</h1>
        <div className={styles.form}>
          {formValues.slice(0, 3).map((value) => (
            <Input key={value.name} inputProps={value} />
          ))}
          <div className={styles.shortInputsContainer}>
            {formValues.slice(3, 5).map((value) => (
              <Input key={value.name} inputProps={value} />
            ))}
          </div>
          {formValues.slice(5, formValues.length).map((value) => (
            <Input key={value.name} inputProps={value} />
          ))}
          <FileInput
            errorMessage={fileErrorMessage}
            file={imageFile}
            onFileInputChange={onFileInputChange}
          />
        </div>
        <Button className={styles.submitButton} type='submit'>
          update
        </Button>
      </form>
    </div>
  )
}

export default ProductEdit
