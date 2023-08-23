import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AuthState, UserInfo } from '../types'

const initialSatate: AuthState = null

function getStateFromLocalStorage(): AuthState {
  if (localStorage.getItem('userInfo')) {
    return JSON.parse(localStorage.getItem('userInfo') as string)
  }
  return initialSatate
}

const initialState = {
  userInfo: getStateFromLocalStorage(),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    clearUserInfo: (state) => {
      state.userInfo = null
      localStorage.removeItem('userInfo')
    },
  },
})

export const { setCredentials, clearUserInfo } = authSlice.actions
