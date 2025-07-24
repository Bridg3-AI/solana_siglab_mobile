import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Animated } from 'react-native';
import RNMapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useMapStore } from '../hooks/useMapStore';
import { useLocation } from '../hooks/useLocation';
import { MapLocation } from '../types';
import { useCyberpunkTheme } from '../../../components/cyberpunk';

const { width, height } = Dimensions.get('window');

export interface MapViewRef {
  animateToRegion: (region: MapLocation, duration?: number) => void;
}

// Custom Cyberpunk Marker Component
const CyberMarker = ({ coordinate, title, type = 'location' }: {
  coordinate: { latitude: number; longitude: number };
  title: string;
  type?: 'location' | 'insurance' | 'geofence';
}) => {
  const { colors } = useCyberpunkTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
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

  const getMarkerColor = () => {
    switch (type) {
      case 'insurance': return colors.neon.magenta;
      case 'geofence': return colors.neon.purple;
      default: return colors.neon.cyan;
    }
  };

  const getMarkerIcon = () => {
    switch (type) {
      case 'insurance': return 'shield-check';
      case 'geofence': return 'vector-polygon';
      default: return 'crosshairs-gps';
    }
  };

  return (
    <Marker coordinate={coordinate} title={title}>
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <View style={styles.customMarker}>
          <LinearGradient
            colors={[getMarkerColor(), `${getMarkerColor()}80`, 'transparent']}
            style={styles.markerGradient}
          >
            <MaterialCommunityIcon
              name={getMarkerIcon()}
              size={20}
              color={colors.dark.void}
            />
          </LinearGradient>
        </View>
      </Animated.View>
    </Marker>
  );
};

export const MapView = forwardRef<MapViewRef>((_, ref) => {
  const { colors } = useCyberpunkTheme();
  const mapRef = useRef<RNMapView>(null);
  const { currentLocation, selectedMarker } = useMapStore();
  
  // Initialize location
  useLocation();

  useImperativeHandle(ref, () => ({
    animateToRegion: (region: MapLocation, duration = 1000) => {
      mapRef.current?.animateToRegion(region, duration);
    },
  }));

  // Dark cyberpunk map style
  const darkMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0a0a0a"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#00ffff"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#0a0a0a"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ff00ff"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8b00ff"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0f1f0f"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1a1a2e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#00ffff"
        },
        {
          "weight": 0.5
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#16213e"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#ff00ff"
        },
        {
          "weight": 1
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0f0f1f"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#00ffff"
        }
      ]
    }
  ];

  return (
    <RNMapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={currentLocation}
      showsUserLocation={false} // We'll use custom user location
      showsMyLocationButton={false}
      customMapStyle={darkMapStyle}
      mapType="standard"
    >
      {/* User location circle with cyber effect */}
      <Circle
        center={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        }}
        radius={100}
        strokeWidth={2}
        strokeColor={colors.neon.lime}
        fillColor={`${colors.neon.lime}20`}
      />
      
      {/* User location marker */}
      <CyberMarker
        coordinate={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        }}
        title="Your Location"
        type="location"
      />
      
      {/* Selected location marker */}
      {selectedMarker && (
        <CyberMarker
          coordinate={{
            latitude: selectedMarker.latitude,
            longitude: selectedMarker.longitude,
          }}
          title={selectedMarker.title}
          type="insurance"
        />
      )}
      
      {/* Sample insurance zones */}
      <Circle
        center={{
          latitude: currentLocation.latitude + 0.01,
          longitude: currentLocation.longitude + 0.01,
        }}
        radius={500}
        strokeWidth={1}
        strokeColor={colors.neon.magenta}
        fillColor={`${colors.neon.magenta}10`}
      />
      
      {/* Sample geofence */}
      <Circle
        center={{
          latitude: currentLocation.latitude - 0.01,
          longitude: currentLocation.longitude - 0.01,
        }}
        radius={300}
        strokeWidth={1}
        strokeColor={colors.neon.purple}
        fillColor={`${colors.neon.purple}10`}
      />
    </RNMapView>
  );
});

const styles = StyleSheet.create({
  map: {
    width: width,
    height: height,
  },
  
  // Custom marker styles
  customMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  markerGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});