/* eslint-disable no-underscore-dangle */
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
        let foundItemIndex: number | null = null

        state.cartItems.forEach((item: any, index: number) => {
          if (product._id === item._id) {
            foundItemIndex = index
          }
        })

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
    },
  },
})

export const { addToCart } = cartSlice.actions
