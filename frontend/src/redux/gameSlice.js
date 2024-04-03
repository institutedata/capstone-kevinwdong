import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload.games;
    },
    setGame: (state, action) => {
      const updatedGames = state.games.map((game) => {
        if (game._id === action.payload.game._id) return action.payload.game;
        return game;
      });
      state.posts = updatedGames;
    },
    clearGame: (state) => {
      state.games = [];
    },
  },
});

export const {setGames, setGame, clearGame} = gameSlice.actions;

export default gameSlice.reducer;
