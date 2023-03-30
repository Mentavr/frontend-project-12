import { createSlice } from '@reduxjs/toolkit'


const modalSlice = createSlice({
    name: 'modal',
    initialState:{modalNewChannel: false, modalRemoveChannel: false, modalRenameChannel: false},
    reducers:{
        openNewChannel: (state) => {
            state.modalNewChannel = true;
        },
        closeNewChannel: (state) => {
            state.modalNewChannel = false;
        },
        openRemoveChannel: (state) => {
            state.modalRemoveChannel = true;
        },
        closeRemoveChannel: (state) => {
            state.modalRemoveChannel = false;
        },
        openRenameChannel: (state) => {
            state.modalRemoveChannel = true;
        },
        closeRenameChannel: (state) => {
            state.modalRemoveChannel = false;
        },
    }
})

export const {openNewChannel, openRemoveChannel, closeNewChannel, closeRemoveChannel, openRenameChannel, closeRenameChannel} = modalSlice.actions

export default modalSlice.reducer;