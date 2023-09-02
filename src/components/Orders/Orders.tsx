import { Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { ImSad } from 'react-icons/im'
import { FaRegTimesCircle } from 'react-icons/fa'
import { useGetMyOrdersQuery } from '../../slices'
import { Alert, Loader } from '../UI'
import styles from './Orders.module.scss'
import { ROUTES } from '../../constants'
import { parseDate } from '../../utils'

function Orders() {
  const { data: orders, error, isLoading } = useGetMyOrdersQuery()
  const err = error as any

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
      <Alert
        variant='error'
        message={err?.data?.message || 'something went wrong'}
        trigger={error}
      />
    )
  }

  return (
    <div className={styles.orders}>
      <h2>My Orders</h2>
      {orders && orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{parseDate(order.createdAt)}</td>
                <td>{order.itemsPrice}</td>
                <td>
                  {order.isPaid ? (
                    parseDate(order.paidAt)
                  ) : (
                    <FaRegTimesCircle className={styles.timesIcon} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    parseDate(order.deliveredAt)
                  ) : (
                    <FaRegTimesCircle className={styles.timesIcon} />
                  )}
                </td>
                <td>
                  <Link to={ROUTES.order.replace(':id', order._id)}>
                    DETAILS
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.noOrders}>
          <div>
            <AiOutlineSearch className={styles.searchIcon} />
          </div>
          <h3>
            Looks like you dont&apos;t have an order yet...{' '}
            <ImSad className={styles.sadIcon} />
          </h3>
          <p>Go find the product you like</p>
          <Link to={ROUTES.home}>GO SHOPPING</Link>
        </div>
      )}
    </div>
  )
}

export default Orders
