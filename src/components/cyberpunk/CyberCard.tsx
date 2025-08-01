import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCyberpunkTheme } from '../../theme/CyberpunkThemeProvider';

interface CyberCardProps {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'neon' | 'hologram';
  glowColor?: 'cyan' | 'magenta' | 'purple' | 'lime';
  style?: ViewStyle;
  onPress?: () => void;
}

export const CyberCard: React.FC<CyberCardProps> = ({
  children,
  variant = 'default',
  glowColor = 'cyan',
  style,
  onPress,
}) => {
  let colors, spacing;
  
  try {
    const theme = useCyberpunkTheme();
    colors = theme.colors;
    spacing = theme.spacing;
  } catch (error) {
    // Fallback values if theme context is not available
    colors = {
      neon: { cyan: '#00FFFF', magenta: '#FF00FF', purple: '#8B00FF', lime: '#00FF00' },
      dark: { deep: '#0F0F1F', void: '#0A0A0A' },
      glass: { medium: 'rgba(255, 255, 255, 0.1)', light: 'rgba(255, 255, 255, 0.05)' },
      border: { primary: 'rgba(0, 255, 255, 0.3)', subtle: 'rgba(255, 255, 255, 0.1)' }
    };
    spacing = {
      radius: { xl: 12 },
      space: { 4: 16 }
    };
  }

  const getCardStyle = () => {
    const baseStyle = {
      borderRadius: spacing.radius.xl,
      padding: spacing.space[4],
      overflow: 'hidden' as const,
    };

    switch (variant) {
      case 'glass':
        return {
          ...baseStyle,
          backgroundColor: colors.glass.medium,
          borderWidth: 1,
          borderColor: colors.border.subtle,
        };
      
      case 'neon':
        return {
          ...baseStyle,
          backgroundColor: colors.dark.deep,
          borderWidth: 2,
          borderColor: colors.neon[glowColor],
          shadowColor: colors.neon[glowColor],
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 10,
          elevation: 10,
        };
      
      case 'hologram':
        return {
          ...baseStyle,
          backgroundColor: colors.glass.light,
          borderWidth: 1,
          borderColor: colors.neon[glowColor],
        };
      
      default:
        return {
          ...baseStyle,
          backgroundColor: colors.dark.deep,
          borderWidth: 1,
          borderColor: colors.border.primary,
        };
    }
  };

  const cardStyle = getCardStyle();

  if (variant === 'hologram') {
    const gradientColors = [
      `${colors.neon[glowColor] || '#00FFFF'}20`,
      `${colors.dark.deep || '#0F0F1F'}90`,
      `${colors.neon[glowColor] || '#00FFFF'}20`
    ].filter(color => color && color !== 'undefined20' && color !== 'undefined90');

    // Fallback to safe colors if the array is empty
    const safeColors = gradientColors.length > 0 ? gradientColors : ['#00FFFF20', '#0F0F1F90', '#00FFFF20'];

    return (
      <LinearGradient
        colors={safeColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[cardStyle, style]}
      >
        <View style={styles.hologramOverlay}>
          {children}
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={[cardStyle, style]}>
      {variant === 'neon' && (
        <View style={[styles.neonOverlay, { backgroundColor: `${colors.neon[glowColor]}10` }]} />
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  neonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  hologramOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 4,
  },
});