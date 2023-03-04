import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import routes from '../routes.js';
import axios from '../axiosClient.js';
import _ from 'lodash'


export const userData = createAsyncThunk(
    'users/usersData',
    async () => {
        const response = await axios.get(routes.dataUser());
        return response.data;
      }
)

const initialState = { loadingStatus: 'idle', error: null, data: { channels: [], messages: [], currentChannelId: 1 } }
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addChannel: (state, action) => {
          state.data.channels.push(action.payload)
          console.log(state)
        },
        removeChannel: (state, action) => {
          debugger
          const newChannel = state.data.channels.filter((channel) => channel.id !== action.payload.id)
          const newData = {...state['data'], channels: newChannel}
          state = {...state, data: newData}
        },
        addMessage:(state, action) => {

        }
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

export const {addChannel, removeChannel} = userSlice.actions;

export default userSlice.reducer;