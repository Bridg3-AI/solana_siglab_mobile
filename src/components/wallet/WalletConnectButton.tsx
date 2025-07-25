import React from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { useWallet } from './WalletProvider';
import { CyberpunkTheme } from '../cyberpunk';

export function WalletConnectButton() {
  const { account, isConnecting, isConnected, platform, connect, disconnect } = useWallet();

  const handleConnect = async () => {
    try {
      await connect();
      Alert.alert('Success', 'Wallet connected successfully!');
    } catch (error) {
      console.error('Wallet connection error:', error);
      Alert.alert(
        'Connection Failed',
        error instanceof Error ? error.message : 'Failed to connect wallet'
      );
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      Alert.alert('Disconnected', 'Wallet disconnected successfully!');
    } catch (error) {
      console.error('Wallet disconnection error:', error);
      Alert.alert(
        'Disconnection Failed',
        error instanceof Error ? error.message : 'Failed to disconnect wallet'
      );
    }
  };

  const getWalletTypeText = () => {
    if (Platform.OS === 'android') {
      return 'Android: MWA + Phantom Deeplink';
    } else {
      return 'iOS: Phantom Deeplink';
    }
  };

  if (isConnected && account) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Text style={[styles.title, { color: CyberpunkTheme.colors.primary }]}>
            Wallet Connected
          </Text>
          <Text style={[styles.subtitle, { color: CyberpunkTheme.colors.onSurface }]}>
            {getWalletTypeText()}
          </Text>
          <View style={styles.accountInfo}>
            <Text style={[styles.label, { color: CyberpunkTheme.colors.onSurface }]}>
              Address:
            </Text>
            <Text style={[styles.address, { color: CyberpunkTheme.colors.primary }]} numberOfLines={1}>
              {account.address}
            </Text>
          </View>
          <Button
            mode="outlined"
            onPress={handleDisconnect}
            style={[styles.button, { borderColor: CyberpunkTheme.colors.primary }]}
            labelStyle={{ color: CyberpunkTheme.colors.primary }}
          >
            Disconnect
          </Button>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={[styles.title, { color: CyberpunkTheme.colors.primary }]}>
          Connect Solana Wallet
        </Text>
        <Text style={[styles.subtitle, { color: CyberpunkTheme.colors.onSurface }]}>
          {getWalletTypeText()}
        </Text>
        <Text style={[styles.description, { color: CyberpunkTheme.colors.onSurface }]}>
          {Platform.OS === 'ios' 
            ? 'Connect using Phantom wallet via secure deeplinks'
            : 'Connect using Mobile Wallet Adapter or Phantom deeplinks'
          }
        </Text>
        <Button
          mode="contained"
          onPress={handleConnect}
          loading={isConnecting}
          disabled={isConnecting}
          style={[styles.button, { backgroundColor: CyberpunkTheme.colors.primary }]}
          labelStyle={{ color: CyberpunkTheme.colors.onPrimary }}
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    backgroundColor: CyberpunkTheme.colors.surface,
    borderColor: CyberpunkTheme.colors.primary,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 12,
    opacity: 0.8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  accountInfo: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: CyberpunkTheme.colors.background,
    borderRadius: 8,
    borderColor: CyberpunkTheme.colors.outline,
    borderWidth: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  address: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  button: {
    marginTop: 8,
  },
});