import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const CyberpunkColors = {
  neonBlue: '#00FFFF',
  electricPurple: '#8A2BE2',
  matrixGreen: '#00FF41',
  neonPink: '#FF1493',
  darkBackground: '#0A0A0A',
  darkSurface: '#1A1A2E',
  darkCard: '#16213E',
  glowBlue: '#4FC3F7',
  glowPurple: '#BA68C8',
  textGlow: '#E0E0E0',
};

export const CyberpunkDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: CyberpunkColors.neonBlue,
    primaryContainer: CyberpunkColors.darkCard,
    secondary: CyberpunkColors.electricPurple,
    secondaryContainer: CyberpunkColors.darkSurface,
    surface: CyberpunkColors.darkSurface,
    surfaceVariant: CyberpunkColors.darkCard,
    background: CyberpunkColors.darkBackground,
    onPrimary: CyberpunkColors.darkBackground,
    onSecondary: CyberpunkColors.textGlow,
    onSurface: CyberpunkColors.textGlow,
    onSurfaceVariant: CyberpunkColors.glowBlue,
    accent: CyberpunkColors.matrixGreen,
  },
};

export const CyberpunkLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: CyberpunkColors.electricPurple,
    primaryContainer: '#E1BEE7',
    secondary: CyberpunkColors.neonBlue,
    secondaryContainer: '#B3E5FC',
    surface: '#F5F5F5',
    background: '#FAFAFA',
  },
};
