// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add polyfill resolvers
config.resolver.extraNodeModules.crypto = require.resolve('expo-crypto');

// Fix module resolution for newer SDK versions
config.resolver.unstable_enablePackageExports = true;

// Add resolverMainFields for better compatibility
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Handle problematic packages
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Platform-specific module resolution for Solana Mobile Wallet Adapter
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Skip Solana Mobile Wallet Adapter modules on iOS
  if (platform === 'ios' && (
    moduleName.includes('@solana-mobile/mobile-wallet-adapter') ||
    moduleName === '@solana-mobile/mobile-wallet-adapter-protocol' ||
    moduleName === '@solana-mobile/mobile-wallet-adapter-protocol-web3js'
  )) {
    return {
      type: 'empty',
    };
  }
  
  
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
