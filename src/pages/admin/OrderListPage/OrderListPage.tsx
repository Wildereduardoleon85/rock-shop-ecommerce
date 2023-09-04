import { Table } from '../../../components'
import { useGetOrdersQuery } from '../../../slices'

function OrderListPage() {
  const { data, isLoading, error } = useGetOrdersQuery()

  return (
    <Table
      data={data}
      error={error}
      isLoading={isLoading}
      variant='adminOrders'
    />
  )
}

export default OrderListPage
