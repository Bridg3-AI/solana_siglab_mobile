import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { alertAndLog } from "../../utils/alertAndLog";
import { useAuthorization } from "../../utils/useAuthorization";
import { useMobileWallet } from "../../utils/useMobileWallet";
import {
  TerminalText,
  useCyberpunkTheme
} from '../cyberpunk';\nimport { signInStyles as styles } from './sign-in-styles';

export function ConnectButton() {
  const { colors } = useCyberpunkTheme();
  const { authorizeSession } = useAuthorization();
  const { connect } = useMobileWallet();
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  
  // Animation refs
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (authorizationInProgress) {
      // Pulse animation during connection
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
      
      // Scanning animation
      Animated.loop(
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      pulseAnim.setValue(1);
      scanAnim.setValue(0);
    }
  }, [authorizationInProgress]);
  
  const handleConnectPress = useCallback(async () => {
    try {
      if (authorizationInProgress) {
        return;
      }
      setAuthorizationInProgress(true);
      await connect();
    } catch (err: any) {
      alertAndLog(
        "Error during connect",
        err instanceof Error ? err.message : err
      );
    } finally {
      setAuthorizationInProgress(false);
    }
  }, [authorizationInProgress, authorizeSession]);
  
  return (
    <TouchableOpacity
      style={[styles.connectButton, { opacity: authorizationInProgress ? 0.7 : 1 }]}
      onPress={handleConnectPress}
      disabled={authorizationInProgress}
      activeOpacity={0.8}
    >
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <LinearGradient
          colors={colors.gradients.neonPrimary}
          style={styles.connectGradient}
        >
          {/* Scanning line during connection */}
          {authorizationInProgress && (
            <Animated.View
              style={[
                styles.scanLine,
                {
                  backgroundColor: colors.neon.lime,
                  transform: [
                    {
                      translateX: scanAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-100, 100],
                      }),
                    },
                  ],
                },
              ]}
            />
          )}
          
          {/* Icon and text */}
          <View style={styles.buttonContent}>
            <MaterialCommunityIcon
              name={authorizationInProgress ? "loading" : "wallet-outline"}
              size={20}
              color={colors.dark.void}
              style={styles.buttonIcon}
            />
            <TerminalText style={[styles.buttonText, { color: colors.dark.void }]}>
              {authorizationInProgress ? 'CONNECTING...' : 'CONNECT_WALLET'}
            </TerminalText>
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
}

export function SignInButton() {
  const { colors } = useCyberpunkTheme();
  const { authorizeSession } = useAuthorization();
  const { signIn } = useMobileWallet();
  const [signInInProgress, setSignInInProgress] = useState(false);
  
  // Animation refs
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (signInInProgress) {
      Animated.loop(
        Animated.timing(borderAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        })
      ).start();
    } else {
      borderAnim.setValue(0);
    }
  }, [signInInProgress]);
  
  const handleConnectPress = useCallback(async () => {
    try {
      if (signInInProgress) {
        return;
      }
      setSignInInProgress(true);
      await signIn({
        domain: "neural-insurance.cyber",
        statement: "Authenticate Neural Link for Insurance Protocol Access",
        uri: "https://neural-insurance.cyber",
      });
    } catch (err: any) {
      alertAndLog(
        "Error during sign in",
        err instanceof Error ? err.message : err
      );
    } finally {
      setSignInInProgress(false);
    }
  }, [signInInProgress, authorizeSession]);
  
  const animatedBorderColor = borderAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [colors.neon.magenta, colors.neon.cyan, colors.neon.magenta],
  });
  
  return (
    <TouchableOpacity
      style={[styles.signInButton, { opacity: signInInProgress ? 0.7 : 1 }]}
      onPress={handleConnectPress}
      disabled={signInInProgress}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.signInContainer,
          {
            borderColor: animatedBorderColor,
          },
        ]}
      >
        <LinearGradient
          colors={[
            `${colors.neon.magenta}10`,
            'transparent',
            `${colors.neon.magenta}10`,
          ]}
          style={styles.signInGradient}
        >
          {/* Circuit pattern */}
          <View style={styles.circuitOverlay}>
            <View style={[styles.circuitDot, { backgroundColor: colors.neon.magenta }]} />
            <View style={[styles.circuitLine, { backgroundColor: colors.neon.magenta }]} />
          </View>
          
          {/* Content */}
          <View style={styles.buttonContent}>
            <MaterialCommunityIcon
              name={signInInProgress ? "shield-sync" : "shield-key"}
              size={18}
              color={colors.neon.magenta}
              style={styles.buttonIcon}
            />
            <TerminalText style={[styles.buttonText, { color: colors.neon.magenta }]}>
              {signInInProgress ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
            </TerminalText>
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
}
