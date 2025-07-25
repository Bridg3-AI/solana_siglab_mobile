import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuthorization } from '../../../utils/useAuthorization';
import { 
  CyberCard, 
  CyberText, 
  NeonText, 
  GlitchText,
  useCyberpunkTheme 
} from '../../../components/cyberpunk';

export const WelcomeHeader: React.FC = () => {
  const { colors, spacing } = useCyberpunkTheme();
  const { selectedAccount } = useAuthorization();
  
  // Animation refs
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glitchAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for the AI robot
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotation animation for holographic effect
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();

    // Glitch effect trigger
    const glitchInterval = setInterval(() => {
      Animated.sequence([
        Animated.timing(glitchAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(glitchAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }, 8000);

    return () => clearInterval(glitchInterval);
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <CyberCard variant="hologram" glowColor="cyan" style={styles.card}>
      <View style={styles.content}>
        {/* Holographic AI Avatar */}
        <View style={styles.avatarContainer}>
          <Animated.View
            style={[
              styles.avatarBackground,
              {
                transform: [
                  { scale: pulseAnim },
                  { rotate: rotateInterpolate },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={colors?.gradients?.hologram || ['rgba(0,255,255,0.8)', 'rgba(255,0,255,0.8)', 'rgba(139,0,255,0.8)']}
              style={styles.avatarGradient}
            >
              <MaterialCommunityIcon
                name="robot"
                size={32}
                color={colors.dark.void}
              />
            </LinearGradient>
          </Animated.View>
          
          {/* Neural connections */}
          <View style={styles.neuralConnections}>
            {Array.from({ length: 3 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.neuralLine,
                  {
                    backgroundColor: colors.neon.cyan,
                    opacity: 0.6,
                    transform: [{ rotate: `${i * 45}deg` }],
                  },
                ]}
              />
            ))}
          </View>
        </View>
        
        <View style={styles.textContainer}>
          {selectedAccount ? (
            <>
              <GlitchText variant="h3" style={styles.title}>
                NEURAL LINK ACTIVE
              </GlitchText>
              <CyberText variant="body" color="secondary" style={styles.subtitle}>
                >> AI AGENT READY FOR GPS-BASED INSURANCE PROTOCOLS
              </CyberText>
              <NeonText neonColor="lime" variant="caption" style={styles.status}>
                STATUS: CONNECTED | LOCATION: SCANNING
              </NeonText>
            </>
          ) : (
            <>
              <GlitchText variant="h3" style={styles.title}>
                WELCOME TO CYBER INSURANCE
              </GlitchText>
              <CyberText variant="body" color="secondary" style={styles.subtitle}>
                >> INITIATE WALLET CONNECTION TO ACCESS NEURAL NETWORK
              </CyberText>
              <NeonText neonColor="red" variant="caption" style={styles.status}>
                STATUS: WALLET DISCONNECTED | ACCESS: RESTRICTED
              </NeonText>
            </>
          )}
        </View>
      </View>
    </CyberCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  
  // Avatar styles
  avatarContainer: {
    position: 'relative',
    marginRight: 20,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBackground: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  avatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  neuralConnections: {
    position: 'absolute',
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  neuralLine: {
    position: 'absolute',
    width: 32,
    height: 1,
  },
  
  // Text styles
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    marginBottom: 6,
    lineHeight: 18,
  },
  status: {
    fontSize: 10,
    letterSpacing: 0.5,
    opacity: 0.9,
  },
});