import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    mode: 'light',
    postOrGame: 'post'
};

const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setPostOrGame: (state) => {
            state.postOrGame = state.postOrGame === 'post' ? 'game' : 'post';
        },
        }
});

export const {setMode, setPostOrGame} = modeSlice.actions;

export default modeSlice.reducer;