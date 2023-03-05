import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import routes from "../routes.js";
import axios from "../axiosClient.js";
import _ from "lodash";

export const userData = createAsyncThunk("users/usersData", async () => {
  const response = await axios.get(routes.dataUser());
  return response.data;
});

const initialState = {
  loadingStatus: "idle",
  error: null,
  data: { channels: [], messages: [], currentChannelId: 1 },
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addChannel: (state, action) => {
      state.data.channels.push(action.payload);
    },
    removeChannel: (state, { payload }) => {
      const filterChannels = state.data.channels.filter(
        (channel) => channel.id !== payload.id
      );

      return { ...state, data: { ...state.data, channels: filterChannels } };
    },
    addMessage: (state, { payload }) => {
      state.data.messages.push(payload);
    },
    renameChannel: (state, { payload }) => {
      const removeChannels = state.data.channels.map((channel) =>
        channel.id !== payload.id ? channel : payload
      );
      console.log(removeChannels);
      return { ...state, data: { ...state.data, channels: removeChannels } };
    },
    setChannel: (state, { payload }) => {
      return { ...state, data: { ...state.data, currentChannelId: payload } };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userData.pending, (state) => {
        state.loadingStatus = "loading";
        state.error = null;
      })
      .addCase(userData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingStatus = "idle";
        state.error = null;
      })
      .addCase(userData.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.error = action.error;
      });
  },
});

export const { addChannel, removeChannel, addMessage, renameChannel, setChannel } =
  userSlice.actions;

export default userSlice.reducer;
