import { PayloadAction, createSlice } from '@reduxjs/toolkit'

function getStateFromLocalStorage() {
  if (localStorage.getItem('user')) {
    return JSON.parse(localStorage.getItem('user') as string)
  }
  return null
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
