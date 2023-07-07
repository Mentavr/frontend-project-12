import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';
import { userData } from './apiDataSlice';

const adapter = createEntityAdapter();
const initialState = adapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: adapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const idMessages = state.ids.filter((id) => state.entities[id].channelId === payload.id);
      adapter.removeMany(state, idMessages);
    });
    builder.addCase(userData.fulfilled, (state, { payload }) => {
      const { messages } = payload;
      adapter.setMany(state, messages);
    });
  },
});

export const { addMessage, addInitialMessages, removeMessages } = messagesSlice.actions;
export const selectorMessages = adapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
