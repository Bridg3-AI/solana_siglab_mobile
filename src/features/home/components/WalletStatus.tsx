import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuthorization } from '../../../utils/useAuthorization';
import { SignInFeature } from '../../../components/sign-in/sign-in-feature';
import { AccountDetailFeature } from '../../../components/account/account-detail-feature';
import { 
  CyberCard, 
  CyberText, 
  NeonText,
  TerminalText,
  useCyberpunkTheme 
} from '../../../components/cyberpunk';

export const WalletStatus: React.FC = () => {
  const { colors, spacing } = useCyberpunkTheme();
  const { selectedAccount } = useAuthorization();
  
  // Animation refs
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for connected status
    if (selectedAccount) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Scanning animation for disconnected state
      Animated.loop(
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [selectedAccount]);

  const scanTranslate = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  if (selectedAccount) {
    return (
      <View style={styles.container}>
        <CyberText variant="overline" color="tertiary" style={styles.sectionTitle}>
          >> NEURAL WALLET STATUS
        </CyberText>
        
        <CyberCard variant="neon" glowColor="lime" style={styles.connectedCard}>
          <View style={styles.connectedContent}>
            {/* Connection Status Header */}
            <View style={styles.statusHeader}>
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <LinearGradient
                  colors={colors.gradients.matrix}
                  style={styles.connectionIndicator}
                >
                  <MaterialCommunityIcon
                    name="check-network-outline"
                    size={24}
                    color={colors.dark.void}
                  />
                </LinearGradient>
              </Animated.View>
              
              <View style={styles.statusText}>
                <NeonText neonColor="lime" variant="h6" style={styles.connectedTitle}>
                  WALLET SYNCHRONIZED
                </NeonText>
                <TerminalText style={styles.connectedStatus}>
                  BLOCKCHAIN: SOLANA | NETWORK: ACTIVE
                </TerminalText>
              </View>
            </View>
            
            {/* Neural patterns */}
            <View style={styles.neuralPatterns}>
              {Array.from({ length: 4 }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.neuralDot,
                    {
                      backgroundColor: colors.neon.lime,
                      left: `${20 + i * 20}%`,
                      animationDelay: `${i * 200}ms`,
                    },
                  ]}
                />
              ))}
            </View>
            
            {/* Account Details */}
            <View style={styles.accountWrapper}>
              <AccountDetailFeature />
            </View>
          </View>
        </CyberCard>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CyberText variant="overline" color="tertiary" style={styles.sectionTitle}>
        >> WALLET CONNECTION REQUIRED
      </CyberText>
      
      <CyberCard variant="glass" style={styles.disconnectedCard}>
        <View style={styles.disconnectedContent}>
          {/* Scanning Animation */}
          <View style={styles.scanContainer}>
            <Animated.View
              style={[
                styles.scanLine,
                {
                  backgroundColor: colors.neon.red,
                  transform: [{ translateX: scanTranslate }],
                },
              ]}
            />
            <View style={styles.walletIconContainer}>
              <MaterialCommunityIcon
                name="wallet-outline"
                size={40}
                color={colors.neon.red}
                style={styles.walletIcon}
              />
              {/* Disconnected overlay */}
              <View style={styles.disconnectedOverlay}>
                <MaterialCommunityIcon
                  name="close-circle"
                  size={20}
                  color={colors.neon.red}
                />
              </View>
            </View>
          </View>
          
          <View style={styles.disconnectedText}>
            <NeonText neonColor="red" variant="h6" style={styles.disconnectedTitle}>
              NEURAL LINK OFFLINE
            </NeonText>
            <CyberText variant="body" color="secondary" style={styles.disconnectedDescription}>
              >> CONNECT SOLANA MOBILE WALLET TO ACCESS
            </CyberText>
            <CyberText variant="body" color="secondary" style={styles.disconnectedDescription}>
              >> GPS-BASED INSURANCE PROTOCOLS
            </CyberText>
            <TerminalText style={styles.systemStatus}>
              STATUS: DISCONNECTED | ACCESS_LEVEL: RESTRICTED
            </TerminalText>
          </View>
          
          {/* Connection Interface */}
          <View style={styles.connectionInterface}>
            <SignInFeature />
          </View>
        </View>
      </CyberCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    marginLeft: 4,
    letterSpacing: 1,
  },
  
  // Connected state styles
  connectedCard: {
    overflow: 'hidden',
  },
  connectedContent: {
    padding: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  connectionIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statusText: {
    flex: 1,
  },
  connectedTitle: {
    marginBottom: 4,
    letterSpacing: 1,
  },
  connectedStatus: {
    fontSize: 11,
    opacity: 0.8,
  },
  neuralPatterns: {
    position: 'relative',
    height: 20,
    marginBottom: 16,
  },
  neuralDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    top: '50%',
    opacity: 0.8,
  },
  accountWrapper: {
    width: '100%',
  },
  
  // Disconnected state styles
  disconnectedCard: {
    overflow: 'hidden',
  },
  disconnectedContent: {
    padding: 24,
    alignItems: 'center',
  },
  scanContainer: {
    position: 'relative',
    width: 120,
    height: 80,
    marginBottom: 20,
    overflow: 'hidden',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    opacity: 0.6,
  },
  walletIconContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  walletIcon: {
    opacity: 0.7,
  },
  disconnectedOverlay: {
    position: 'absolute',
    bottom: -2,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
  },
  disconnectedText: {
    alignItems: 'center',
    marginBottom: 24,
  },
  disconnectedTitle: {
    marginBottom: 12,
    letterSpacing: 1,
  },
  disconnectedDescription: {
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 18,
  },
  systemStatus: {
    fontSize: 10,
    marginTop: 8,
    opacity: 0.7,
    letterSpacing: 0.5,
  },
  connectionInterface: {
    width: '100%',
  },
});