import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    mode: 'light',
};

const themeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        toggleMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        }
});

export const {toggleMode} = themeSlice.actions;

export default themeSlice.reducer;