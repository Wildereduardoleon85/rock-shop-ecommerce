import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumbs, Order } from '../../components'
import { RootState } from '../../store'
import { ROUTES } from '../../constants'
import { clearCartItems, setAlert, useCreateOrderMutation } from '../../slices'

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
  const [createOrder, { isLoading }] = useCreateOrderMutation()

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
      dispatch(
        setAlert({
          variant: 'error',
          message: err?.data?.message ?? 'something went wrong',
        })
      )
    }
  }

  return (
    <>
      <Breadcrumbs step1 step2 step3 />
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
