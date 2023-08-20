import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AuthState } from '../types'

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
    setCredentials: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
  },
})

export const { setCredentials } = authSlice.actions
