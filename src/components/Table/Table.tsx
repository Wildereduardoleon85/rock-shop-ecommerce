/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { ImSad } from 'react-icons/im'
import { FaRegTimesCircle, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Loader } from '../UI'
import styles from './Table.module.scss'
import { ROUTES } from '../../constants'
import {
  formatCurrency,
  getClassNames,
  parseDate,
  subString,
} from '../../utils'
import { ErrorPage } from '../../pages'
import { OrderResponse, Product } from '../../types'

type Variants = 'orders' | 'adminOrders' | 'products'

type OrderProps = {
  orders: OrderResponse[]
  variant: Variants
}

type ProductsTableProps = {
  products: Product[]
}

type TableProps = {
  variant: Variants
  data: OrderResponse[] | Product[] | undefined
  error: any
  isLoading: boolean
  className?: string
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
}

function OrdersTable({ orders, variant }: OrderProps) {
  return orders.map((order: any) => {
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
          <Link to={ROUTES.order.replace(':id', order._id)}>DETAILS</Link>
        </td>
      </tr>
    )
  })
}

function ProductsTable({ products }: ProductsTableProps) {
  return products.map((product: any) => (
    <tr key={product._id}>
      <td>{product._id}</td>
      <td>{subString(product.name, 100)}</td>
      <td>{formatCurrency(product.price)}</td>
      <td>{product.category}</td>
      <td>{product.brand}</td>
      <td className={styles.iconButtonsContainer}>
        <Link
          to={ROUTES.editProduct}
          aria-label='edit-product'
          className={styles.editIconButton}
        >
          <FaEdit />
        </Link>
        <button
          type='button'
          aria-label='delete-product'
          className={styles.trashIconButton}
        >
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  ))
}

function Table({
  className = '',
  variant,
  data,
  error,
  isLoading,
}: TableProps) {
  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <ErrorPage className={styles.errorPage} />
  }

  return (
    <div className={getClassNames([styles.orders, className])}>
      <div className={styles.titleContainer}>
        <h2>{VARIANTS[variant].title}</h2>
        {variant === 'products' && (
          <button type='button' className={styles.createProductButton}>
            CREATE PRODUCT
          </button>
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
              <th>{VARIANTS[variant].headers.h5}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {variant === 'products' ? (
              <ProductsTable products={data as Product[]} />
            ) : (
              <OrdersTable orders={data as OrderResponse[]} variant={variant} />
            )}
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

export default Table
