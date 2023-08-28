import { Order, OrderDetailsResponse, OrderResponse } from '../types'
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
    getOrderDetails: builder.query<OrderDetailsResponse, string>({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useCreateOrderMutation, useGetOrderDetailsQuery } =
  ordersApiSlice
