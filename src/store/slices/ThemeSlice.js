// slices/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const ThemeSlice = createSlice({
 name: 'theme',
 initialState: {
    color: '#ffffff', 
 },
 reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    },
 },
});

export const { setColor } = ThemeSlice.actions;

export default ThemeSlice.reducer;
