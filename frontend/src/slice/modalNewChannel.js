import { createSlice } from '@reduxjs/toolkit'


const modalSlice = createSlice({
    name: 'modal',
    initialState:{modalNewChannel: false, modalRemoveChannel: false},
    reducers:{
        openNewChannel: (state) => {
            state.modalNewChannel = true;
        },
        openRemoveChannel: (state) => {
            state.modalRemoveChannel = true;
        },
        closeNewChannel: (state) => {
            state.modalNewChannel = false;
        },
        closeRemoveChannel: (state) => {
            state.modalRemoveChannel = false;
        },
    }
})

export const {openNewChannel, openRemoveChannel, closeNewChannel, closeRemoveChannel} = modalSlice.actions

export default modalSlice.reducer;