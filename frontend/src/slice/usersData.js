import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import routes from '../routes.js';
import axios from '../axiosClient.js';


export const userData = createAsyncThunk(
    'users/usersData',
    async () => {
        const response = await axios.get(routes.dataUser());
        return response.data;
      }
)

const initialState = { loadingStatus: 'idle', error: null, data: { channels: [], messages: [], currentChannelId: '' } }
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
  extraReducers: (builder) => {
    builder
      .addCase(userData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(userData.fulfilled, (state, action) => {
        state.data = action.payload
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(userData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
})



export default userSlice.reducer;