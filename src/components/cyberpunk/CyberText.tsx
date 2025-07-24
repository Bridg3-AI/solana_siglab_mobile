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
  const { colors, typography } = useCyberpunkTheme();

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