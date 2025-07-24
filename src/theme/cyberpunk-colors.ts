export const CyberpunkColors = {
  // Primary Neon Colors
  neon: {
    cyan: '#00FFFF',
    magenta: '#FF00FF', 
    purple: '#8B00FF',
    lime: '#00FF00',
    pink: '#FF1493',
    red: '#FF0040',
    blue: '#0066FF',
    orange: '#FF6600',
    yellow: '#FFFF00',
  },

  // Dark Backgrounds
  dark: {
    void: '#0A0A0A',        // Main background
    deep: '#0F0F1F',        // Card background  
    midnight: '#1A1A2E',    // Elevated surfaces
    shadow: '#16213E',      // Borders
    abyss: '#050505',       // Deepest black
    slate: '#0E1419',       // Alternative dark
  },

  // Glows & Effects
  glow: {
    cyanGlow: 'rgba(0, 255, 255, 0.3)',
    magentaGlow: 'rgba(255, 0, 255, 0.3)',
    purpleGlow: 'rgba(139, 0, 255, 0.3)',
    limeGlow: 'rgba(0, 255, 0, 0.3)',
    pinkGlow: 'rgba(255, 20, 147, 0.3)',
    redGlow: 'rgba(255, 0, 64, 0.3)',
  },

  // Glassmorphism
  glass: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)', 
    heavy: 'rgba(255, 255, 255, 0.15)',
    neon: 'rgba(0, 255, 255, 0.1)',
    purple: 'rgba(139, 0, 255, 0.1)',
    magenta: 'rgba(255, 0, 255, 0.1)',
  },

  // Gradients
  gradients: {
    neonPrimary: ['#00FFFF', '#8B00FF'],
    neonSecondary: ['#FF00FF', '#0066FF'],
    cyberpunk: ['#FF0040', '#00FFFF', '#FF00FF'],
    matrix: ['#00FF00', '#008F11', '#004400'],
    electric: ['#00FFFF', '#0066FF', '#8B00FF'],
    sunset: ['#FF6600', '#FF1493', '#8B00FF'],
    hologram: ['rgba(0,255,255,0.8)', 'rgba(255,0,255,0.8)', 'rgba(139,0,255,0.8)'],
  },

  // UI States
  success: '#00FF00',
  warning: '#FFFF00', 
  error: '#FF0040',
  info: '#00FFFF',

  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#E0E0E0',
    tertiary: '#B0B0B0',
    neon: '#00FFFF',
    disabled: '#666666',
    inverse: '#000000',
  },

  // Border Colors
  border: {
    primary: 'rgba(0, 255, 255, 0.3)',
    secondary: 'rgba(255, 0, 255, 0.3)',
    subtle: 'rgba(255, 255, 255, 0.1)',
    glow: 'rgba(0, 255, 255, 0.6)',
  }
} as const;

export type CyberpunkColorKeys = keyof typeof CyberpunkColors;
export type NeonColors = keyof typeof CyberpunkColors.neon;
export type DarkColors = keyof typeof CyberpunkColors.dark;
export type GlowColors = keyof typeof CyberpunkColors.glow;