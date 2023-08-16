import { CartState, CartItem, Product } from '../types'

export function getInitialState(initialState: CartState): CartState {
  if (localStorage.getItem('cart')) {
    return JSON.parse(localStorage.getItem('cart') as string)
  }

  return initialState
}

export function buildCartItemObject(product: Product, qty: number): CartItem {
  return {
    _id: product._id,
    user: product.user,
    name: product.name,
    image: product.image,
    description: product.description,
    brand: product.brand,
    category: product.category,
    price: product.price,
    countInStock: product.countInStock,
    rating: product.rating,
    numReviews: product.numReviews,
    reviews: product.reviews,
    qty,
  }
}

export function getItemIndex(
  cartItems: CartItem[],
  productId: string
): number | null {
  let foundItemIndex: number | null = null

  cartItems.forEach((item: any, index: number) => {
    if (productId === item._id) {
      foundItemIndex = index
    }
  })

  return foundItemIndex
}

export function updateState(state: CartState): void {
  const itemsPrice = state.cartItems.reduce(
    (acc: number, curr: CartItem) => acc + curr.price * curr.qty,
    0
  )

  state.itemsPrice = Number(itemsPrice.toFixed(2))
  state.paymentMethod = 'PayPal'
  state.shippingAddress = {}
  // Shipping price would be 0 if the order amount is greater than 100
  state.shippingPrice = Number((state.itemsPrice > 100 ? 0 : 10).toFixed(2))
  state.taxPrice = Number((state.itemsPrice * 0.15).toFixed(2))
  state.totalPrice = Number(
    (state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2)
  )

  localStorage.setItem('cart', JSON.stringify(state))
}
