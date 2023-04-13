import { configureStore } from '@reduxjs/toolkit';
import loggerSlice from './authLogger';
import userSlice from './usersData';
import modalSlice from './modalNewChannel';

const store = configureStore({
  reducer: {
    logger: loggerSlice,
    users: userSlice,
    modal: modalSlice,
  },
});

export default store;
