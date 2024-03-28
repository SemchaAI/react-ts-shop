import type { Theme, ThemeSliceState, ThemeSlice } from '@/models/theme';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: ThemeSliceState = {
  currentTheme: window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state: ThemeSliceState, action: PayloadAction<Theme>) => {
      state.currentTheme = action.payload;
    },
  },
});

export const selectCurrentTheme = (state: ThemeSlice) =>
  state.theme.currentTheme;

// actions
export const { setTheme } = themeSlice.actions;
