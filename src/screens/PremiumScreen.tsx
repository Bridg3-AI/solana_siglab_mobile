/**
 * Premium Screen - Converted from dApp_UI PremiumCalculation.tsx
 * Insurance premium calculation and configuration
 */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { InsuranceStyles, InsuranceColors, GradientConfigs } from '../theme/insurance-styles';
import type { InsuranceData } from '../navigators/AppNavigator';

type RootStackParamList = {
  Premium: { data: InsuranceData };
  Policy: { data: InsuranceData };
  Indicator: { data: InsuranceData };
};

type PremiumScreenRouteProp = RouteProp<RootStackParamList, 'Premium'>;

export default function PremiumScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<PremiumScreenRouteProp>();
  
  const [insuranceData, setInsuranceData] = useState({
    ...route.params.data,
    premium: route.params.data.premium || 2000,
    maxPayout: route.params.data.maxPayout || 50000,
    reliability: route.params.data.reliability || 92,
  });

  const handleNext = () => {
    navigation.navigate('Policy', { data: insuranceData });
  };

  const handleBack = () => {
    navigation.navigate('Indicator', { data: insuranceData });
  };

  return (
    <SafeAreaView style={InsuranceStyles.safeArea}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={GradientConfigs.background.colors}
        start={GradientConfigs.background.start}
        end={GradientConfigs.background.end}
        style={InsuranceStyles.container}
      >
        {/* Header */}
        <View style={[InsuranceStyles.glassHeader, InsuranceStyles.padding]}>
          <View style={[InsuranceStyles.maxWidth, InsuranceStyles.spaceBetween]}>
            <Pressable onPress={handleBack}>
              <Ionicons name="arrow-back" size={20} color={InsuranceColors.text.primary} />
            </Pressable>
            
            <View style={InsuranceStyles.centerContent}>
              <Text style={[InsuranceStyles.gradientText, { fontSize: 18, fontWeight: '600' }]}>
                Seeker Insurance
              </Text>
              <Text style={[InsuranceStyles.mutedText, { fontSize: 12 }]}>
                Premium Calculation
              </Text>
            </View>
            
            <View style={{ width: 20 }} />
          </View>
          
          {/* Progress Bar */}
          <View style={[InsuranceStyles.maxWidth, { paddingTop: 12 }]}>
            <View style={InsuranceStyles.progressContainer}>
              <View 
                style={[
                  InsuranceStyles.progressFill,
                  { width: `${(4 / 6) * 100}%` } // Step 5 of 7
                ]}
              />
            </View>
          </View>
        </View>

        <View style={[InsuranceStyles.padding, InsuranceStyles.maxWidth, { flex: 1 }]}>
          
          {/* Premium Calculation Result */}
          <Card style={[InsuranceStyles.glassCardWithShadow, { padding: 24, marginBottom: 24 }]}>
            <View style={InsuranceStyles.centerContent}>
              <Ionicons name="calculator" size={32} color={InsuranceColors.primary.teal} style={{ marginBottom: 16 }} />
              
              <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600', marginBottom: 20 }]}>
                Premium Calculation Complete
              </Text>
              
              <View style={{ width: '100%' }}>
                <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                  <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                    Monthly Premium
                  </Text>
                  <Text style={[InsuranceStyles.neonText, { fontSize: 18, fontWeight: '700' }]}>
                    {insuranceData.premium?.toLocaleString()} {insuranceData.currency}
                  </Text>
                </View>
                
                <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                  <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                    Maximum Payout
                  </Text>
                  <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600' }]}>
                    {insuranceData.maxPayout?.toLocaleString()} {insuranceData.currency}
                  </Text>
                </View>
                
                <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                  <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                    Reliability
                  </Text>
                  <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600' }]}>
                    {insuranceData.reliability}%
                  </Text>
                </View>
              </View>
            </View>
          </Card>

          {/* Risk Assessment */}
          <Card style={[InsuranceStyles.glassCard, { padding: 20, marginBottom: 24 }]}>
            <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600', marginBottom: 16 }]}>
              Risk Assessment
            </Text>
            
            <View style={[InsuranceStyles.spaceBetween, { marginBottom: 8 }]}>
              <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                Occurrence Probability
              </Text>
              <Text style={[{ color: InsuranceColors.status.warning }, { fontSize: 14, fontWeight: '600' }]}>
                Low
              </Text>
            </View>
            
            <View style={[InsuranceStyles.spaceBetween, { marginBottom: 8 }]}>
              <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                Expected Loss
              </Text>
              <Text style={[{ color: InsuranceColors.status.success }, { fontSize: 14, fontWeight: '600' }]}>
                Moderate
              </Text>
            </View>
          </Card>

          <View style={{ flex: 1 }} />

          {/* Next Button */}
          <Pressable
            style={({ pressed }) => [
              InsuranceStyles.primaryButton,
              { minHeight: 52 },
              pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
            ]}
            onPress={handleNext}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={InsuranceStyles.primaryButtonText}>
                Preview Policy
              </Text>
              <Ionicons name="arrow-forward" size={16} color={InsuranceColors.background.primary} />
            </View>
          </Pressable>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}