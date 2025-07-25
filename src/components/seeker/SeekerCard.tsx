import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SeekerTheme } from './theme';

export interface SeekerCardProps {
  children: React.ReactNode;
  variant?: 'solid' | 'gradient' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  elevated?: boolean;
  glowEffect?: boolean;
}

export const SeekerCard: React.FC<SeekerCardProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  style,
  elevated = false,
  glowEffect = false,
}) => {
  const { colors, borderRadius, spacing, elevation } = SeekerTheme;

  const getCardStyle = () => {
    const baseStyle = {
      borderRadius: borderRadius[size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'],
      padding: spacing[size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'],
      ...(elevated && elevation.md),
    };

    switch (variant) {
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border.primary,
        };
      case 'glass':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderWidth: 1,
          borderColor: colors.border.subtle,
          backdropFilter: 'blur(10px)',
        };
      case 'gradient':
        return baseStyle;
      default: // solid
        return {
          ...baseStyle,
          backgroundColor: colors.background.surface,
        };
    }
  };

  const cardStyle = getCardStyle();

  if (variant === 'gradient') {
    return (
      <LinearGradient
        colors={colors.gradients.card}
        style={[cardStyle, style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {glowEffect && (
          <View style={[StyleSheet.absoluteFill, styles.glowOverlay]} />
        )}
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={[cardStyle, style]}>
      {glowEffect && (
        <View style={[StyleSheet.absoluteFill, styles.glowOverlay]} />
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  glowOverlay: {
    borderRadius: SeekerTheme.borderRadius.md,
    shadowColor: SeekerTheme.colors.primary.teal,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 0,
  },
});