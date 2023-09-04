import { Table } from '../../../components'
import { useGetProductsQuery } from '../../../slices'

function ProductListPage() {
  const { data, error, isLoading } = useGetProductsQuery()

  return (
    <Table variant='products' data={data} isLoading={isLoading} error={error} />
  )
}

export default ProductListPage
