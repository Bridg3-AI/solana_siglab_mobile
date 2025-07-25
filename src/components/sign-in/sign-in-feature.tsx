import React from 'react';
import { View, StyleSheet } from "react-native";
import { ConnectButton, SignInButton } from "./sign-in-ui";
import {
  SeekerText,
  useSeekerTheme
} from '../seeker';

export function SignInFeature() {
  const { theme } = useSeekerTheme();
  
  return (
    <View style={styles.container}>
      {/* Clean accent pattern */}
      <View style={styles.accentPattern}>
        <View style={[styles.accentLine, { backgroundColor: theme.colors.primary.teal }]} />
        <View style={[styles.accentNode, { backgroundColor: theme.colors.primary.teal }]} />
        <View style={[styles.accentLineVertical, { backgroundColor: theme.colors.primary.darkTeal }]} />
      </View>
      
      <SeekerText variant="overline" color="tertiary" style={styles.systemLabel}>
        Wallet Connection
      </SeekerText>
      
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
  
  // Clean accent pattern
  accentPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  accentLine: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    right: '20%',
    height: 1,
  },
  accentLineVertical: {
    position: 'absolute',
    left: '50%',
    top: '30%',
    bottom: '20%',
    width: 1,
  },
  accentNode: {
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
