import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './modalSwitch';
import messagesSlice from './messagesSlice';
import channelsSlice from './channelsSlice';

const store = configureStore({
  reducer: {
    modal: modalSlice,
    channels: channelsSlice,
    messages: messagesSlice,
  },
});

export default store;
