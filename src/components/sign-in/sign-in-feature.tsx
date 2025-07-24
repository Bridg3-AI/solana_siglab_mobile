import React from 'react';
import { View, StyleSheet } from "react-native";
import { ConnectButton, SignInButton } from "./sign-in-ui";
import {
  CyberText,
  useCyberpunkTheme
} from '../cyberpunk';

export function SignInFeature() {
  const { colors } = useCyberpunkTheme();
  
  return (
    <View style={styles.container}>
      {/* Circuit board pattern */}
      <View style={styles.circuitPattern}>
        <View style={[styles.circuitLine, { backgroundColor: colors.neon.cyan }]} />
        <View style={[styles.circuitNode, { backgroundColor: colors.neon.cyan }]} />
        <View style={[styles.circuitLineVertical, { backgroundColor: colors.neon.magenta }]} />
      </View>
      
      <CyberText variant="caption" color="tertiary" style={styles.systemLabel}>
        >> WALLET_CONNECTION_PROTOCOL
      </CyberText>
      
      <View style={styles.buttonGroup}>
        <ConnectButton />
        <SignInButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingVertical: 16,
  },
  
  // Circuit board pattern
  circuitPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  circuitLine: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    right: '20%',
    height: 1,
  },
  circuitLineVertical: {
    position: 'absolute',
    left: '50%',
    top: '30%',
    bottom: '20%',
    width: 1,
  },
  circuitNode: {
    position: 'absolute',
    top: '28%',
    left: '48%',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  
  systemLabel: {
    marginBottom: 12,
    fontSize: 11,
    letterSpacing: 1,
    textAlign: 'center',
  },
  
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
  },
});
