import { useState } from 'react'
import { Table } from '../../../components'
import { Alert } from '../../../components/UI'
import { useCreateProductMutation, useGetProductsQuery } from '../../../slices'

function ProductListPage() {
  const { data, error, isLoading, refetch } = useGetProductsQuery()
  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation()
  const [alert, setAlert] = useState<{
    message: string
    variant: 'success' | 'error'
  } | null>(null)

  const onCreateProduct = async () => {
    setAlert(null)

    try {
      await createProduct().unwrap()
      refetch()
      setAlert({ message: 'Product added successfuly', variant: 'success' })
    } catch (err: any) {
      setAlert({
        message: err?.data?.message || 'something went wrong',
        variant: 'error',
      })
    }
  }

  return (
    <>
      <Alert
        variant={alert?.variant ?? 'error'}
        message={alert?.message ?? ''}
      />
      <Table
        variant='products'
        data={data}
        isLoading={isLoading}
        error={error}
        onCreateProduct={onCreateProduct}
        createProductLoading={createProductLoading}
      />
    </>
  )
}

export default ProductListPage
