import React from 'react';
import { Text, TextStyle } from 'react-native';
import { SeekerTheme } from './theme';

export interface SeekerTextProps {
  children: React.ReactNode;
  variant?: 'hero' | 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'overline';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'disabled';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  style?: TextStyle;
  numberOfLines?: number;
}

export const SeekerText: React.FC<SeekerTextProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  weight,
  align = 'left',
  style,
  numberOfLines,
}) => {
  const { colors, typography } = SeekerTheme;

  const getTextStyle = (): TextStyle => {
    let fontSize = typography.sizes.md;
    let lineHeight = typography.lineHeights.normal;
    let fontWeight = weight || typography.weights.regular;

    switch (variant) {
      case 'hero':
        fontSize = typography.sizes.hero;
        lineHeight = typography.lineHeights.tight;
        fontWeight = weight || typography.weights.bold;
        break;
      case 'h1':
        fontSize = typography.sizes.xxl;
        lineHeight = typography.lineHeights.tight;
        fontWeight = weight || typography.weights.bold;
        break;
      case 'h2':
        fontSize = typography.sizes.xl;
        lineHeight = typography.lineHeights.tight;
        fontWeight = weight || typography.weights.semibold;
        break;
      case 'h3':
        fontSize = typography.sizes.lg;
        lineHeight = typography.lineHeights.normal;
        fontWeight = weight || typography.weights.semibold;
        break;
      case 'body':
        fontSize = typography.sizes.md;
        lineHeight = typography.lineHeights.normal;
        break;
      case 'caption':
        fontSize = typography.sizes.sm;
        lineHeight = typography.lineHeights.normal;
        break;
      case 'overline':
        fontSize = typography.sizes.xs;
        lineHeight = typography.lineHeights.normal;
        fontWeight = weight || typography.weights.medium;
        break;
    }

    const textColor = colors.text[color];

    return {
      fontSize,
      lineHeight: fontSize * lineHeight,
      fontWeight,
      color: textColor,
      textAlign: align,
      fontFamily: typography.fonts.primary,
    };
  };

  return (
    <Text 
      style={[getTextStyle(), style]} 
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export const SeekerHeading: React.FC<Omit<SeekerTextProps, 'variant'> & { level: 1 | 2 | 3 }> = ({
  level,
  ...props
}) => {
  const variant = level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3';
  return <SeekerText variant={variant} {...props} />;
};