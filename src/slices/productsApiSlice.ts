import { apiSlice } from '.'
import { Product } from '../types'

const PRODUCTS_URL = import.meta.env.VITE_PRODUCTS_URL
const UPLOAD_URL = import.meta.env.VITE_UPLOAD_IMAGE_URL

type UpdateProductSchema = {
  productId: string
  name?: string
  price?: number
  description?: string
  image?: string
  brand?: string
  category?: string
  countInStock?: number
}

type UploadImageRespose = {
  message: string
  image: File
}

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      providesTags: ['Products'],
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
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<Product, UpdateProductSchema>({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    uploadProductImage: builder.mutation<UploadImageRespose, FormData>({
      query: (data) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} = productsApiSlice
