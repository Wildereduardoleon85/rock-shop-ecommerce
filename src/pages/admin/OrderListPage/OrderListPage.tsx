import { Orders } from '../../../components'
import { useGetOrdersQuery } from '../../../slices'
import styles from './OrderListPage.module.scss'

function OrderListPage() {
  const { data, isLoading, error } = useGetOrdersQuery()

  return (
    <Orders
      className={styles.orders}
      orders={data}
      error={error}
      isLoading={isLoading}
      variant='admin'
    />
  )
}

export default OrderListPage
