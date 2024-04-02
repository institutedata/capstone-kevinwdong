import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    mode: 'light',
};

const themeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        }
});

export const {setMode} = themeSlice.actions;

export default themeSlice.reducer;