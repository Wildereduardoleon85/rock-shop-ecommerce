import { useParams } from 'react-router-dom'
import { Meta, ProductEdit } from '../../../components'
import { useGetProductDetailsQuery } from '../../../slices'
import { Loader } from '../../../components/UI'
import { ErrorPage } from '../..'

function ProductEditPage() {
  const { id: productId } = useParams()
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId as string)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    const err = error as any
    if (err.status === 404) {
      return <ErrorPage variant='not-found' />
    }
    return <ErrorPage />
  }

  return (
    product && (
      <>
        <Meta />
        <ProductEdit product={product} refetch={refetch} />
      </>
    )
  )
}

export default ProductEditPage
