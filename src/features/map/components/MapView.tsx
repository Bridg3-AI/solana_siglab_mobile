import React, { useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useMapStore } from '../hooks/useMapStore';
import { useLocation } from '../hooks/useLocation';
import { MapLocation } from '../types';


export interface MapViewRef {
  animateToRegion: (region: MapLocation, duration?: number) => void;
}

export const MapView = forwardRef<MapViewRef>((_, ref) => {
  const { currentLocation, selectedMarker } = useMapStore();
  
  // Initialize location
  useLocation();

  useImperativeHandle(ref, () => ({
    animateToRegion: (region: MapLocation, duration = 1000) => {
      console.log('Map animation requested for region:', region);
      // For iframe maps, animation is handled by Google Maps
    },
  }));

  const getGoogleMapsEmbedUrl = () => {
    if (currentLocation) {
      const markers = selectedMarker ? 
        `&markers=${selectedMarker.latitude},${selectedMarker.longitude}` : '';
      return `https://www.google.com/maps/embed/v1/view?key=AIzaSyApk_NP_rGg-ZR4-HGM0Ppt4DT1p797yG0&center=${currentLocation.latitude},${currentLocation.longitude}&zoom=15${markers}`;
    }
    return 'https://www.google.com/maps/embed/v1/view?key=AIzaSyApk_NP_rGg-ZR4-HGM0Ppt4DT1p797yG0&center=37.5665,126.9780&zoom=10'; // Default to Seoul
  };

  const getHtmlContent = () => {
    const mapUrl = getGoogleMapsEmbedUrl();
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Google Maps</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            height: 100%;
            overflow: hidden;
          }
          iframe {
            width: 100%;
            height: 100vh;
            border: none;
            display: block;
          }
        </style>
      </head>
      <body>
        <iframe 
          src="${mapUrl}"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </body>
      </html>
    `;
  };

  return (
    <View style={styles.container}>
      {/* Google Maps iframe via WebView */}
      <WebView
        source={{ html: getHtmlContent() }}
        style={styles.map}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <MaterialCommunityIcon name="loading" size={32} color="#007AFF" />
            <Text style={styles.loadingText}>
              {currentLocation ? 'Loading map...' : 'Getting your location...'}
            </Text>
          </View>
        )}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  map: {
    flex: 1,
  },
  
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    zIndex: 1,
  },
  
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
    textAlign: 'center',
  },
});