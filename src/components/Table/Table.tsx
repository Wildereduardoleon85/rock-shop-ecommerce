/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { ImSad } from 'react-icons/im'
import { FaRegTimesCircle } from 'react-icons/fa'
import { Button, Loader } from '../UI'
import styles from './Table.module.scss'
import { ROUTES } from '../../constants'
import { getClassNames, parseDate } from '../../utils'
import { ErrorPage } from '../../pages'
import { OrderResponse, Product, UserInfo } from '../../types'
import { ProductsTable, UsersTable } from '..'

type Variants = 'orders' | 'adminOrders' | 'products' | 'users'

type OrderProps = {
  orders: OrderResponse[]
  variant: Variants
}

type TableProps = {
  variant: Variants
  data: OrderResponse[] | Product[] | undefined | UserInfo[]
  error: any
  isLoading: boolean
  className?: string
  onCreateProduct?: () => Promise<void>
  createProductLoading?: boolean
  refetch?: () => void
}

const ORDER_HEADERS = {
  h1: 'ID',
  h2: 'DATE',
  h3: 'TOTAL',
  h4: 'PAID',
  h5: 'DELIVERED',
}

const VARIANTS = {
  adminOrders: {
    title: 'Orders',
    headers: ORDER_HEADERS,
  },
  orders: {
    title: 'My Orders',
    headers: ORDER_HEADERS,
  },
  products: {
    title: 'Products',
    headers: {
      h1: 'ID',
      h2: 'NAME',
      h3: 'PRICE',
      h4: 'CATEGORY',
      h5: 'BRAND',
    },
  },
  users: {
    title: 'Users',
    headers: {
      h1: 'ID',
      h2: 'NAME',
      h3: 'EMAIL',
      h4: 'ADMIN',
    },
  },
}

function OrdersTable({ orders, variant }: OrderProps) {
  return orders.map((order) => {
    const adminOrder = order.user as { _id: string; name: string }

    return (
      <tr key={order._id}>
        <td>{order._id}</td>
        {variant === 'adminOrders' && <td>{adminOrder.name}</td>}
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
          <Link
            className={styles.detailsButton}
            to={ROUTES.order.replace(':id', order._id)}
          >
            DETAILS
          </Link>
        </td>
      </tr>
    )
  })
}

function Table({
  className = '',
  variant,
  data,
  error,
  isLoading,
  createProductLoading,
  onCreateProduct,
  refetch,
}: TableProps) {
  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <ErrorPage className={styles.errorPage} />
  }

  function renderTable() {
    switch (variant) {
      case 'products':
        return (
          <ProductsTable
            products={data as Product[]}
            refetch={refetch as () => void}
          />
        )

      case 'users':
        return (
          <UsersTable
            users={data as UserInfo[]}
            refetch={refetch as () => void}
          />
        )

      default:
        return (
          <OrdersTable orders={data as OrderResponse[]} variant={variant} />
        )
    }
  }

  return (
    <div className={getClassNames([styles.orders, className])}>
      <div className={styles.titleContainer}>
        <h2>{VARIANTS[variant].title}</h2>
        {variant === 'products' && (
          <Button
            color='black'
            onClick={onCreateProduct}
            disabled={createProductLoading}
            isLoading={createProductLoading}
          >
            CREATE PRODUCT
          </Button>
        )}
      </div>
      {data && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>{VARIANTS[variant].headers.h1}</th>
              {variant === 'adminOrders' && <th>USER</th>}
              <th>{VARIANTS[variant].headers.h2}</th>
              <th>{VARIANTS[variant].headers.h3}</th>
              <th>{VARIANTS[variant].headers.h4}</th>
              {variant !== 'users' && <th>{VARIANTS[variant].headers.h5}</th>}
              <th />
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
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

export default Table
