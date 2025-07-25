import { MD3DarkTheme, MD3Theme } from 'react-native-paper';
import { CyberpunkColors } from './cyberpunk-colors';
import { CyberpunkTypography } from './cyberpunk-typography';
import { CyberpunkSpacing } from './cyberpunk-spacing';

// Extend the MD3Theme type to include our custom properties
export interface CyberpunkTheme extends MD3Theme {
  cyberpunk: {
    colors: typeof CyberpunkColors;
    typography: typeof CyberpunkTypography;
    spacing: typeof CyberpunkSpacing;
  };
}

// Create the cyberpunk theme by extending Material Design 3 Dark Theme
export const CyberpunkTheme: CyberpunkTheme = {
  ...MD3DarkTheme,
  
  // Override Material Design colors with cyberpunk palette
  colors: {
    ...MD3DarkTheme.colors,
    
    // Primary colors - using neon cyan
    primary: CyberpunkColors.neon.cyan,
    onPrimary: CyberpunkColors.dark.void,
    primaryContainer: CyberpunkColors.dark.deep,
    onPrimaryContainer: CyberpunkColors.neon.cyan,
    
    // Secondary colors - using neon magenta
    secondary: CyberpunkColors.neon.magenta,
    onSecondary: CyberpunkColors.dark.void,
    secondaryContainer: CyberpunkColors.dark.midnight,
    onSecondaryContainer: CyberpunkColors.neon.magenta,
    
    // Tertiary colors - using neon purple
    tertiary: CyberpunkColors.neon.purple,
    onTertiary: CyberpunkColors.dark.void,
    tertiaryContainer: CyberpunkColors.dark.shadow,
    onTertiaryContainer: CyberpunkColors.neon.purple,
    
    // Error colors
    error: CyberpunkColors.neon.red,
    onError: CyberpunkColors.dark.void,
    errorContainer: CyberpunkColors.dark.deep,
    onErrorContainer: CyberpunkColors.neon.red,
    
    // Background colors
    background: CyberpunkColors.dark.void,
    onBackground: CyberpunkColors.text.primary,
    
    // Surface colors
    surface: CyberpunkColors.dark.deep,
    onSurface: CyberpunkColors.text.primary,
    surfaceVariant: CyberpunkColors.dark.midnight,
    onSurfaceVariant: CyberpunkColors.text.secondary,
    
    // Elevated surfaces
    elevation: {
      level0: CyberpunkColors.dark.void,
      level1: CyberpunkColors.dark.deep,
      level2: CyberpunkColors.dark.midnight,
      level3: CyberpunkColors.dark.shadow,
      level4: CyberpunkColors.dark.slate,
      level5: CyberpunkColors.dark.abyss,
    },
    
    // Outline colors
    outline: CyberpunkColors.border.primary,
    outlineVariant: CyberpunkColors.border.subtle,
    
    // Inverse colors
    inverseSurface: CyberpunkColors.text.primary,
    onInverseSurface: CyberpunkColors.dark.void,
    inversePrimary: CyberpunkColors.dark.deep,
    
    // Scrim
    scrim: CyberpunkColors.dark.abyss,
    
    // Shadow
    shadow: CyberpunkColors.dark.abyss,
  },

  // Add our custom cyberpunk design system
  cyberpunk: {
    colors: CyberpunkColors,
    typography: CyberpunkTypography,
    spacing: CyberpunkSpacing,
  },
};

// Theme utilities
export const createCyberpunkGradient = (colors: string[]) => {
  return colors;
};

export const createNeonShadow = (color: string, intensity: number = 1) => {
  const rgba = color.replace('#', '').match(/.{2}/g);
  if (!rgba) return '0 0 10px rgba(0, 255, 255, 0.5)';
  
  const r = parseInt(rgba[0], 16);
  const g = parseInt(rgba[1], 16);
  const b = parseInt(rgba[2], 16);
  
  return `0 0 ${10 * intensity}px rgba(${r}, ${g}, ${b}, ${0.5 * intensity})`;
};

export const createGlassmorphism = (opacity: number = 0.1) => ({
  backgroundColor: `rgba(255, 255, 255, ${opacity})`,
  backdropFilter: 'blur(10px)',
  borderColor: `rgba(255, 255, 255, ${opacity * 2})`,
  borderWidth: 1,
});

// Animation presets
export const CyberpunkAnimations = {
  glitch: {
    duration: 200,
    iterations: 3,
  },
  neonPulse: {
    duration: 2000,
    iterations: Infinity,
  },
  hologram: {
    duration: 1500,
    iterations: Infinity,
  },
  typewriter: {
    duration: 100,
  },
};

// Export default theme
export default CyberpunkTheme;