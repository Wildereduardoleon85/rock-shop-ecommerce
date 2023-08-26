import { apiSlice } from './apiSlice'

const ORDERS_URL = import.meta.env.VITE_ORDERS_URL

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // TODO: add type definitions for mutation (see  `userApiSlice example`)
    createOrder: builder.mutation({
      query: (data) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useCreateOrderMutation } = ordersApiSlice
