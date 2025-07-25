import { StyleSheet } from 'react-native';

export const signInStyles = StyleSheet.create({
  // Connect button styles
  connectButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 8,
  },
  connectGradient: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    opacity: 0.8,
  },
  
  // Sign in button styles
  signInButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  signInContainer: {
    borderWidth: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  signInGradient: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    position: 'relative',
  },
  circuitOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
  },
  circuitDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  circuitLine: {
    position: 'absolute',
    top: 10,
    right: 0,
    left: 8,
    height: 1,
    opacity: 0.6,
  },
  
  // Shared button content styles
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 13,
    letterSpacing: 1,
    fontWeight: '600',
  },
});