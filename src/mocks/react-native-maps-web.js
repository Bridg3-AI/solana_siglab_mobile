const React = require('react');
const { View, Text } = require('react-native');

const MapView = React.forwardRef(({ children, style, provider, region, showsUserLocation, showsMyLocationButton, ...props }, ref) => {
  return (
    <View 
      ref={ref}
      style={[{ 
        backgroundColor: '#1A1A2E', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: 200,
        borderWidth: 1,
        borderColor: '#00FFFF40',
        shadowColor: '#00FFFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
      }, style]}
    >
      <Text style={{ 
        color: '#00FFFF', 
        textAlign: 'center',
        textShadowColor: '#00FFFF',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
        fontSize: 16,
        fontWeight: '600'
      }}>
        🗺️ Cyberpunk Map View{'\n'}(Web Preview)
      </Text>
      {children}
    </View>
  );
});

const Marker = ({ children, coordinate, title, ...props }) => {
  return (
    <View style={{ position: 'absolute' }}>
      <Text style={{ 
        color: '#FF1493',
        textShadowColor: '#FF1493',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 6,
        fontSize: 20
      }}>📍</Text>
      {children || null}
    </View>
  );
};

const Callout = ({ children, ...props }) => {
  return (
    <View style={{ 
      backgroundColor: '#16213E', 
      padding: 8, 
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#8A2BE240'
    }}>
      {children}
    </View>
  );
};

MapView.animateToRegion = () => {};
MapView.animateCamera = () => {};
MapView.fitToElements = () => {};
MapView.fitToSuppliedMarkers = () => {};
MapView.fitToCoordinates = () => {};

const PROVIDER_GOOGLE = 'google';
const PROVIDER_DEFAULT = 'default';

const Polyline = View;
const Polygon = View;
const Circle = View;
const Overlay = View;
const Heatmap = View;
const Geojson = View;

module.exports = {
  default: MapView,
  MapView,
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Polyline,
  Polygon,
  Circle,
  Overlay,
  Heatmap,
  Geojson,
};
