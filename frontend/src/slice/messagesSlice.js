import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: { messages: []},
  };

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addInitialMessages: (state, { payload }) => {
            return {...state, data: {messages:[...payload]} }
        },
        addMessage: (state, { payload }) => {
          console.log('asd', addMessage)
            return {...state, data: { messages: [...state.data.messages, payload] }}
        },
        removeMessages: (state, { payload }) => {
          const filterMessage = state.data.messages.filter(
            (messeg) => messeg.channelId !== payload.id
          );
          return {
            ...state,
            data: {
              ...state.data,
              messages: filterMessage,
            },
          };
        },
    } 
})

export const { addMessage, addInitialMessages, removeMessages } = messagesSlice.actions;

export default messagesSlice.reducer;