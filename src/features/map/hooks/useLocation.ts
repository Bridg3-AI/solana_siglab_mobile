import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';
import { useMapStore } from './useMapStore';
import { MapLocation } from '../types';
import { testGoogleApiKey } from '../services/placesService';

const getCurrentLocation = async (): Promise<MapLocation> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  
  if (status !== 'granted') {
    throw new Error('Location permission not granted');
  }

  const location = await Location.getCurrentPositionAsync({});
  
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
};

export const useLocation = () => {
  const setCurrentLocation = useMapStore((state) => state.setCurrentLocation);

  const locationQuery = useQuery({
    queryKey: ['user-location'],
    queryFn: getCurrentLocation,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  useEffect(() => {
    if (locationQuery.data) {
      setCurrentLocation(locationQuery.data);
    }
  }, [locationQuery.data, setCurrentLocation]);

  // Test Google API key when component mounts
  useEffect(() => {
    testGoogleApiKey();
  }, []);

  return {
    location: locationQuery.data,
    isLoading: locationQuery.isLoading,
    error: locationQuery.error,
    refetch: locationQuery.refetch,
  };
};