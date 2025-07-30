import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
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

const { width, height } = Dimensions.get('window');

// Fuji Rock Festival coordinates (Naeba Ski Resort)
const FUJI_ROCK_LOCATION = {
  latitude: 36.8447,
  longitude: 138.8049,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015,
};

export interface MapViewRef {
  animateToRegion: (region: MapLocation, duration?: number) => void;
}

export const FestivalMapView = forwardRef<MapViewRef>((_, ref) => {
  const { currentLocation } = useMapStore();
  const { theme } = useSeekerTheme();
  const [showInsurancePanel, setShowInsurancePanel] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  
  // Initialize location
  useLocation();

  useImperativeHandle(ref, () => ({
    animateToRegion: (region: MapLocation, duration = 1000) => {
      console.log('Map animation requested for region:', region);
    },
  }));

  const getMapHtml = () => {
    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY || 'AIzaSyCHZhmwEiFnbwKcSFPbtCkmTmkaFyIDVBE';
    
    return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <style>
    body { margin: 0; padding: 0; }
    #map { width: 100%; height: 100vh; }
    .custom-marker {
      background: white;
      border: 2px solid #4ECDC4;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .info-window {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      padding: 10px;
    }
    .info-title {
      font-weight: 600;
      margin-bottom: 4px;
      color: #1a1a1a;
    }
    .info-desc {
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    let map;
    let markers = [];
    
    function initMap() {
      // Festival center
      const festivalCenter = { lat: ${FUJI_ROCK_LOCATION.latitude}, lng: ${FUJI_ROCK_LOCATION.longitude} };
      
      // Create map
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: festivalCenter,
        mapTypeId: 'satellite',
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ visibility: "on" }, { color: "#000000" }, { weight: 2 }]
          }
        ]
      });

      // Festival boundary polygon
      const festivalBounds = [
        { lat: 36.8460, lng: 138.8030 },
        { lat: 36.8460, lng: 138.8070 },
        { lat: 36.8430, lng: 138.8070 },
        { lat: 36.8430, lng: 138.8030 }
      ];

      const festivalPolygon = new google.maps.Polygon({
        paths: festivalBounds,
        strokeColor: '#4ECDC4',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#4ECDC4',
        fillOpacity: 0.2
      });
      festivalPolygon.setMap(map);

      // Stage markers
      const stages = [
        {
          position: { lat: 36.8450, lng: 138.8045 },
          title: 'Main Stage',
          description: 'Fred Again, Vampire Weekend',
          icon: '🎵'
        },
        {
          position: { lat: 36.8445, lng: 138.8055 },
          title: 'Green Stage',
          description: 'HAIM, Radwimps',
          icon: '🎸'
        },
        {
          position: { lat: 36.8440, lng: 138.8050 },
          title: 'Field of Heaven',
          description: 'Electronic & Chill',
          icon: '🎹'
        }
      ];

      // Add stage markers
      stages.forEach(stage => {
        const marker = new google.maps.Marker({
          position: stage.position,
          map: map,
          title: stage.title,
          label: {
            text: stage.icon,
            fontSize: '20px'
          }
        });

        const infoWindow = new google.maps.InfoWindow({
          content: \`
            <div class="info-window">
              <div class="info-title">\${stage.title}</div>
              <div class="info-desc">\${stage.description}</div>
            </div>
          \`
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      // Risk zones (circles)
      const mainStageRisk = new google.maps.Circle({
        strokeColor: '#FF6B6B',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF6B6B',
        fillOpacity: 0.3,
        map: map,
        center: { lat: 36.8450, lng: 138.8045 },
        radius: 50
      });

      const greenStageRisk = new google.maps.Circle({
        strokeColor: '#4ECDC4',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#4ECDC4',
        fillOpacity: 0.3,
        map: map,
        center: { lat: 36.8445, lng: 138.8055 },
        radius: 40
      });

      // User location (if available)
      ${currentLocation ? `
        const userMarker = new google.maps.Marker({
          position: { lat: ${currentLocation.latitude}, lng: ${currentLocation.longitude} },
          map: map,
          title: 'Your Location',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeColor: 'white',
            strokeWeight: 2
          }
        });
      ` : ''}
    }

    // Send message to React Native when map is ready
    window.onload = () => {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'mapReady' }));
      }
    };
  </script>
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap"></script>
</body>
</html>
    `;
  };

  return (
    <View style={styles.container}>
      {/* Map WebView */}
      <WebView
        source={{ html: getMapHtml() }}
        style={styles.map}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background.primary }]}>
            <MaterialCommunityIcon name="loading" size={32} color={theme.colors.primary.teal} />
            <SeekerText variant="body" color="secondary" style={styles.loadingText}>
              Loading festival map...
            </SeekerText>
          </View>
        )}
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);
          console.log('Map message:', data);
        }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

      {/* Top Festival Info Bar */}
      <View style={styles.topOverlay}>
        <SeekerCard variant="glass" style={styles.statusCard}>
          <View style={styles.festivalHeader}>
            <View style={[styles.festivalIcon, { backgroundColor: '#FF6B6B20' }]}>
              <MaterialCommunityIcon 
                name="music-box-multiple" 
                size={20} 
                color="#FF6B6B" 
              />
            </View>
            <View style={styles.festivalInfo}>
              <SeekerText variant="h3" color="primary" style={styles.festivalName}>
                Fuji Rock Festival 2025
              </SeekerText>
              <SeekerText variant="caption" color="secondary">
                July 25-27 • Naeba Ski Resort, Japan
              </SeekerText>
            </View>
          </View>
          
          {/* Quick stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <MaterialCommunityIcon name="account-group" size={16} color={theme.colors.primary.teal} />
              <SeekerText variant="caption" color="secondary" style={styles.statText}>
                ~150k attendees
              </SeekerText>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcon name="weather-partly-cloudy" size={16} color={theme.colors.status.warning} />
              <SeekerText variant="caption" color="secondary" style={styles.statText}>
                26°C, 60% rain
              </SeekerText>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcon name="shield-check" size={16} color={theme.colors.status.success} />
              <SeekerText variant="caption" color="secondary" style={styles.statText}>
                Coverage active
              </SeekerText>
            </View>
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
                <View style={[styles.insuranceIcon, { backgroundColor: '#FF6B6B20' }]}>
                  <MaterialCommunityIcon 
                    name="account-injury" 
                    size={20} 
                    color="#FF6B6B" 
                  />
                </View>
                <View style={styles.insuranceContent}>
                  <SeekerText variant="body" color="primary" style={styles.insuranceTitle}>
                    Festival Full Coverage
                  </SeekerText>
                  <SeekerText variant="caption" color="secondary">
                    Medical, theft, cancellation
                  </SeekerText>
                </View>
                <SeekerText variant="body" color="accent" style={styles.insurancePrice}>
                  0.08 SOL
                </SeekerText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.insuranceCard}>
                <View style={[styles.insuranceIcon, { backgroundColor: theme.colors.primary.teal + '20' }]}>
                  <MaterialCommunityIcon 
                    name="clock-time-eight" 
                    size={20} 
                    color={theme.colors.primary.teal} 
                  />
                </View>
                <View style={styles.insuranceContent}>
                  <SeekerText variant="body" color="primary" style={styles.insuranceTitle}>
                    Day Pass Protection
                  </SeekerText>
                  <SeekerText variant="caption" color="secondary">
                    24-hour coverage
                  </SeekerText>
                </View>
                <SeekerText variant="body" color="accent" style={styles.insurancePrice}>
                  0.03 SOL
                </SeekerText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.insuranceCard}>
                <View style={[styles.insuranceIcon, { backgroundColor: theme.colors.status.warning + '20' }]}>
                  <MaterialCommunityIcon 
                    name="crowd" 
                    size={20} 
                    color={theme.colors.status.warning} 
                  />
                </View>
                <View style={styles.insuranceContent}>
                  <SeekerText variant="body" color="primary" style={styles.insuranceTitle}>
                    Mosh Pit Extra
                  </SeekerText>
                  <SeekerText variant="caption" color="secondary">
                    High-risk zone coverage
                  </SeekerText>
                </View>
                <SeekerText variant="body" color="accent" style={styles.insurancePrice}>
                  +0.02 SOL
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
                  Festival Insurance
                </SeekerText>
                <SeekerText variant="caption" color="secondary">
                  Get protected for Fuji Rock
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

// Add this component export
export { FestivalMapView as MapView };

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
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  
  festivalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  festivalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  festivalInfo: {
    flex: 1,
  },
  
  festivalName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  statText: {
    marginLeft: 4,
    fontSize: 11,
  },
  
  customMarker: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4ECDC4',
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