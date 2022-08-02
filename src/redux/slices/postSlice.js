import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postKey: [],
  users: [],
};

const postSlice = createSlice({
  name: "postKey",
  initialState,
  reducers: {
    setPostKey(state, action) {
      state.postKey.push(action.payload);
    },
    setUsers(state, action) {
      state.users.push(action.payload);
    },
  },
});

export const { setPostKey, setUsers } = postSlice.actions;
export default postSlice.reducer;
