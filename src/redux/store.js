import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice";
import post from "./slices/postSlice";
import users from "./slices/usersSlice";
export const store = configureStore({
  reducer: {
    user,
    post,
    users,
  },
});
