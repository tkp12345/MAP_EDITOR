export const theme = {
  colors: {
    background: '#2d2d2d',
    primary: '#333',
    secondary: '#555',
    accent: '#ffffff',
    selectedBackground: '#000',
    selectedBorder: '#222',
  },
  spacing: (factor: number) => `${factor * 8}px`,
};

export type ThemeType = typeof theme;
