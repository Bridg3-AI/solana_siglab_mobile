import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { MapView, MapViewRef } from './MapView';
import { SearchBar } from './SearchBar';

export const MapContainer: React.FC = () => {
  const mapRef = useRef<MapViewRef | null>(null);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} />
      <SearchBar mapRef={mapRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
