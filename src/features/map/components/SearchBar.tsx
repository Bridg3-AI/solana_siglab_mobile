import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, TextInput, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useMapStore } from '../hooks/useMapStore';
import { useSearch } from '../hooks/useSearch';
import { Place } from '../types';
import { MapViewRef } from './MapView';
import {
  CyberCard,
  CyberText,
  NeonText,
  TerminalText,
  useCyberpunkTheme
} from '../../../components/cyberpunk';

interface SearchBarProps {
  mapRef: React.RefObject<MapViewRef>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ mapRef }) => {
  const { colors, spacing } = useCyberpunkTheme();
  const { 
    searchQuery, 
    searchResults, 
    showResults,
    setSelectedMarker,
    setShowResults,
    setSearchQuery,
  } = useMapStore();
  
  const { handleSearch, clearSearch } = useSearch();
  
  // Animation refs
  const scanAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const resultAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Scanning animation
    Animated.loop(
      Animated.timing(scanAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation for search icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    // Results animation
    if (showResults && searchResults.length > 0) {
      Animated.spring(resultAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      resultAnim.setValue(0);
    }
  }, [showResults, searchResults]);

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

  const LocationResultItem = ({ item }: { item: Place }) => (
    <TouchableOpacity 
      onPress={() => handlePlaceSelect(item)}
      style={styles.resultItem}
    >
      <LinearGradient
        colors={[
          `${colors.neon.cyan}10`,
          'transparent',
          `${colors.neon.cyan}10`,
        ]}
        style={styles.resultGradient}
      >
        {/* Location icon */}
        <View style={styles.locationIcon}>
          <MaterialCommunityIcon
            name="map-marker"
            size={16}
            color={colors.neon.cyan}
          />
        </View>
        
        {/* Location info */}
        <View style={styles.locationInfo}>
          <TerminalText style={[styles.locationName, { color: colors.text.primary }]}>
            {item.name}
          </TerminalText>
          <CyberText variant="caption" color="tertiary" style={styles.locationAddress}>
            {item.formatted_address}
          </CyberText>
        </View>
        
        {/* Target icon */}
        <MaterialCommunityIcon
          name="crosshairs"
          size={14}
          color={colors.neon.cyan}
          style={styles.targetIcon}
        />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Neural Search Interface */}
      <CyberCard variant="hologram" glowColor="cyan" style={styles.searchContainer}>
        {/* Scanning line */}
        <Animated.View
          style={[
            styles.scanLine,
            {
              backgroundColor: colors.neon.lime,
              transform: [
                {
                  translateX: scanAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-200, 200],
                  }),
                },
              ],
            },
          ]}
        />
        
        {/* Search header */}
        <View style={styles.searchHeader}>
          <TerminalText style={styles.searchLabel}>
            >> LOCATION_SCAN.exe
          </TerminalText>
        </View>
        
        {/* Search input */}
        <View style={styles.searchInputContainer}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <MaterialCommunityIcon
              name="radar"
              size={20}
              color={colors.neon.cyan}
              style={styles.searchIcon}
            />
          </Animated.View>
          
          <TextInput
            placeholder="ENTER_COORDINATES_OR_LOCATION..."
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={handleSearch}
            style={[styles.searchInput, { color: colors.text.primary }]}
          />
          
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <MaterialCommunityIcon
                name="close-circle"
                size={18}
                color={colors.neon.red}
              />
            </TouchableOpacity>
          )}
        </View>
      </CyberCard>
      
      {/* Neural Search Results */}
      {showResults && searchResults.length > 0 && (
        <Animated.View
          style={[
            styles.resultsContainer,
            {
              transform: [
                {
                  translateY: resultAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }),
                },
              ],
              opacity: resultAnim,
            },
          ]}
        >
          <CyberCard variant="glass" style={styles.resultsCard}>
            {/* Results header */}
            <View style={styles.resultsHeader}>
              <MaterialCommunityIcon
                name="database-search"
                size={16}
                color={colors.neon.lime}
              />
              <TerminalText style={styles.resultsLabel}>
                LOCATION_DATABASE | FOUND: {searchResults.length}
              </TerminalText>
            </View>
            
            {/* Results list */}
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => <LocationResultItem item={item} />}
              style={styles.resultsList}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View style={[styles.separator, { backgroundColor: colors.border.subtle }]} />
              )}
            />
          </CyberCard>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 12,
    right: 12,
    zIndex: 5,
  },
  
  // Search container
  searchContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    opacity: 0.6,
    zIndex: 1,
  },
  
  // Search header
  searchHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchLabel: {
    fontSize: 11,
    letterSpacing: 1,
    opacity: 0.8,
  },
  
  // Search input
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 255, 255, 0.2)',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Courier New',
    letterSpacing: 0.5,
    paddingVertical: 8,
  },
  clearButton: {
    marginLeft: 8,
  },
  
  // Results container
  resultsContainer: {
    marginTop: 8,
  },
  resultsCard: {
    maxHeight: 300,
    overflow: 'hidden',
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 255, 255, 0.1)',
  },
  resultsLabel: {
    marginLeft: 8,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  
  // Result items
  resultsList: {
    maxHeight: 240,
  },
  resultItem: {
    overflow: 'hidden',
  },
  resultGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  locationIcon: {
    marginRight: 12,
    width: 24,
    alignItems: 'center',
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 14,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 11,
    lineHeight: 14,
  },
  targetIcon: {
    marginLeft: 8,
    opacity: 0.7,
  },
  separator: {
    height: 1,
    marginHorizontal: 16,
    opacity: 0.3,
  },
});