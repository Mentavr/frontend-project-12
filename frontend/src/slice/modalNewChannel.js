import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { openedModal: null, id: null },
  reducers: {
    openModal: (state, { payload }) => ({
      ...state,
      openedModal: payload.opened,
      id: payload.idChannel,
    }),
    closeModal: (state) => ({ ...state, openedModal: null, id: null }),
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
