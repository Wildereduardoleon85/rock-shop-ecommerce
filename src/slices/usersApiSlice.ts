import { apiSlice } from '.'
import { USERS_URL } from '../constants'
import {
  LoginCredentials,
  UserInfo,
  RegisterCredentials,
  UpdateProfileCredentials,
} from '../types'

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
    updateProfile: builder.mutation<UserInfo, UpdateProfileCredentials>({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
} = usersApiSlice
