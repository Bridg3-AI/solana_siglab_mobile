import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useCyberpunkTheme } from '../../theme/CyberpunkThemeProvider';

interface NeonButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'terminal';
  size?: 'small' | 'medium' | 'large';
  glowColor?: 'cyan' | 'magenta' | 'purple' | 'lime';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  glowColor = 'cyan',
  disabled = false,
  style,
  textStyle,
}) => {
  const { colors, typography, spacing } = useCyberpunkTheme();

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: spacing.space[4],
          paddingVertical: spacing.space[2],
          minHeight: spacing.sizes.buttonHeightSm,
        };
      case 'large':
        return {
          paddingHorizontal: spacing.space[8],
          paddingVertical: spacing.space[4],
          minHeight: spacing.sizes.buttonHeightLg,
        };
      default:
        return {
          paddingHorizontal: spacing.space[6],
          paddingVertical: spacing.space[3],
          minHeight: spacing.sizes.buttonHeight,
        };
    }
  };

  const getTextStyles = () => {
    const baseText = {
      ...typography.styles.button,
      textAlign: 'center' as const,
      fontWeight: '600' as const,
    };

    switch (size) {
      case 'small':
        return { ...baseText, fontSize: 14 };
      case 'large':
        return { ...baseText, fontSize: 18 };
      default:
        return baseText;
    }
  };

  const baseButtonStyle = {
    ...getSizeStyles(),
    borderRadius: spacing.radius.lg,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    overflow: 'hidden' as const,
    opacity: disabled ? 0.5 : 1,
  };

  const baseTextStyle = {
    ...getTextStyles(),
    color: disabled ? colors.text.disabled : colors.text.primary,
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[baseButtonStyle, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={colors.gradients.neonPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, { borderRadius: spacing.radius.lg }]}
        />
        <Text style={[baseTextStyle, { 
          textShadowColor: colors.glow.cyanGlow,
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 10,
        }, textStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  if (variant === 'secondary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          baseButtonStyle,
          {
            backgroundColor: colors.dark.deep,
            borderWidth: 2,
            borderColor: colors.neon[glowColor],
          },
          style
        ]}
        activeOpacity={0.8}
      >
        <Text style={[baseTextStyle, { color: colors.neon[glowColor] }, textStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  if (variant === 'ghost') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          baseButtonStyle,
          {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.border.subtle,
          },
          style
        ]}
        activeOpacity={0.7}
      >
        <Text style={[baseTextStyle, { color: colors.text.secondary }, textStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  if (variant === 'terminal') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          baseButtonStyle,
          {
            backgroundColor: colors.dark.abyss,
            borderWidth: 1,
            borderColor: colors.neon.lime,
          },
          style
        ]}
        activeOpacity={0.8}
      >
        <Text style={[
          baseTextStyle,
          typography.styles.terminalText,
          { 
            color: colors.neon.lime,
            textShadowColor: colors.glow.limeGlow,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 5,
          },
          textStyle
        ]}>
          {title.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }

  // Default fallback
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[baseButtonStyle, { backgroundColor: colors.dark.deep }, style]}
      activeOpacity={0.8}
    >
      <Text style={[baseTextStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};