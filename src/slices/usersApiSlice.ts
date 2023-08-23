import { apiSlice } from '.'
import { LoginCredentials, UserInfo, RegisterCredentials } from '../types'

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
    register: builder.mutation<UserInfo, RegisterCredentials>({
      query: (data) => ({
        url: USERS_URL,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  usersApiSlice
