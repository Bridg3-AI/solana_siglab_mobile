import { Place } from '../types';
import Constants from 'expo-constants';

// Simple API key test function
export const testGoogleApiKey = async (): Promise<boolean> => {
  if (!GOOGLE_API_KEY) {
    console.error('No API key configured');
    return false;
  }

  try {
    // Simple test query for Seoul
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=Seoul&key=${GOOGLE_API_KEY}`
    );
    
    const data = await response.json();
    console.log('API Key test result:', data.status);
    
    if (data.status === 'OK') {
      console.log('✅ Google API key is valid and working');
      return true;
    } else {
      console.error('❌ Google API key test failed:', data.status, data.error_message);
      return false;
    }
  } catch (error) {
    console.error('❌ API key test error:', error);
    return false;
  }
};

// Google API Key from multiple sources
const GOOGLE_API_KEY = 
  process.env.EXPO_PUBLIC_GOOGLE_API_KEY || 
  Constants.expoConfig?.extra?.EXPO_PUBLIC_GOOGLE_API_KEY ||
  'AIzaSyApk_NP_rGg-ZR4-HGM0Ppt4DT1p797yG0';

console.log('🔑 API Key sources:');
console.log('- process.env.EXPO_PUBLIC_GOOGLE_API_KEY:', process.env.EXPO_PUBLIC_GOOGLE_API_KEY ? 'Found' : 'Not found');
console.log('- Constants.expoConfig?.extra?.EXPO_PUBLIC_GOOGLE_API_KEY:', Constants.expoConfig?.extra?.EXPO_PUBLIC_GOOGLE_API_KEY ? 'Found' : 'Not found');
console.log('- Using API key:', GOOGLE_API_KEY.substring(0, 10) + '...');

interface GeocodingResult {
  place_id: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  address_components: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
}

export const searchPlaces = async (query: string): Promise<Place[]> => {
  if (!query.trim()) {
    return [];
  }

  // Validate API key
  if (!GOOGLE_API_KEY) {
    console.error('Google API key is not configured');
    return [];
  }

  console.log('Using Google API key:', GOOGLE_API_KEY.substring(0, 10) + '...');

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&language=ko`;
    console.log('Making request to:', url.replace(GOOGLE_API_KEY, '[API_KEY]'));
    
    // Use Google Geocoding API for place search
    const response = await fetch(url);
    
    const data = await response.json();
    console.log('API Response status:', data.status);
    
    if (data.status === 'OK' && data.results) {
      console.log('Found', data.results.length, 'results');
      // Transform geocoding results to our Place format
      return data.results.slice(0, 5).map((result: GeocodingResult) => ({
        place_id: result.place_id,
        name: result.address_components[0]?.long_name || query,
        formatted_address: result.formatted_address,
        geometry: {
          location: {
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
          }
        }
      }));
    } else if (data.status === 'ZERO_RESULTS') {
      console.log('No results found for query:', query);
      return [];
    } else {
      console.error('Geocoding API error:', data.status, data.error_message || 'No error message');
      if (data.status === 'REQUEST_DENIED') {
        console.error('API Key validation failed. Please check:');
        console.error('1. API key is correct');
        console.error('2. Geocoding API is enabled');
        console.error('3. API key restrictions (if any) allow this request');
        console.error('4. Billing is set up for the project');
      }
      return [];
    }
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};