/**
 * Insurance Theme - Glassmorphism styles for React Native
 * Converted from dApp_UI CSS to React Native StyleSheet
 */
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Color Palette - Seeker Insurance Theme
export const InsuranceColors = {
  // Background
  background: {
    primary: '#0a0b14',
    secondary: '#1a1b2e', 
    tertiary: '#16213e',
  },
  
  // Primary Colors
  primary: {
    teal: '#00d4d4',
    cyan: '#4ecdc4',
  },
  
  // Glass Effects
  glass: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.1)',
    header: 'rgba(0, 0, 0, 0.3)',
    accent: 'rgba(0, 212, 212, 0.1)',
    strong: 'rgba(255, 255, 255, 0.15)',
    warning: 'rgba(255, 165, 2, 0.1)',
  },
  
  // Text Colors
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.8)',
    muted: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.6)',
    accent: '#00d4d4',
  },
  
  // Status Colors
  status: {
    error: '#ff4757',
    success: '#2ed573',
    warning: '#ffa502',
    info: '#3742fa',
  },
  
  // Neon Effects
  neon: {
    glow: 'rgba(0, 212, 212, 0.5)',
    border: 'rgba(0, 212, 212, 0.3)',
  },
};

// Base Styles
export const InsuranceStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: InsuranceColors.background.primary,
  },
  
  safeArea: {
    flex: 1,
  },
  
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  
  // Background Gradient (requires LinearGradient component)
  gradientBackground: {
    flex: 1,
    // Note: Use with LinearGradient component
    // colors: [InsuranceColors.background.primary, InsuranceColors.background.secondary, InsuranceColors.background.tertiary]
  },
  
  // Glass Card Effects
  glassCard: {
    backgroundColor: InsuranceColors.glass.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: InsuranceColors.glass.border,
    // Note: backdrop-filter blur not directly available in RN
    // Use blur view component for true glassmorphism
  },
  
  glassCardWithShadow: {
    backgroundColor: InsuranceColors.glass.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: InsuranceColors.glass.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    elevation: 8,
  },
  
  glassHeader: {
    backgroundColor: InsuranceColors.glass.header,
    borderBottomWidth: 1,
    borderBottomColor: InsuranceColors.glass.border,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  
  // Neon Effects
  neonBorder: {
    borderWidth: 1,
    borderColor: InsuranceColors.primary.teal,
    shadowColor: InsuranceColors.primary.teal,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  
  // Typography
  neonText: {
    color: InsuranceColors.primary.teal,
    // Note: textShadow not available in RN core
    // Use custom shadow component if needed
  },
  
  gradientText: {
    color: InsuranceColors.primary.teal,
    fontWeight: '600',
    // Note: gradient text requires custom implementation
  },
  
  primaryText: {
    color: InsuranceColors.text.primary,
    fontSize: 16,
    fontWeight: '400',
  },
  
  secondaryText: {
    color: InsuranceColors.text.secondary,
    fontSize: 14,
    fontWeight: '400',
  },
  
  mutedText: {
    color: InsuranceColors.text.muted,
    fontSize: 12,
    fontWeight: '400',
  },
  
  headerTitle: {
    color: InsuranceColors.text.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  
  // Layout Helpers
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  padding: {
    padding: 16,
  },
  
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  
  paddingVertical: {
    paddingVertical: 16,
  },
  
  marginVertical: {
    marginVertical: 8,
  },
  
  // Progress Bar
  progressContainer: {
    width: '100%',
    height: 4,
    backgroundColor: InsuranceColors.glass.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: InsuranceColors.primary.teal,
    borderRadius: 2,
    shadowColor: InsuranceColors.primary.teal,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
  },
  
  // Button Styles
  primaryButton: {
    backgroundColor: InsuranceColors.primary.teal,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: InsuranceColors.primary.teal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  
  primaryButtonText: {
    color: InsuranceColors.background.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  
  ghostButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: InsuranceColors.glass.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  ghostButtonText: {
    color: InsuranceColors.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Input Styles
  textInput: {
    backgroundColor: InsuranceColors.glass.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: InsuranceColors.glass.border,
    paddingVertical: 16,
    paddingHorizontal: 16,
    color: InsuranceColors.text.primary,
    fontSize: 16,
    minHeight: 48,
  },
  
  textInputFocused: {
    borderColor: InsuranceColors.primary.teal,
    shadowColor: InsuranceColors.primary.teal,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 2,
  },
  
  // Card Variants
  accentCard: {
    backgroundColor: InsuranceColors.glass.accent,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: InsuranceColors.primary.teal + '30', // 30% opacity
    padding: 16,
  },
  
  errorCard: {
    backgroundColor: InsuranceColors.status.error + '20', // 20% opacity
    borderRadius: 12,
    borderWidth: 1,
    borderColor: InsuranceColors.status.error + '30', // 30% opacity
    padding: 12,
  },
  
  successCard: {
    backgroundColor: InsuranceColors.status.success + '20', // 20% opacity
    borderRadius: 12,
    borderWidth: 1,
    borderColor: InsuranceColors.status.success + '30', // 30% opacity
    padding: 12,
  },
  
  // Animations & Transitions
  pressableCard: {
    transform: [{ scale: 1 }], // Use with Animated.Value for press effects
  },
  
  // Responsive Design
  maxWidth: {
    maxWidth: Math.min(width - 32, 400), // Max 400px width with 16px margin
    alignSelf: 'center',
    width: '100%',
  },
});

// Gradient Configurations for LinearGradient
export const GradientConfigs = {
  background: {
    colors: [
      InsuranceColors.background.primary,
      InsuranceColors.background.secondary,
      InsuranceColors.background.tertiary,
    ],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  
  primary: {
    colors: [InsuranceColors.primary.teal, InsuranceColors.primary.cyan],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  
  card: {
    colors: [
      InsuranceColors.glass.background,
      InsuranceColors.glass.strong,
    ],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
};

// Animation Durations
export const AnimationDurations = {
  fast: 150,
  normal: 300,
  slow: 500,
  progress: 1000,
};

export default InsuranceStyles;