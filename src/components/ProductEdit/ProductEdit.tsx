import { Link, useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import React, { useState } from 'react'
import styles from './ProductEdit.module.scss'
import { ROUTES } from '../../constants'
import { Product } from '../../types'
import { Alert, Button, Input } from '../UI'
import { FileInput } from '..'
import { useFormValues } from '../../hooks'
import { productEditFormValues } from '../../config'
import {
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices'
import { getFileExtension, isFormValid, renameImageFile } from '../../helpers'

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']

type ProductEditProps = {
  product: Product
}

function ProductEdit({ product }: ProductEditProps) {
  const navigate = useNavigate()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [fileErrorMessage, setFileErrorMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [updateProduct, { isLoading }] = useUpdateProductMutation()
  const [uploadProductImage, { isLoading: isLoadingUpload }] =
    useUploadProductImageMutation()
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
      const fileExtension = getFileExtension(files[0])

      if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
        setFileErrorMessage('only (.png, .jpeg, .jpg or .webp) is allowed!')
        return
      }

      const newName = `images-${Date.now()}.${fileExtension}`
      const renamedFile = renameImageFile(files[0], newName)
      setImageFile(renamedFile)
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (errorMessage) setErrorMessage('')

    if (isFormValid(formValues)) {
      try {
        if (imageFile) {
          const formData = new FormData()
          formData.append('image', imageFile)
          await uploadProductImage(formData).unwrap()
        }

        await updateProduct({
          productId: product._id,
          brand: brandInput.value,
          category: categoryInput.value,
          countInStock: Number(countInStockInput.value),
          description: descriptionInput.value,
          image: imageFile?.name ?? currentImageInput.value,
          name: nameInput.value,
          price: Number(priceInput.value),
        }).unwrap()

        navigate(ROUTES.productList)
      } catch (error: any) {
        setErrorMessage(error.data.message ?? 'something went wrong')
      }
    } else {
      formValues.forEach((value) => {
        value.onBlur()
      })
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
          <Button
            isLoading={isLoading || isLoadingUpload}
            disabled={isLoading || isLoadingUpload}
            className={styles.submitButton}
            type='submit'
          >
            update
          </Button>
        </form>
      </div>
    </>
  )
}

export default ProductEdit
