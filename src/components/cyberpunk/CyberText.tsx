import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { useCyberpunkTheme } from '../../theme/CyberpunkThemeProvider';
import { TypographyStyles } from '../../theme/cyberpunk-typography';

interface CyberTextProps {
  children: React.ReactNode;
  variant?: TypographyStyles;
  color?: 'primary' | 'secondary' | 'tertiary' | 'neon' | 'disabled' | 'inverse';
  neonColor?: 'cyan' | 'magenta' | 'purple' | 'lime' | 'pink' | 'red';
  glow?: boolean;
  glitch?: boolean;
  style?: TextStyle;
  numberOfLines?: number;
  onPress?: () => void;
}

export const CyberText: React.FC<CyberTextProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  neonColor = 'cyan',
  glow = false,
  glitch = false,
  style,
  numberOfLines,
  onPress,
}) => {
  let colors, typography;
  
  try {
    const theme = useCyberpunkTheme();
    colors = theme.colors;
    typography = theme.typography;
  } catch (error) {
    // Fallback values if theme context is not available
    colors = {
      neon: { cyan: '#00FFFF', magenta: '#FF00FF', purple: '#8B00FF', lime: '#00FF00', pink: '#FF1493', red: '#FF0040' },
      text: { primary: '#FFFFFF', secondary: '#E0E0E0', tertiary: '#B0B0B0', neon: '#00FFFF', disabled: '#666666', inverse: '#000000' },
      glow: { cyanGlow: 'rgba(0, 255, 255, 0.3)', magentaGlow: 'rgba(255, 0, 255, 0.3)' }
    };
    typography = {
      styles: {
        h1: { fontSize: 32, fontWeight: 'bold' },
        h3: { fontSize: 20, fontWeight: '600' },
        body: { fontSize: 16 },
        caption: { fontSize: 12 },
        terminalText: { fontSize: 14, fontFamily: 'monospace' }
      }
    };
  }

  const getTextColor = () => {
    if (color === 'neon') {
      return colors.neon[neonColor];
    }
    return colors.text[color];
  };

  const getTextStyle = () => {
    const baseStyle = {
      ...typography.styles[variant],
      color: getTextColor(),
    };

    // Add glow effect
    if (glow) {
      baseStyle.textShadowColor = colors.glow[`${neonColor}Glow`];
      baseStyle.textShadowOffset = { width: 0, height: 0 };
      baseStyle.textShadowRadius = 10;
    }

    // Add glitch effect styling
    if (glitch) {
      baseStyle.textShadowColor = colors.neon.magenta;
      baseStyle.textShadowOffset = { width: 2, height: 0 };
      baseStyle.textShadowRadius = 0;
    }

    return baseStyle;
  };

  return (
    <Text
      style={[getTextStyle(), style]}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

// Predefined text components for common use cases
export const CyberTitle: React.FC<Omit<CyberTextProps, 'variant'>> = (props) => (
  <CyberText variant="h1" glow {...props} />
);

export const CyberSubtitle: React.FC<Omit<CyberTextProps, 'variant'>> = (props) => (
  <CyberText variant="h3" color="secondary" {...props} />
);

export const CyberCaption: React.FC<Omit<CyberTextProps, 'variant'>> = (props) => (
  <CyberText variant="caption" color="tertiary" {...props} />
);

export const NeonText: React.FC<Omit<CyberTextProps, 'color' | 'glow'>> = (props) => (
  <CyberText color="neon" glow {...props} />
);

export const GlitchText: React.FC<Omit<CyberTextProps, 'glitch'>> = (props) => (
  <CyberText glitch {...props} />
);

export const TerminalText: React.FC<Omit<CyberTextProps, 'variant' | 'color' | 'neonColor'>> = (props) => (
  <CyberText variant="terminalText" color="neon" neonColor="lime" {...props} />
);