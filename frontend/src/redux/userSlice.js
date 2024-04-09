import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setRegister: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setUpdate: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setDelete: (state) => {
      state.game = null;
      state.past = null;
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
  }
});

export const {
  setUser,
  setLogin,
  setLogout,
  setRegister,
  setUpdate,
  setDelete,
  setFriends,
} = userSlice.actions;

export default userSlice.reducer;