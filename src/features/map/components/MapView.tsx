import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useMapStore } from '../hooks/useMapStore';
import { useLocation } from '../hooks/useLocation';
import { MapLocation } from '../types';
import { 
  SeekerCard, 
  SeekerText, 
  SeekerButton,
  useSeekerTheme 
} from '../../../components/seeker';


export interface MapViewRef {
  animateToRegion: (region: MapLocation, duration?: number) => void;
}

export const MapView = forwardRef<MapViewRef>((_, ref) => {
  const { currentLocation, selectedMarker } = useMapStore();
  const { theme } = useSeekerTheme();
  const [showInsurancePanel, setShowInsurancePanel] = useState(false);
  
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
          <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background.primary }]}>
            <MaterialCommunityIcon name="loading" size={32} color={theme.colors.primary.teal} />
            <SeekerText variant="body" color="secondary" style={styles.loadingText}>
              {currentLocation ? 'Loading map...' : 'Getting your location...'}
            </SeekerText>
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

      {/* Top Status Bar */}
      <View style={styles.topOverlay}>
        <SeekerCard variant="glass" style={styles.statusCard}>
          <View style={styles.statusContent}>
            <View style={[styles.locationIcon, { backgroundColor: theme.colors.status.success + '20' }]}>
              <MaterialCommunityIcon 
                name="crosshairs-gps" 
                size={16} 
                color={theme.colors.status.success} 
              />
            </View>
            <View style={styles.locationInfo}>
              <SeekerText variant="caption" color="primary" style={styles.locationLabel}>
                {currentLocation ? 'Location Found' : 'Searching...'}
              </SeekerText>
              <SeekerText variant="caption" color="secondary" style={styles.coordinates}>
                {currentLocation ? 
                  `${currentLocation.latitude.toFixed(4)}, ${currentLocation.longitude.toFixed(4)}` : 
                  'GPS Acquiring...'
                }
              </SeekerText>
            </View>
            <TouchableOpacity 
              style={[styles.refreshButton, { backgroundColor: theme.colors.primary.teal + '20' }]}
              onPress={() => {
                // Refresh location logic
                console.log('Refreshing location...');
              }}
            >
              <MaterialCommunityIcon 
                name="refresh" 
                size={16} 
                color={theme.colors.primary.teal} 
              />
            </TouchableOpacity>
          </View>
        </SeekerCard>
      </View>

      {/* Bottom Insurance Panel */}
      <View style={styles.bottomOverlay}>
        {showInsurancePanel ? (
          <SeekerCard variant="solid" style={styles.insurancePanel} elevated>
            <View style={styles.panelHeader}>
              <View>
                <SeekerText variant="h3" color="primary" style={styles.panelTitle}>
                  Coverage Available
                </SeekerText>
                <SeekerText variant="body" color="secondary" style={styles.panelSubtitle}>
                  Location-based insurance for this area
                </SeekerText>
              </View>
              <TouchableOpacity 
                onPress={() => setShowInsurancePanel(false)}
                style={styles.closeButton}
              >
                <MaterialCommunityIcon 
                  name="close" 
                  size={20} 
                  color={theme.colors.text.tertiary} 
                />
              </TouchableOpacity>
            </View>
            
            <View style={styles.insuranceOptions}>
              <TouchableOpacity style={styles.insuranceCard}>
                <View style={[styles.insuranceIcon, { backgroundColor: theme.colors.primary.teal + '20' }]}>
                  <MaterialCommunityIcon 
                    name="shield-check" 
                    size={20} 
                    color={theme.colors.primary.teal} 
                  />
                </View>
                <View style={styles.insuranceContent}>
                  <SeekerText variant="body" color="primary" style={styles.insuranceTitle}>
                    Travel Protection
                  </SeekerText>
                  <SeekerText variant="caption" color="secondary">
                    Coverage for trips and activities
                  </SeekerText>
                </View>
                <SeekerText variant="body" color="accent" style={styles.insurancePrice}>
                  0.05 SOL
                </SeekerText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.insuranceCard}>
                <View style={[styles.insuranceIcon, { backgroundColor: theme.colors.status.warning + '20' }]}>
                  <MaterialCommunityIcon 
                    name="map-marker-radius" 
                    size={20} 
                    color={theme.colors.status.warning} 
                  />
                </View>
                <View style={styles.insuranceContent}>
                  <SeekerText variant="body" color="primary" style={styles.insuranceTitle}>
                    Location Shield
                  </SeekerText>
                  <SeekerText variant="caption" color="secondary">
                    GPS-triggered coverage zone
                  </SeekerText>
                </View>
                <SeekerText variant="body" color="accent" style={styles.insurancePrice}>
                  0.03 SOL
                </SeekerText>
              </TouchableOpacity>
            </View>

            <SeekerButton
              title="Get Coverage"
              variant="primary"
              fullWidth
              style={styles.getCoverageButton}
              onPress={() => {
                console.log('Getting coverage...');
              }}
            />
          </SeekerCard>
        ) : (
          <SeekerCard variant="solid" style={styles.quickAccessCard} elevated>
            <TouchableOpacity 
              style={styles.quickAccessContent}
              onPress={() => setShowInsurancePanel(true)}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: theme.colors.primary.teal + '20' }]}>
                <MaterialCommunityIcon 
                  name="shield-plus" 
                  size={20} 
                  color={theme.colors.primary.teal} 
                />
              </View>
              <View style={styles.quickAccessText}>
                <SeekerText variant="body" color="primary" style={styles.quickAccessTitle}>
                  Insurance Available
                </SeekerText>
                <SeekerText variant="caption" color="secondary">
                  Tap to view coverage options
                </SeekerText>
              </View>
              <MaterialCommunityIcon 
                name="chevron-up" 
                size={20} 
                color={theme.colors.text.tertiary} 
              />
            </TouchableOpacity>
          </SeekerCard>
        )}
      </View>

      {/* Floating Action Buttons */}
      <View style={styles.fabContainer}>
        <TouchableOpacity 
          style={[styles.fab, { backgroundColor: theme.colors.background.surface }]}
          onPress={() => {
            // Center on current location
            console.log('Centering on location...');
          }}
        >
          <MaterialCommunityIcon 
            name="crosshairs-gps" 
            size={24} 
            color={theme.colors.primary.teal} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.fab, { backgroundColor: theme.colors.background.surface, marginTop: 12 }]}
          onPress={() => {
            // Toggle layers
            console.log('Toggling layers...');
          }}
        >
          <MaterialCommunityIcon 
            name="layers" 
            size={24} 
            color={theme.colors.primary.teal} 
          />
        </TouchableOpacity>
      </View>
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
    zIndex: 1,
  },
  
  loadingText: {
    marginTop: 12,
    textAlign: 'center',
  },

  // Top overlay styles
  topOverlay: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  
  statusCard: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  locationInfo: {
    flex: 1,
  },
  
  locationLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  
  coordinates: {
    fontSize: 11,
  },
  
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Bottom overlay styles
  bottomOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  
  // Insurance panel styles
  insurancePanel: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    maxHeight: 300,
  },
  
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  
  panelTitle: {
    marginBottom: 4,
  },
  
  panelSubtitle: {
    fontSize: 14,
  },
  
  closeButton: {
    padding: 4,
  },
  
  insuranceOptions: {
    marginBottom: 20,
  },
  
  insuranceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  insuranceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  insuranceContent: {
    flex: 1,
  },
  
  insuranceTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  
  insurancePrice: {
    fontSize: 15,
    fontWeight: '600',
  },
  
  getCoverageButton: {
    marginTop: 8,
  },

  // Quick access card styles
  quickAccessCard: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  
  quickAccessContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  quickAccessIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  quickAccessText: {
    flex: 1,
  },
  
  quickAccessTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },

  // Floating Action Buttons
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 140,
    zIndex: 10,
  },
  
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});