import React from 'react';
import { TouchableOpacity, View, StyleSheet, ViewStyle, TouchableOpacityProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { SeekerText } from './SeekerText';
import { SeekerTheme } from './theme';

export interface SeekerButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: keyof typeof MaterialCommunityIcon.glyphMap;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const SeekerButton: React.FC<SeekerButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  children,
  ...props
}) => {
  const { colors, spacing, borderRadius, typography } = SeekerTheme;

  const getButtonSize = () => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.md,
          minHeight: 32,
        };
      case 'lg':
        return {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.xl,
          minHeight: 48,
        };
      default: // md
        return {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.lg,
          minHeight: 40,
        };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return typography.sizes.sm;
      case 'lg':
        return typography.sizes.lg;
      default:
        return typography.sizes.md;
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 16;
      case 'lg':
        return 24;
      default:
        return 20;
    }
  };

  const buttonSize = getButtonSize();
  const textSize = getTextSize();
  const iconSize = getIconSize();

  const baseStyle: ViewStyle = {
    ...buttonSize,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: fullWidth ? 'stretch' : 'flex-start',
    opacity: disabled || loading ? 0.6 : 1,
  };

  const getButtonContent = () => {
    const textColor = variant === 'primary' ? colors.text.primary : 
                     variant === 'outline' || variant === 'ghost' ? colors.primary.teal : 
                     colors.text.primary;

    const iconColor = textColor;

    const content = (
      <>
        {icon && iconPosition === 'left' && (
          <MaterialCommunityIcon
            name={icon}
            size={iconSize}
            color={iconColor}
            style={{ marginRight: title ? spacing.xs : 0 }}
          />
        )}
        {title && (
          <SeekerText
            variant="body"
            color={variant === 'primary' ? 'primary' : 'accent'}
            weight="medium"
            style={{ fontSize: textSize }}
          >
            {title}
          </SeekerText>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <MaterialCommunityIcon
            name={icon}
            size={iconSize}
            color={iconColor}
            style={{ marginLeft: title ? spacing.xs : 0 }}
          />
        )}
      </>
    );

    return content;
  };

  const getButtonVariant = () => {
    switch (variant) {
      case 'outline':
        return (
          <View style={[baseStyle, styles.outlineButton, style]}>
            {getButtonContent()}
          </View>
        );
      case 'ghost':
        return (
          <View style={[baseStyle, styles.ghostButton, style]}>
            {getButtonContent()}
          </View>
        );
      case 'secondary':
        return (
          <View style={[baseStyle, styles.secondaryButton, style]}>
            {getButtonContent()}
          </View>
        );
      default: // primary
        return (
          <LinearGradient
            colors={colors.gradients.primary}
            style={[baseStyle, style]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {getButtonContent()}
          </LinearGradient>
        );
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      {...props}
    >
      {getButtonVariant()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: SeekerTheme.colors.primary.teal,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  secondaryButton: {
    backgroundColor: SeekerTheme.colors.background.elevated,
  },
});