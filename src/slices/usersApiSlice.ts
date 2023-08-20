import { apiSlice } from '.'

const USERS_URL = import.meta.env.VITE_USERS_URL

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useLoginMutation } = usersApiSlice
