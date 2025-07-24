export const CyberpunkSpacing = {
  // Base spacing scale
  space: {
    0: 0,
    1: 4,    // 0.25rem
    2: 8,    // 0.5rem
    3: 12,   // 0.75rem
    4: 16,   // 1rem
    5: 20,   // 1.25rem
    6: 24,   // 1.5rem
    8: 32,   // 2rem
    10: 40,  // 2.5rem
    12: 48,  // 3rem
    16: 64,  // 4rem
    20: 80,  // 5rem
    24: 96,  // 6rem
    32: 128, // 8rem
    40: 160, // 10rem
    48: 192, // 12rem
    56: 224, // 14rem
    64: 256, // 16rem
  },

  // Semantic spacing
  sizes: {
    // Icons
    iconXs: 12,
    iconSm: 16,
    iconMd: 20,
    iconLg: 24,
    iconXl: 32,
    icon2xl: 40,

    // Buttons
    buttonHeight: 48,
    buttonHeightSm: 36,
    buttonHeightLg: 56,

    // Inputs
    inputHeight: 48,
    inputHeightSm: 36,
    inputHeightLg: 56,

    // Cards
    cardRadius: 12,
    cardRadiusLg: 16,
    cardRadiusXl: 20,

    // Borders
    borderWidth: 1,
    borderWidthThick: 2,
    borderWidthHeavy: 3,
    
    // Glows and Effects
    glowRadius: 20,
    glowRadiusLg: 40,
    glowRadiusXl: 60,
  },

  // Border Radius
  radius: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    '3xl': 24,
    full: 9999,
    cyber: 4, // Sharp cyberpunk edges
  },

  // Shadows and Glows
  shadows: {
    // Standard shadows
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',

    // Neon glows
    neonSm: '0 0 10px rgba(0, 255, 255, 0.5)',
    neonMd: '0 0 20px rgba(0, 255, 255, 0.6)',
    neonLg: '0 0 40px rgba(0, 255, 255, 0.7)',
    neonXl: '0 0 60px rgba(0, 255, 255, 0.8)',

    // Purple glows
    purpleSm: '0 0 10px rgba(139, 0, 255, 0.5)',
    purpleMd: '0 0 20px rgba(139, 0, 255, 0.6)',
    purpleLg: '0 0 40px rgba(139, 0, 255, 0.7)',

    // Magenta glows
    magentaSm: '0 0 10px rgba(255, 0, 255, 0.5)',
    magentaMd: '0 0 20px rgba(255, 0, 255, 0.6)',
    magentaLg: '0 0 40px rgba(255, 0, 255, 0.7)',

    // Multi-color glows
    cyberpunk: '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)',
    matrix: '0 0 15px rgba(0, 255, 0, 0.6), 0 0 30px rgba(0, 255, 0, 0.3)',
    
    // Inset glows
    insetNeon: 'inset 0 0 20px rgba(0, 255, 255, 0.3)',
    insetPurple: 'inset 0 0 20px rgba(139, 0, 255, 0.3)',
    insetMagenta: 'inset 0 0 20px rgba(255, 0, 255, 0.3)',
  },

  // Z-Index layers
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    tooltip: 1700,
    notification: 1800,
  },
} as const;

export type SpacingScale = keyof typeof CyberpunkSpacing.space;
export type SizeScale = keyof typeof CyberpunkSpacing.sizes;
export type RadiusScale = keyof typeof CyberpunkSpacing.radius;
export type ShadowTypes = keyof typeof CyberpunkSpacing.shadows;