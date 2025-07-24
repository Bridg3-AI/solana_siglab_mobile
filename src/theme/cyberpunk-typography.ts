export const CyberpunkTypography = {
  // Font Families - Using system fonts with fallbacks for better compatibility
  fonts: {
    display: 'System',     // Will be replaced with custom fonts later
    body: 'System',        // Body text
    mono: 'Courier New',   // Monospace for code/data
    cyber: 'System',       // Accent text
  },

  // Font Sizes
  sizes: {
    micro: 10,
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
  },

  // Font Weights
  weights: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Line Heights
  lineHeights: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
    widest: 1,
    cyber: 2, // Extra wide for cyberpunk effect
  },

  // Predefined Text Styles
  styles: {
    // Headers
    h1: {
      fontSize: 48,
      fontWeight: '900',
      letterSpacing: 2,
      lineHeight: 1.2,
      textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
    },
    h2: {
      fontSize: 36,
      fontWeight: '800',
      letterSpacing: 1.5,
      lineHeight: 1.25,
      textShadow: '0 0 8px rgba(255, 0, 255, 0.6)',
    },
    h3: {
      fontSize: 30,
      fontWeight: '700',
      letterSpacing: 1,
      lineHeight: 1.3,
      textShadow: '0 0 6px rgba(139, 0, 255, 0.5)',
    },
    h4: {
      fontSize: 24,
      fontWeight: '600',
      letterSpacing: 0.5,
      lineHeight: 1.35,
    },
    h5: {
      fontSize: 20,
      fontWeight: '600',
      letterSpacing: 0.25,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: 18,
      fontWeight: '500',
      letterSpacing: 0,
      lineHeight: 1.45,
    },

    // Body Text
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400',
      letterSpacing: 0.5,
      lineHeight: 1.5,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      letterSpacing: 0.25,
      lineHeight: 1.5,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 1.45,
    },

    // Special Cyberpunk Styles
    neonTitle: {
      fontSize: 60,
      fontWeight: '900',
      letterSpacing: 3,
      lineHeight: 1.1,
      textShadow: '0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(0, 255, 255, 0.5)',
    },
    glitchText: {
      fontSize: 24,
      fontWeight: '700',
      letterSpacing: 1.5,
      lineHeight: 1.3,
      textShadow: '2px 2px 0px rgba(255, 0, 255, 0.8), -2px -2px 0px rgba(0, 255, 255, 0.8)',
    },
    terminalText: {
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 1,
      lineHeight: 1.4,
      fontFamily: 'Courier New',
    },
    
    // UI Elements
    button: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: 1,
      lineHeight: 1.2,
      textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
    },
    caption: {
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: 0.8,
      lineHeight: 1.3,
    },
    overline: {
      fontSize: 10,
      fontWeight: '600',
      letterSpacing: 1.5,
      lineHeight: 1.6,
      textTransform: 'uppercase',
    },

    // Special Effects
    label: {
      fontSize: 14,
      fontWeight: '600',
      letterSpacing: 0.5,
      lineHeight: 1.2,
    },
  },
} as const;

export type TypographyStyles = keyof typeof CyberpunkTypography.styles;
export type FontSizes = keyof typeof CyberpunkTypography.sizes;
export type FontWeights = keyof typeof CyberpunkTypography.weights;