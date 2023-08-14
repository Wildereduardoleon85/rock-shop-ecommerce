/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit'
import { CartItem } from '../types'

type CartState = {
  cartItems: CartItem[]
  itemsPrice: number
  paymentMethod: string
  shippingAddress: {}
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}

const initiaState: CartState = {
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

  return initiaState
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState(),
  reducers: {
    addToCart: (state, action) => {
      const { product, qty } = action.payload
      const isItemsOnTheCart = state.cartItems[0]._id
      const currentItems = state.cartItems

      if (isItemsOnTheCart) {
        let foundItemIndex: number | null = null

        currentItems.forEach((item: any, index: number) => {
          if (product._id === item._id) {
            foundItemIndex = index
          }
        })

        if (foundItemIndex !== null) {
          state.cartItems[foundItemIndex].qty = qty
        } else {
          state.cartItems = [...state.cartItems, { ...product, qty }]
        }
      } else {
        state.cartItems = [{ ...product, qty }]
      }

      state.itemsPrice = 119.99
      state.paymentMethod = 'PayPal'
      state.shippingAddress = {}
      state.shippingPrice = 0
      state.taxPrice = 17.99
      state.totalPrice = 137.98

      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

export const { addToCart } = cartSlice.actions
