// Seeker Design System - Web3 Modern Theme
// Based on clean, professional Web3 aesthetic

export const SeekerColors = {
  // Primary brand colors
  primary: {
    teal: '#40E0D0',
    darkTeal: '#2FB8B0',
    lightTeal: '#7FFFD4',
    accent: '#00CED1',
  },
  
  // Background colors
  background: {
    primary: '#0F0F0F',
    secondary: '#1A1A1A',
    tertiary: '#2A2A2A',
    surface: '#1E1E1E',
    elevated: '#2E2E2E',
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#E0E0E0',
    tertiary: '#B0B0B0',
    disabled: '#808080',
    accent: '#40E0D0',
  },
  
  // Border and outline colors
  border: {
    primary: '#40E0D0',
    secondary: '#2FB8B0',
    subtle: '#333333',
    disabled: '#555555',
  },
  
  // Status colors
  status: {
    success: '#00FF7F',
    warning: '#FFD700',
    error: '#FF6B6B',
    info: '#40E0D0',
  },
  
  // Gradients
  gradients: {
    primary: ['#40E0D0', '#2FB8B0'],
    secondary: ['#0F0F0F', '#1A1A1A'],
    surface: ['#1A1A1A', '#2A2A2A'],
    card: ['#1E1E1E', '#2E2E2E'],
    hero: ['#0F0F0F', '#2A2A2A', '#0F0F0F'],
  },
  
  // Shadow colors
  shadow: {
    primary: 'rgba(64, 224, 208, 0.3)',
    secondary: 'rgba(0, 0, 0, 0.5)',
    elevated: 'rgba(64, 224, 208, 0.1)',
  },
};

export const SeekerSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const SeekerTypography = {
  // Font families
  fonts: {
    primary: 'System', // Clean system font
    secondary: 'Inter', // Modern sans-serif
    mono: 'Menlo', // For code/addresses
  },
  
  // Font sizes
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    hero: 48,
  },
  
  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
  
  // Font weights
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const SeekerBorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const SeekerElevation = {
  none: {
    shadowOpacity: 0,
  },
  sm: {
    shadowColor: SeekerColors.shadow.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: SeekerColors.shadow.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: SeekerColors.shadow.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const SeekerTheme = {
  colors: SeekerColors,
  spacing: SeekerSpacing,
  typography: SeekerTypography,
  borderRadius: SeekerBorderRadius,
  elevation: SeekerElevation,
};

export type SeekerThemeType = typeof SeekerTheme;