import { createSlice } from '@reduxjs/toolkit';

const initialState = { authLogger: false };

const loggerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state) => ({ ...state, authLogger: true }),
    logOut: (state) => {
      localStorage.removeItem('userId');
      return { ...state, authLogger: false };
    },
  },
});

export const { logIn, logOut } = loggerSlice.actions;

export default loggerSlice.reducer;
