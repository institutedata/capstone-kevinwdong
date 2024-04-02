import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    logInStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      logInSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
      },
      logInFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
