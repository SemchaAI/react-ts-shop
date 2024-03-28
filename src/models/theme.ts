export type Theme = 'light' | 'dark';

export type ThemeSlice = {
  theme: ThemeSliceState;
};
export type ThemeSliceState = {
  currentTheme: Theme;
};
