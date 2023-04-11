import { configureStore } from "@reduxjs/toolkit";
import loggerSlice from "./authLogger";
import userSlice from "./usersData";
import modalSlice from "./modalNewChannel";

export const store = configureStore({
  reducer: {
    logger: loggerSlice,
    users: userSlice,
    modal: modalSlice,
  },
});
