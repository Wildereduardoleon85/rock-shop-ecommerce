import { createSlice } from '@reduxjs/toolkit'

type RibbonState = {
  isRibbonOpen: boolean
}

const initialState: RibbonState = {
  isRibbonOpen: false,
}

export const ribbonSlice = createSlice({
  name: 'ribbon',
  initialState,
  reducers: {
    toggleRibbon: (state) => {
      state.isRibbonOpen = !state.isRibbonOpen
    },
  },
})

export const { toggleRibbon } = ribbonSlice.actions
