import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: null,
  id: null,
  name: null,
  city: null,
  status: null,
  imageUrl: null,
  posts: [],
  friends: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.status = action.payload.status;
      state.city = action.payload.city;
      state.imageUrl = action.payload.imageUrl;
      state.friends = action.payload.friends;
    },
    removeUser(state) {
      state.id = null;
      state.email = null;
      state.token = null;
      state.name = null;
      state.status = null;
    },
    setPosts(state, action) {
      state.posts.push(action.payload);
    },
  },
});

export const { setUser, removeUser, setPosts } = userSlice.actions;
export default userSlice.reducer;
