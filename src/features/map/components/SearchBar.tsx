import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Searchbar, List, Card } from 'react-native-paper';
import { useMapStore } from '../hooks/useMapStore';
import { useSearch } from '../hooks/useSearch';
import { Place } from '../types';
import { MapViewRef } from './MapView';

interface SearchBarProps {
  mapRef: React.RefObject<MapViewRef | null>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ mapRef }) => {
  const { 
    searchQuery, 
    searchResults, 
    showResults,
    setSelectedMarker,
    setShowResults,
    setSearchQuery,
  } = useMapStore();
  
  const { handleSearch, clearSearch } = useSearch();

  const handlePlaceSelect = (place: Place) => {
    const newLocation = {
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setSelectedMarker({
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      title: place.name,
    });

    // Animate to location using map ref
    mapRef.current?.animateToRegion(newLocation, 1000);
    setShowResults(false);
    setSearchQuery(place.name);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="장소 검색..."
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
        onClearIconPress={clearSearch}
      />
      
      {showResults && searchResults.length > 0 && (
        <Card style={styles.resultsCard}>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePlaceSelect(item)}>
                <List.Item
                  title={item.name}
                  description={item.formatted_address}
                  left={(props) => <List.Icon {...props} icon="map-marker" />}
                />
              </TouchableOpacity>
            )}
            style={styles.resultsList}
          />
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  searchBar: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resultsCard: {
    marginTop: 5,
    maxHeight: 300,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resultsList: {
    maxHeight: 280,
  },
});
