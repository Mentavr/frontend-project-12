import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { openedModal: null, id: null },
  reducers: {
    openModal: (state, { payload }) => {
      return { ...state, openedModal: payload.opened, id: payload.idChannel };
    },

    closeModal: (state) => {
      return { ...state, openedModal: null, id: null };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
