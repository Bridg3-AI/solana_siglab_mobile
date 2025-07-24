import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { MapView, MapViewRef } from './MapView';
import { SearchBar } from './SearchBar';
import {
  CyberCard,
  CyberText,
  NeonText,
  TerminalText,
  useCyberpunkTheme
} from '../../../components/cyberpunk';

const { width, height } = Dimensions.get('window');

export const MapContainer: React.FC = () => {
  const { colors } = useCyberpunkTheme();
  const mapRef = useRef<MapViewRef>(null);
  
  // Animation refs
  const radarAnim = useRef(new Animated.Value(0)).current;
  const gridAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Radar sweep animation
    Animated.loop(
      Animated.timing(radarAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();

    // Grid pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(gridAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(gridAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // GPS pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
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
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.dark.void }]}>
      {/* Dark overlay for cyberpunk aesthetic */}
      <View style={styles.darkOverlay} />
      
      {/* Cyber Grid Overlay */}
      <View style={styles.cyberGrid}>
        {/* Vertical grid lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <Animated.View
            key={`v-${i}`}
            style={[
              styles.gridLineVertical,
              {
                left: (width / 8) * i,
                backgroundColor: colors.neon.cyan,
                opacity: gridAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.1, 0.3],
                }),
              },
            ]}
          />
        ))}
        {/* Horizontal grid lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <Animated.View
            key={`h-${i}`}
            style={[
              styles.gridLineHorizontal,
              {
                top: (height / 12) * i,
                backgroundColor: colors.neon.cyan,
                opacity: gridAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.1, 0.3],
                }),
              },
            ]}
          />
        ))}
      </View>

      {/* Map View */}
      <MapView ref={mapRef} />
      
      {/* Radar Overlay */}
      <View style={styles.radarContainer}>
        <Animated.View
          style={[
            styles.radarSweep,
            {
              transform: [
                {
                  rotate: radarAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={[
              'transparent',
              `${colors.neon.lime}40`,
              `${colors.neon.lime}80`,
            ]}
            style={styles.radarGradient}
          />
        </Animated.View>
      </View>

      {/* GPS Status HUD */}
      <CyberCard variant="glass" style={styles.gpsStatus}>
        <View style={styles.gpsContent}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <MaterialCommunityIcon
              name="satellite-variant"
              size={20}
              color={colors.neon.lime}
            />
          </Animated.View>
          <View style={styles.gpsInfo}>
            <TerminalText style={styles.gpsLabel}>GPS_LOCK</TerminalText>
            <NeonText neonColor="lime" variant="caption" style={styles.gpsValue}>
              ACTIVE | SAT: 12
            </NeonText>
          </View>
        </View>
      </CyberCard>

      {/* Neural Search Interface */}
      <SearchBar mapRef={mapRef} />

      {/* Map Controls HUD */}
      <View style={styles.mapControls}>
        {/* Geofence Toggle */}
        <CyberCard variant="neon" glowColor="magenta" style={styles.controlCard}>
          <MaterialCommunityIcon
            name="vector-polygon"
            size={24}
            color={colors.neon.magenta}
          />
        </CyberCard>
        
        {/* Insurance Zones */}
        <CyberCard variant="neon" glowColor="purple" style={styles.controlCard}>
          <MaterialCommunityIcon
            name="shield-check"
            size={24}
            color={colors.neon.purple}
          />
        </CyberCard>
        
        {/* Layer Toggle */}
        <CyberCard variant="neon" glowColor="cyan" style={styles.controlCard}>
          <MaterialCommunityIcon
            name="layers"
            size={24}
            color={colors.neon.cyan}
          />
        </CyberCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  
  // Dark overlay
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
  
  // Cyber grid overlay
  cyberGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    pointerEvents: 'none',
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
  
  // Radar overlay
  radarContainer: {
    position: 'absolute',
    top: height * 0.3,
    right: 20,
    width: 120,
    height: 120,
    zIndex: 3,
    pointerEvents: 'none',
  },
  radarSweep: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  radarGradient: {
    flex: 1,
    transform: [{ rotate: '45deg' }],
  },
  
  // GPS Status HUD
  gpsStatus: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  gpsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gpsInfo: {
    marginLeft: 8,
  },
  gpsLabel: {
    fontSize: 10,
    letterSpacing: 0.5,
  },
  gpsValue: {
    fontSize: 9,
  },
  
  // Map controls
  mapControls: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 4,
  },
  controlCard: {
    width: 48,
    height: 48,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});