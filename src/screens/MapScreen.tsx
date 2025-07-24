import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { CyberpunkColors } from '../theme/cyberpunkTheme';
import { cyberpunkEffects } from '../theme/cyberpunkEffects';

export default function MapScreen() {
  const theme = useTheme();
  
  return (
    <View style={{
      flex: 1,
      backgroundColor: CyberpunkColors.darkBackground,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    }}>
      <Text style={[
        cyberpunkEffects.textGlow(CyberpunkColors.neonBlue),
        {
          color: CyberpunkColors.neonBlue,
          fontSize: 24,
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: 20,
        }
      ]}>
        🗺️ Cyberpunk Map
      </Text>
      <Text style={[
        cyberpunkEffects.textGlow(CyberpunkColors.matrixGreen),
        {
          color: CyberpunkColors.matrixGreen,
          fontSize: 16,
          textAlign: 'center',
          lineHeight: 24,
        }
      ]}>
        Neural Network Mapping Interface{'\n'}
        [SYSTEM ONLINE]{'\n'}
        Web Preview Mode
      </Text>
    </View>
  );
}
