import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './modalSwitch';
import messagesSlice from './messagesSlice';
import channelsSlice from './channelsSlice';
import apiDataSlice from './apiDataSlice';

const store = configureStore({
  reducer: {
    modal: modalSlice,
    channels: channelsSlice,
    messages: messagesSlice,
    apiData: apiDataSlice,
  },
});

export default store;
