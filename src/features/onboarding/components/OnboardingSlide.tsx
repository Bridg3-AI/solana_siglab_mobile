import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { OnboardingStep } from '../types';
import {
  SeekerCard,
  SeekerText,
  SeekerHeading,
  useSeekerTheme
} from '../../../components/seeker';

const { width, height } = Dimensions.get('window');

interface OnboardingSlideProps {
  step: OnboardingStep;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ step }) => {
  const { theme } = useSeekerTheme();
  
  // Animation refs
  const slideAnim = useRef(new Animated.Value(0)).current;
  const iconRotateAnim = useRef(new Animated.Value(0)).current;
  const hologramAnim = useRef(new Animated.Value(0)).current;
  const particleAnims = useRef(
    Array.from({ length: 8 }, () => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    // Slide in animation
    Animated.spring(slideAnim, {
      toValue: 1,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // Icon rotation
    Animated.loop(
      Animated.timing(iconRotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();

    // Hologram effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(hologramAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(hologramAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Particle animations around icon
    particleAnims.forEach((particle, index) => {
      const angle = (index / particleAnims.length) * Math.PI * 2;
      const radius = 80;
      
      Animated.loop(
        Animated.timing(particle.x, {
          toValue: Math.cos(angle + Date.now() * 0.001) * radius,
          duration: 4000 + index * 500,
          useNativeDriver: true,
        })
      ).start();
      
      Animated.loop(
        Animated.timing(particle.y, {
          toValue: Math.sin(angle + Date.now() * 0.001) * radius,
          duration: 4000 + index * 500,
          useNativeDriver: true,
        })
      ).start();
      
      Animated.loop(
        Animated.sequence([
          Animated.timing(particle.opacity, {
            toValue: 0.8,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(particle.opacity, {
            toValue: 0.2,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    return () => {
      slideAnim.stopAnimation();
      iconRotateAnim.stopAnimation();
      hologramAnim.stopAnimation();
      particleAnims.forEach(particle => {
        particle.x.stopAnimation();
        particle.y.stopAnimation();
        particle.opacity.stopAnimation();
      });
    };
  }, [step.id]);

  const getIconColor = () => {
    switch (step.id) {
      case 1: return theme.colors.primary.teal;
      case 2: return theme.colors.primary.darkTeal;
      case 3: return theme.colors.primary.lightTeal;
      case 4: return theme.colors.primary.accent;
      default: return theme.colors.primary.teal;
    }
  };

  const getCardVariant = (): 'solid' | 'gradient' | 'glass' => {
    switch (step.id) {
      case 1: return 'gradient';
      case 2: return 'glass';
      case 3: return 'solid';
      case 4: return 'gradient';
      default: return 'glass';
    }
  };

  const getSeekerTitle = () => {
    switch (step.id) {
      case 1: return 'Seeker GPS System';
      case 2: return 'AI Insurance Agent';
      case 3: return 'Auto Coverage Protocol';
      case 4: return 'Solana Mobile Wallet';
      default: return 'Seeker System';
    }
  };

  const iconColor = getIconColor();
  const rotateInterpolate = iconRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              }),
            },
            { scale: slideAnim },
          ],
          opacity: slideAnim,
        },
      ]}
    >
      <SeekerCard 
        variant={getCardVariant()} 
        style={styles.card}
        elevated
      >
        <View style={styles.cardContent}>
          {/* Seeker Icon Container */}
          <View style={styles.iconSection}>
            {/* Particle effects around icon */}
            <View style={styles.particleContainer}>
              {particleAnims.map((particle, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.iconParticle,
                    {
                      backgroundColor: iconColor,
                      transform: [
                        { translateX: particle.x },
                        { translateY: particle.y },
                      ],
                      opacity: particle.opacity,
                    },
                  ]}
                />
              ))}
            </View>
            
            {/* Main Icon */}
            <View style={[styles.iconContainer, { borderColor: iconColor }]}>
              <LinearGradient
                colors={[
                  `${iconColor}30`,
                  `${iconColor}10`,
                  'transparent',
                ]}
                style={styles.iconGradient}
              >
                <Animated.View
                  style={{
                    transform: [{ rotate: rotateInterpolate }],
                  }}
                >
                  <MaterialCommunityIcon
                    name={step.icon as any}
                    size={64}
                    color={iconColor}
                  />
                </Animated.View>
              </LinearGradient>
              
              {/* Flow scan lines */}
              <Animated.View
                style={[
                  styles.hologramScan,
                  {
                    backgroundColor: iconColor,
                    transform: [
                      {
                        translateY: hologramAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-60, 60],
                        }),
                      },
                    ],
                    opacity: hologramAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, 0.6, 0],
                    }),
                  },
                ]}
              />
            </View>
          </View>
          
          {/* Content Section */}
          <View style={styles.textContent}>
            {/* System label */}
            <SeekerText 
              variant="overline" 
              color="tertiary" 
              style={styles.systemLabel}
            >
              {getSeekerTitle()}
            </SeekerText>
            
            {/* Main title */}
            <SeekerHeading 
              level={2}
              style={[styles.title, { color: iconColor }]}
            >
              {step.title}
            </SeekerHeading>
            
            {/* Description */}
            <SeekerText 
              variant="body" 
              color="secondary" 
              style={styles.description}
            >
              {step.description}
            </SeekerText>
            
            {/* Status indicator */}
            <View style={styles.statusIndicator}>
              <View style={[styles.statusDot, { backgroundColor: iconColor }]} />
              <SeekerText variant="caption" color="tertiary" style={styles.statusText}>
                Step {step.id} of 4 • Ready
              </SeekerText>
            </View>
          </View>
        </View>
      </SeekerCard>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: width * 0.9,
    maxWidth: 400,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 32,
    alignItems: 'center',
  },
  
  // Icon section
  iconSection: {
    position: 'relative',
    marginBottom: 40,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  particleContainer: {
    position: 'absolute',
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconParticle: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  iconGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hologramScan: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    top: '50%',
  },
  
  // Text content
  textContent: {
    alignItems: 'center',
    width: '100%',
  },
  systemLabel: {
    marginBottom: 12,
    fontSize: 11,
    letterSpacing: 1,
    opacity: 0.8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
    lineHeight: 32,
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  
  // Status indicator
  statusIndicator: {
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
  },
});