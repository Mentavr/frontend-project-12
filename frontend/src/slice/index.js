import { configureStore } from '@reduxjs/toolkit';
import loggerSlice from './authLogger';
import userSlice from './usersData';

export const store = configureStore({
  reducer: {
    logger: loggerSlice,
    users: userSlice,
  },
})