import { useParams } from 'react-router-dom'
import { ProductEdit } from '../../../components'
import { useGetProductDetailsQuery } from '../../../slices'
import { Loader } from '../../../components/UI'
import { ErrorPage } from '../..'

function ProductEditPage() {
  const { id: productId } = useParams()
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId as string)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <ErrorPage />
  }

  return product && <ProductEdit product={product} />
}

export default ProductEditPage
