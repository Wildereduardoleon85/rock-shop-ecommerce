import { Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { ImSad } from 'react-icons/im'
import { FaRegTimesCircle } from 'react-icons/fa'
import { Loader } from '../UI'
import styles from './Orders.module.scss'
import { ROUTES } from '../../constants'
import { getClassNames, parseDate } from '../../utils'
import { ErrorPage } from '../../pages'
import { OrderResponse } from '../../types'

type OrdersProps = {
  variant?: 'common' | 'admin'
  orders: OrderResponse[] | undefined
  error: any
  isLoading: boolean
  className?: string
}

function Orders({
  className = '',
  variant = 'common',
  orders,
  error,
  isLoading,
}: OrdersProps) {
  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <ErrorPage className={styles.errorPage} />
  }

  return (
    <div className={getClassNames([styles.orders, className])}>
      {variant === 'common' ? <h2>My Orders</h2> : <h2>Orders</h2>}
      {orders && orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              {variant === 'admin' && <th>USER</th>}
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const adminOrder = order.user as { _id: string; name: string }

              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  {variant === 'admin' && <td>{adminOrder.name}</td>}
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
              )
            })}
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
