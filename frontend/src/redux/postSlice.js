import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  postsOrGames: true,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setPostsOrGames: (state) => {
      state.postsOrGames = !state.postsOrGames;
    },
    clearPost: (state) => {
      state.posts = [];
    },
  },
});

export const {setPosts, setPost, clearPost, setPostsOrGames} = postSlice.actions;

export default postSlice.reducer;
