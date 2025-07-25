import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useOnboardingStore } from '../hooks/useOnboardingStore';
import { OnboardingSlide } from './OnboardingSlide';
import { OnboardingControls } from './OnboardingControls';
import { useSeekerTheme } from '../../../components/seeker';

const { width, height } = Dimensions.get('window');

export const OnboardingContainer: React.FC = () => {
  const { theme } = useSeekerTheme();
  const navigation = useNavigation();
  const { currentStep, steps, completeOnboarding } = useOnboardingStore();
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const particleAnims = useRef(
    Array.from({ length: 20 }, () => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(Math.random() * height),
      opacity: new Animated.Value(Math.random()),
      scale: new Animated.Value(Math.random() * 0.5 + 0.5),
    }))
  ).current;
  const matrixRainAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Floating particles animation
    particleAnims.forEach((particle, index) => {
      const animateParticle = () => {
        Animated.parallel([
          Animated.timing(particle.x, {
            toValue: Math.random() * width,
            duration: 8000 + Math.random() * 4000,
            useNativeDriver: true,
          }),
          Animated.timing(particle.y, {
            toValue: Math.random() * height,
            duration: 6000 + Math.random() * 4000,
            useNativeDriver: true,
          }),
          Animated.loop(
            Animated.sequence([
              Animated.timing(particle.opacity, {
                toValue: Math.random() * 0.8 + 0.2,
                duration: 2000,
                useNativeDriver: true,
              }),
              Animated.timing(particle.opacity, {
                toValue: Math.random() * 0.3,
                duration: 2000,
                useNativeDriver: true,
              }),
            ])
          ),
        ]).start(() => animateParticle());
      };
      
      setTimeout(() => animateParticle(), index * 200);
    });

    // Matrix rain effect
    Animated.loop(
      Animated.timing(matrixRainAnim, {
        toValue: 1,
        duration: 15000,
        useNativeDriver: true,
      })
    ).start();

    return () => {
      fadeAnim.stopAnimation();
      matrixRainAnim.stopAnimation();
      particleAnims.forEach(particle => {
        particle.x.stopAnimation();
        particle.y.stopAnimation();
        particle.opacity.stopAnimation();
      });
    };
  }, []);

  const handleComplete = () => {
    completeOnboarding();
    navigation.navigate('HomeStack' as never);
  };

  const currentData = steps[currentStep];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Seeker Background */}
      <LinearGradient
        colors={theme.colors.gradients.hero}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Seeker Grid */}
      <View style={styles.neuralGrid}>
        {/* Horizontal lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <View
            key={`h-${i}`}
            style={[
              styles.gridLineHorizontal,
              {
                top: (height / 10) * i,
                backgroundColor: theme.colors.border.subtle,
                opacity: 0.1,
              },
            ]}
          />
        ))}
        {/* Vertical lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <View
            key={`v-${i}`}
            style={[
              styles.gridLineVertical,
              {
                left: (width / 6) * i,
                backgroundColor: theme.colors.border.subtle,
                opacity: 0.1,
              },
            ]}
          />
        ))}
      </View>
      
      {/* Floating Particles */}
      <View style={styles.particleContainer}>
        {particleAnims.map((particle, index) => (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                backgroundColor: index % 3 === 0 ? theme.colors.primary.teal : 
                                index % 3 === 1 ? theme.colors.primary.darkTeal : theme.colors.primary.lightTeal,
                transform: [
                  { translateX: particle.x },
                  { translateY: particle.y },
                  { scale: particle.scale },
                ],
                opacity: particle.opacity,
              },
            ]}
          />
        ))}
      </View>
      
      {/* Flow Effect */}
      <Animated.View
        style={[
          styles.matrixRain,
          {
            transform: [
              {
                translateY: matrixRainAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-height, height],
                }),
              },
            ],
          },
        ]}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.rainColumn,
              {
                left: (width / 5) * i,
                backgroundColor: theme.colors.primary.teal,
                opacity: 0.2,
              },
            ]}
          />
        ))}
      </Animated.View>
      
      {/* Main Content */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <OnboardingControls onComplete={handleComplete} />
        <OnboardingSlide step={currentData} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Neural grid background
  neuralGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
  },
  
  // Floating particles
  particleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  
  // Matrix rain effect
  matrixRain: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  rainColumn: {
    position: 'absolute',
    width: 2,
    height: height * 0.3,
    top: 0,
  },
  
  // Main content
  content: {
    flex: 1,
  },
});