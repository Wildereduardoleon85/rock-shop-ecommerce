import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CartItem, Product, CartState } from '../types'
import {
  buildCartItemObject,
  getInitialState,
  getItemIndex,
  updateState,
} from '../helpers'

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

export const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState(initialState),
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; qty: number }>
    ) => {
      const { product, qty } = action.payload

      if (state.cartItems.length > 0 && state.cartItems[0]._id) {
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
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item: CartItem) => item._id !== action.payload
      )

      updateState(state)
    },
  },
})

export const { addToCart, removeItem } = cartSlice.actions
