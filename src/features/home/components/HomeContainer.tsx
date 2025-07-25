import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSeekerTheme } from '../../../components/seeker';
import { WelcomeHeader } from './WelcomeHeader';
import { QuickActions } from './QuickActions';
import { WalletStatus } from './WalletStatus';
import { WalletConnectButton } from '../../../components/wallet';

const { width, height } = Dimensions.get('window');

export const HomeContainer: React.FC = () => {
  const { theme } = useSeekerTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Clean Seeker Background */}
      <LinearGradient
        colors={theme.colors.gradients.hero}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <WelcomeHeader />
          <WalletConnectButton />
          <QuickActions />
          <WalletStatus />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    padding: 20,
    paddingTop: 30,
  },
});