import { createSlice } from '@reduxjs/toolkit';

const defaultCurrent = 1;

const initialState = {
  data: { channels: [], currentChannelId: defaultCurrent, shouldRedirectToNewChannel: false },
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    redirectNewChannel: (state, { payload }) => ({
      ...state, data: { ...state.data, shouldRedirectToNewChannel: payload },
    }),
    addInitialChannels: (state, { payload }) => ({
      ...state,
      data: { ...state.data, channels: [...payload] },
    }),
    addChannel: (state, { payload }) => {
      if (state.data.shouldRedirectToNewChannel) {
        return {
          ...state,
          data: {
            ...state.data,
            channels: [...state.data.channels, payload],
            currentChannelId: payload.id,
            shouldRedirectToNewChannel: false,
          },
        };
      }
      return {
        ...state,
        data: {
          ...state.data,
          channels: [...state.data.channels, payload],
        },
      };
    },

    removeChannel: (state, { payload }) => {
      const filterChannels = state.data.channels.filter(
        (channel) => channel.id !== payload.id,
      );
      if (state.data.currentChannelId === payload.id) {
        // eslint-disable-next-line no-param-reassign
        state.currentChannelId = defaultCurrent;
      }
      return {
        ...state,
        data: {
          ...state.data,
          channels: filterChannels,
        },
      };
    },
    renameChannel: (state, { payload }) => {
      const removeChannels = state.data.channels
        .map((channel) => (channel.id !== payload.id ? channel : payload));
      return { ...state, data: { ...state.data, channels: removeChannels } };
    },
    setChannel: (state, { payload }) => {
      if (state.shouldRedirectToNewChannel !== payload.shouldRedirectToNewChannel) {
        return {
          ...state,
          data: { ...state.data, currentChannelId: payload.id },
        };
      }
      return {
        ...state,
        data: { ...state.data, currentChannelId: payload },
      };
    },
  },
});

export const {
  addChannel, removeChannel, renameChannel, setChannel, addInitialChannels, redirectNewChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
