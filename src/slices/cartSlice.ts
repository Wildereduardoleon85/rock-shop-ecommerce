import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CartItem, Product } from '../types'

type CartState = {
  cartItems: CartItem[]
  itemsPrice: number
  paymentMethod: string
  shippingAddress: {}
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}

const initialState: CartState = {
  cartItems: [
    {
      _id: '',
      user: '',
      name: '',
      image: '',
      description: '',
      brand: '',
      category: '',
      price: 0,
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      reviews: [],
      qty: 0,
    },
  ],
  itemsPrice: 0,
  paymentMethod: '',
  shippingAddress: {},
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
}

function getInitialState() {
  if (localStorage.getItem('cart')) {
    return JSON.parse(localStorage.getItem('cart') as string)
  }

  return initialState
}

function buildCartItemObject(product: Product, qty: number) {
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

function getItemIndex(cartItems: CartItem[], productId: string): number | null {
  let foundItemIndex: number | null = null

  cartItems.forEach((item: any, index: number) => {
    if (productId === item._id) {
      foundItemIndex = index
    }
  })

  return foundItemIndex
}

function updateState(state: CartState): void {
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
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState(),
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; qty: number }>
    ) => {
      const { product, qty } = action.payload

      if (state.cartItems[0]._id) {
        const foundItemIndex = getItemIndex(state.cartItems, product._id)

        if (foundItemIndex !== null) {
          state.cartItems[foundItemIndex].qty = qty
        } else {
          state.cartItems = [
            ...state.cartItems,
            buildCartItemObject(product, qty),
          ]
        }
      } else {
        state.cartItems = [buildCartItemObject(product, qty)]
      }

      updateState(state)

      localStorage.setItem('cart', JSON.stringify(state))
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item: CartItem) => item._id !== action.payload
      )

      updateState(state)

      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

export const { addToCart, removeItem } = cartSlice.actions
