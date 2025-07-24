import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useOnboardingStore } from '../hooks/useOnboardingStore';
import {
  NeonButton,
  CyberText,
  TerminalText,
  useCyberpunkTheme
} from '../../../components/cyberpunk';

const { width } = Dimensions.get('window');

interface OnboardingControlsProps {
  onComplete: () => void;
}

export const OnboardingControls: React.FC<OnboardingControlsProps> = ({ onComplete }) => {
  const { colors, spacing } = useCyberpunkTheme();
  const { 
    currentStep, 
    steps, 
    nextStep, 
    skipOnboarding 
  } = useOnboardingStore();
  
  // Animation refs
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnims = useRef(
    steps.map(() => new Animated.Value(1))
  ).current;

  useEffect(() => {
    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: (currentStep + 1) / steps.length,
      duration: 500,
      useNativeDriver: false,
    }).start();

    // Pulse animation for current step
    pulseAnims.forEach((anim, index) => {
      if (index === currentStep) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1.3,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      } else {
        anim.setValue(1);
      }
    });
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      onComplete();
    } else {
      nextStep();
    }
  };

  const handleSkip = () => {
    skipOnboarding();
    onComplete();
  };

  const getStepColor = (index: number) => {
    if (index < currentStep) return colors.neon.lime; // Completed
    if (index === currentStep) return colors.neon.cyan; // Current
    return colors.text.disabled; // Future
  };

  return (
    <View style={styles.container}>
      {/* Header with Skip Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <LinearGradient
            colors={[colors.dark.deep, colors.dark.midnight]}
            style={styles.skipGradient}
          >
            <MaterialCommunityIcon 
              name="close" 
              size={16} 
              color={colors.text.tertiary} 
            />
            <TerminalText style={styles.skipText}>SKIP_INIT</TerminalText>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Footer with Progress and Controls */}
      <View style={styles.footer}>
        {/* Neural Progress Visualization */}
        <View style={styles.progressSection}>
          {/* Progress bar */}
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                  backgroundColor: colors.neon.cyan,
                },
              ]}
            />
          </View>
          
          {/* Neural Pagination Dots */}
          <View style={styles.neuralPagination}>
            {steps.map((_, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <View key={index} style={styles.neuralDotContainer}>
                  {/* Connection lines */}
                  {index < steps.length - 1 && (
                    <View 
                      style={[
                        styles.connectionLine,
                        {
                          backgroundColor: index < currentStep 
                            ? colors.neon.lime 
                            : colors.border.subtle,
                        }
                      ]} 
                    />
                  )}
                  
                  {/* Neural dot */}
                  <Animated.View
                    style={[
                      styles.neuralDot,
                      {
                        borderColor: getStepColor(index),
                        backgroundColor: isCompleted ? getStepColor(index) : 'transparent',
                        transform: [{ scale: pulseAnims[index] }],
                      },
                    ]}
                  >
                    {isCompleted && (
                      <MaterialCommunityIcon 
                        name="check" 
                        size={12} 
                        color={colors.dark.void} 
                      />
                    )}
                    {isActive && !isCompleted && (
                      <View style={[styles.activeDot, { backgroundColor: colors.neon.cyan }]} />
                    )}
                  </Animated.View>
                </View>
              );
            })}
          </View>
          
          {/* Progress text */}
          <CyberText variant="caption" color="tertiary" style={styles.progressText}>
            MODULE {(currentStep + 1).toString().padStart(2, '0')} / {steps.length.toString().padStart(2, '0')}
          </CyberText>
        </View>

        {/* Navigation Button */}
        <NeonButton
          title={currentStep === steps.length - 1 ? 'INITIALIZE_SYSTEM' : 'NEXT_MODULE'}
          onPress={handleNext}
          variant="primary"
          size="large"
          style={styles.nextButton}
        />
        
        {/* System status */}
        <View style={styles.systemStatus}>
          <View style={[styles.statusDot, { backgroundColor: colors.neon.lime }]} />
          <TerminalText style={styles.statusText}>
            NEURAL_LINK: STABLE | READY_FOR_DEPLOY
          </TerminalText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  skipButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  skipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  skipText: {
    marginLeft: 6,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  
  // Footer styles
  footer: {
    paddingBottom: 50,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  
  // Progress section
  progressSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  progressBar: {
    width: width * 0.7,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 1,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 1,
  },
  
  // Neural pagination
  neuralPagination: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  neuralDotContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  connectionLine: {
    position: 'absolute',
    width: 40,
    height: 1,
    left: 20,
    top: '50%',
    opacity: 0.6,
  },
  neuralDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 11,
    letterSpacing: 1,
    opacity: 0.8,
  },
  
  // Next button
  nextButton: {
    width: width * 0.8,
    marginBottom: 16,
  },
  
  // System status
  systemStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  statusText: {
    fontSize: 10,
    letterSpacing: 0.5,
    opacity: 0.9,
  },
});