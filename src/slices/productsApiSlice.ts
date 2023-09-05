import { apiSlice } from '.'
import { Product } from '../types'

const PRODUCTS_URL = import.meta.env.VITE_PRODUCTS_URL

type UpdateProductSchema = {
  name?: string
  price?: number
  description?: string
  image?: string
  brand?: string
  category?: string
  countInStock?: number
}

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query<Product, string>({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation<Product, void>({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
      }),
    }),
    updateProduct: builder.mutation<
      Product,
      { productId: string; body: UpdateProductSchema }
    >({
      query: ({ productId, body }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsApiSlice
