import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { userData } from './apiDataSlice';

const defaultCurrent = 1;

const adapter = createEntityAdapter();

const initialState = adapter.getInitialState({ currentChannelId: defaultCurrent });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: adapter.addOne,
    removeChannel: (state, { payload }) => {
      const newCurrent = payload.id === state.currentChannelId
        ? defaultCurrent : state.currentChannelId;
      state.currentChannelId = newCurrent;
      adapter.removeOne(state, payload.id);
    },
    renameChannel: adapter.setOne,
    setChannel: ((state, { payload }) => ({ ...state, currentChannelId: payload })),
  },
  extraReducers: (builder) => {
    builder.addCase(userData.fulfilled, (state, { payload }) => {
      const { channels } = payload;
      adapter.setMany(state, channels);
    });
  },
});

export const {
  addChannel, removeChannel, renameChannel, setChannel, addInitialChannels, redirectNewChannel,
} = channelsSlice.actions;
export const selectorChannels = adapter.getSelectors((state) => state.channels);
export const selectChannelNames = (state) => state.channels.ids
  .map((id) => {
    const channel = state.channels.entities[id];
    return channel.name;
  });
export default channelsSlice.reducer;
