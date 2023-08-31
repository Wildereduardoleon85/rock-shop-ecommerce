import { useParams } from 'react-router-dom'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { Order } from '../../components'
import { useGetOrderDetailsQuery } from '../../slices'
import { ErrorPage, Loader } from '../../components/UI'

function OrderDetailsPage() {
  const { id: orderId } = useParams()
  const { data, isLoading, error } = useGetOrderDetailsQuery(orderId as string)
  const rtkError = error as FetchBaseQueryError

  if (isLoading) {
    return <Loader />
  }

  if (rtkError) {
    return rtkError.status === 404 ? (
      <ErrorPage variant='not-found' />
    ) : (
      <ErrorPage />
    )
  }

  return (
    data && (
      <Order
        variant='order-details'
        orderId={orderId}
        cartItems={data.orderItems}
        shippingAddress={data.shippingAddress}
        paymentMethod={data.paymentMethod}
        itemsPrice={data.itemsPrice}
        shippingPrice={data.shippingPrice}
        taxPrice={data.taxPrice}
        totalPrice={data.totalPrice}
        isPaid={data.isPaid}
        isDelivered={data.isDelivered}
        user={data.user}
      />
    )
  )
}

export default OrderDetailsPage
