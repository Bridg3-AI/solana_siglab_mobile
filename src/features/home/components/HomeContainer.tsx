import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCyberpunkTheme } from '../../../components/cyberpunk';
import { WelcomeHeader } from './WelcomeHeader';
import { QuickActions } from './QuickActions';
import { WalletStatus } from './WalletStatus';
import { WalletConnectButton } from '../../../components/wallet';

const { width, height } = Dimensions.get('window');

export const HomeContainer: React.FC = () => {
  const { colors } = useCyberpunkTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.dark.void }]}>
      {/* Cyberpunk Background with Grid Pattern */}
      <LinearGradient
        colors={[
          colors.dark.void,
          colors.dark.deep,
          colors.dark.midnight,
          colors.dark.void,
        ]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Neural Grid Background */}
      <View style={styles.gridBackground}>
        {/* Vertical Grid Lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <View
            key={`v-${i}`}
            style={[
              styles.gridLineVertical,
              {
                left: (width / 6) * i,
                backgroundColor: colors.border.subtle,
              },
            ]}
          />
        ))}
        {/* Horizontal Grid Lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <View
            key={`h-${i}`}
            style={[
              styles.gridLineHorizontal,
              {
                top: (height / 10) * i,
                backgroundColor: colors.border.subtle,
              },
            ]}
          />
        ))}
      </View>

      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <WelcomeHeader />
          <WalletConnectButton />
          <QuickActions />
          <WalletStatus />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
  },
  gridLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
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