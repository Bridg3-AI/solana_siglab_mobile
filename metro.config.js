// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add polyfill resolvers
config.resolver.extraNodeModules.crypto = require.resolve('expo-crypto');

// Fix module resolution for newer SDK versions - disable to fix import.meta error with Zustand
config.resolver.unstable_enablePackageExports = false;

// Add resolverMainFields for better compatibility
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

config.resolver.sourceExts = [...(config.resolver.sourceExts || []), 'web.js', 'web.ts', 'web.tsx'];
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Handle problematic packages
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

config.resolver.alias = {
  ...(config.resolver.alias || {}),
  // Mock react-native-maps for web compatibility
  'react-native-maps': require.resolve('./src/mocks/react-native-maps-web.js'),
  'react-native-maps/lib/components/MapView': require.resolve('./src/mocks/react-native-maps-web.js'),
  'react-native-maps/lib/components/Marker': require.resolve('./src/mocks/react-native-maps-web.js'),
};

// Add resolver to handle react-native-maps web compatibility
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;
