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
    getMyOrders: builder.query<OrderResponse[], void>({
      query: () => ({
        url: `${ORDERS_URL}/my-orders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query<OrderResponse[], void>({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation<OrderResponse, string>({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = ordersApiSlice
