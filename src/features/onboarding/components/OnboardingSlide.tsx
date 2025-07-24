import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { OnboardingStep } from '../types';
import { cyberpunkEffects } from '../../../theme/cyberpunkEffects';
import { CyberpunkColors } from '../../../theme/cyberpunkTheme';

const { width } = Dimensions.get('window');

interface OnboardingSlideProps {
  step: OnboardingStep;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ step }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Card style={[styles.card, cyberpunkEffects.holographicCard()]}>
        <Card.Content style={styles.cardContent}>
          <View style={[styles.iconContainer, cyberpunkEffects.neonGlow(theme.colors.primary), { backgroundColor: `${theme.colors.primaryContainer}E6` }]}>
            <MaterialCommunityIcon
              name={step.icon as any}
              size={60}
              color={theme.colors.primary}
            />
          </View>
          
          <Text variant="headlineMedium" style={[styles.title, cyberpunkEffects.textGlow(), { color: theme.colors.onSurface }]}>
            {step.title}
          </Text>
          
          <Text variant="bodyLarge" style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
            {step.description}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width * 0.9,
    elevation: 4,
    borderRadius: 20,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
  },
});
