import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type ModalState = {
  isModalOpen: boolean
  isConfirmed: boolean
  message: string
}

const initialState: ModalState = {
  isModalOpen: false,
  isConfirmed: false,
  message: '',
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.isModalOpen = true
      state.message = action.payload
    },
    setModalConfirm: (state, action: PayloadAction<boolean>) => {
      state.isConfirmed = action.payload
    },
    closeModal: (state) => {
      state.isModalOpen = false
    },
  },
})

export const { openModal, setModalConfirm, closeModal } = modalSlice.actions
