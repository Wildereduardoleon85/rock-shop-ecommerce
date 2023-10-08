import { apiSlice } from '.'
import { PRODUCTS_URL, UPLOAD_URL } from '../constants'
import { Product } from '../types'

type UpdateProductSchema = {
  productId: string
  name?: string
  price?: number
  description?: string
  images?: {
    default?: string
    md?: string
  }
  brand?: string
  category?: string
  countInStock?: number
}

type UploadImageRespose = {
  message: string
  image: {
    filename: string
  }
}

type CreateReviewBody = {
  productId: string
  rating?: number
  comment?: string
}

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], { keywords?: string }>({
      query: ({ keywords }) => ({
        url: PRODUCTS_URL,
        params: {
          keywords,
        },
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
    deleteProduct: builder.mutation<string, string>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),
    createReview: builder.mutation<Product, CreateReviewBody>({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
} = productsApiSlice
