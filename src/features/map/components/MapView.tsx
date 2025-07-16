import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import RNMapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useMapStore } from '../hooks/useMapStore';
import { useLocation } from '../hooks/useLocation';
import { MapLocation } from '../types';

const { width, height } = Dimensions.get('window');

export interface MapViewRef {
  animateToRegion: (region: MapLocation, duration?: number) => void;
}

export const MapView = forwardRef<MapViewRef>((_, ref) => {
  const mapRef = useRef<RNMapView>(null);
  const { currentLocation, selectedMarker } = useMapStore();
  
  // Initialize location
  useLocation();

  useImperativeHandle(ref, () => ({
    animateToRegion: (region: MapLocation, duration = 1000) => {
      mapRef.current?.animateToRegion(region, duration);
    },
  }));

  return (
    <RNMapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={currentLocation}
      showsUserLocation={true}
      showsMyLocationButton={true}
    >
      {selectedMarker && (
        <Marker
          coordinate={{
            latitude: selectedMarker.latitude,
            longitude: selectedMarker.longitude,
          }}
          title={selectedMarker.title}
        />
      )}
    </RNMapView>
  );
});

const styles = StyleSheet.create({
  map: {
    width: width,
    height: height,
  },
});