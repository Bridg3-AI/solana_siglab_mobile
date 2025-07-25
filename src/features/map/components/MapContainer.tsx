import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { MapView, MapViewRef } from './MapView';

export const MapContainer: React.FC = () => {
  const mapRef = useRef<MapViewRef>(null);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});