import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const userData = createAsyncThunk('users/usersData', async () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const dataPath = routes.dataUser();
  const { data } = await axios.get(dataPath, {
    headers: {
      Authorization: `Bearer ${userId.token}`,
    },
  });
  return data;
});

const initialState = {
  loadingStatus: 'idle',
  error: null,
  data: { channels: [], messages: [], currentChannelId: 1 },
};
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => ({
      ...state, data: { ...state.data, channels: [...state.data.channels, payload] },
    }),
    removeChannel: (state, { payload }) => {
      const filterChannels = state.data.channels.filter(
        (channel) => channel.id !== payload.id,
      );
      const filterMessage = state.data.messages.filter(
        (messeg) => messeg.channelId !== payload.id,
      );
      return {
        ...state,
        data: {
          ...state.data,
          channels: filterChannels,
          messages: filterMessage,
        },
      };
    },
    addMessage: (state, { payload }) => ({
      ...state, data: { ...state.data, messages: [...state.data.messages, payload] },
    }),
    renameChannel: (state, { payload }) => {
      const removeChannels = state.data.channels.map(
        (channel) => (channel.id !== payload.id ? channel : payload),
      );
      return { ...state, data: { ...state.data, channels: removeChannels } };
    },
    setChannel: (state, { payload }) => ({
      ...state,
      data: { ...state.data, currentChannelId: payload },
    }),
  },
  extraReducers: (builder) => builder
    .addCase(userData.pending, (state) => ({ ...state, loadingStatus: 'loading', error: null }))
    .addCase(userData.fulfilled, (state, action) => ({
      ...state, data: action.payload, localStorage: 'idle', error: null,
    }))
    .addCase(userData.rejected, (state, action) => ({ ...state, loadingStatus: 'failed', error: action.error })),
});

export const {
  addChannel,
  removeChannel,
  addMessage,
  renameChannel,
  setChannel,
} = userSlice.actions;

export default userSlice.reducer;
