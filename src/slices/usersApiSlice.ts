import { apiSlice } from '.'
import { LoginCredentials, UserInfo } from '../types'

const USERS_URL = import.meta.env.VITE_USERS_URL

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserInfo, LoginCredentials>({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useLoginMutation } = usersApiSlice
