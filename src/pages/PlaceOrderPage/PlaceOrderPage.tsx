import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumbs, Order } from '../../components'
import { RootState } from '../../store'
import { ROUTES } from '../../constants'
import { clearCartItems, useCreateOrderMutation } from '../../slices'
import { Alert } from '../../components/UI'

function PlaceOrderPage() {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = useSelector((state: RootState) => state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation()
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate(ROUTES.home)
    }

    if (!shippingAddress.address) {
      navigate(ROUTES.shipping)
    }

    if (!paymentMethod) {
      navigate(ROUTES.payment)
    }
  }, [])

  const onPlaceOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        isPaid: true,
        paidAt: new Date(Date.now()),
      }).unwrap()
      dispatch(clearCartItems())
      navigate(ROUTES.order.replace(':id', res._id))
    } catch (err: any) {
      setErrorMessage(err.data.message)
    }
  }

  return (
    <>
      {isError && <Alert message={errorMessage} trigger={isError} />}
      <Breadcrumbs />
      <Order
        cartItems={cartItems}
        shippingAddress={shippingAddress}
        paymentMethod={paymentMethod}
        itemsPrice={itemsPrice}
        shippingPrice={shippingPrice}
        taxPrice={taxPrice}
        totalPrice={totalPrice}
        variant='place-order'
        isLoading={isLoading}
        onPlaceOrder={onPlaceOrder}
      />
    </>
  )
}

export default PlaceOrderPage
