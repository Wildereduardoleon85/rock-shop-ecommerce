import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AlertVariant } from '../types'

type AlertState = {
  message: string
  variant: AlertVariant
}

const initialState: AlertState = {
  message: '',
  variant: 'success',
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (
      state,
      action: PayloadAction<{ message: string; variant?: AlertVariant }>
    ) => {
      const { message, variant } = action.payload
      state.message = message
      if (variant) {
        state.variant = variant
      }
    },
  },
})

export const { setAlert } = alertSlice.actions
