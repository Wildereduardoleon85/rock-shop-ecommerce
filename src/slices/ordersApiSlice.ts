import { Order, OrderResponse } from '../types'
import { apiSlice } from './apiSlice'

const ORDERS_URL = import.meta.env.VITE_ORDERS_URL

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderResponse, Order>({
      query: (data) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useCreateOrderMutation } = ordersApiSlice
