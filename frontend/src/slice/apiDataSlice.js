import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routesApi from '../routesApi';

export const userData = createAsyncThunk('users/usersData', async () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const dataPath = routesApi.dataUser();
  const { data } = await axios.get(dataPath, {
    headers: {
      Authorization: `Bearer ${userId.token}`,
    },
  });
  return data;
});

const initialState = { loadingStatus: 'idle', error: null };
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => builder
    .addCase(userData.pending, (state) => ({
      ...state, loadingStatus: 'loading', error: null,
    }))
    .addCase(userData.fulfilled, (state) => ({ ...state, loadingStatus: 'idle', error: null }))
    .addCase(userData.rejected, (state, action) => ({ ...state, loadingStatus: 'failed', error: action.error })),
});

export default userSlice.reducer;
