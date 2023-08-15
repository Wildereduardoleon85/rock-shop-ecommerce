import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type QtyState = {
  qty: number
}

const initialState: QtyState = {
  qty: 1,
}

export const qtySlice = createSlice({
  name: 'qty',
  initialState,
  reducers: {
    setQty: (state, action: PayloadAction<number>) => {
      state.qty = action.payload
    },
  },
})

export const { setQty } = qtySlice.actions
