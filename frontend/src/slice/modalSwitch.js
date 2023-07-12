import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { openedModal: null, idChannel: null },
  reducers: {
    openModal: (state, { payload }) => ({
      ...state,
      openedModal: payload.opened,
      idChannel: payload.id,
    }),
    closeModal: (state) => ({ ...state, openedModal: null, idChannel: null }),
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const openedModalSlice = (state) => state.modal.openedModal;
export default modalSlice.reducer;
