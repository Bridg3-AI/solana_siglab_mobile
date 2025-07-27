/**
 * Policy Screen - Converted from dApp_UI PolicyPreview.tsx
 * Insurance policy preview and confirmation
 */
import React from 'react';
import { View, Text, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { InsuranceStyles, InsuranceColors, GradientConfigs } from '../theme/insurance-styles';
import type { InsuranceData } from '../navigators/AppNavigator';

type RootStackParamList = {
  Policy: { data: InsuranceData };
  Monitoring: { data: InsuranceData };
  Premium: { data: InsuranceData };
};

type PolicyScreenRouteProp = RouteProp<RootStackParamList, 'Policy'>;

export default function PolicyScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<PolicyScreenRouteProp>();
  
  const insuranceData = route.params.data;

  const handleConfirm = () => {
    const finalData: InsuranceData = {
      ...insuranceData,
      status: 'active',
      id: Date.now().toString(),
    };
    navigation.navigate('Monitoring', { data: finalData });
  };

  const handleBack = () => {
    navigation.navigate('Premium', { data: insuranceData });
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
                Policy Preview
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
                  { width: `${(5 / 6) * 100}%` } // Step 6 of 7
                ]}
              />
            </View>
          </View>
        </View>

        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={InsuranceStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={[InsuranceStyles.padding, InsuranceStyles.maxWidth]}>
            
            {/* Policy Summary */}
            <Card style={[InsuranceStyles.glassCardWithShadow, { padding: 24, marginBottom: 24 }]}>
              <View style={InsuranceStyles.centerContent}>
                <Ionicons 
                  name="document-text" 
                  size={32} 
                  color={InsuranceColors.primary.teal} 
                  style={{ marginBottom: 16 }} 
                />
                
                <Text style={[InsuranceStyles.primaryText, { fontSize: 18, fontWeight: '600', marginBottom: 8 }]}>
                  Insurance Policy Summary
                </Text>
                
                <View style={{ 
                  backgroundColor: InsuranceColors.glass.accent, 
                  padding: 16, 
                  borderRadius: 12, 
                  width: '100%',
                  marginBottom: 20 
                }}>
                  <Text style={[InsuranceStyles.primaryText, { fontSize: 14, textAlign: 'center' }]}>
                    {insuranceData.description}
                  </Text>
                </View>
              </View>
            </Card>

            {/* Policy Details */}
            <Card style={[InsuranceStyles.glassCard, { padding: 20, marginBottom: 24 }]}>
              <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600', marginBottom: 16 }]}>
                Insurance Details
              </Text>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  Measurement Indicator
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 14 }]}>
                  {insuranceData.indicator}
                </Text>
              </View>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  Threshold Value
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 14 }]}>
                  {insuranceData.threshold}
                </Text>
              </View>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  Duration
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 14 }]}>
                  {insuranceData.period} days
                </Text>
              </View>
            </Card>

            {/* Financial Terms */}
            <Card style={[InsuranceStyles.glassCard, { padding: 20, marginBottom: 24 }]}>
              <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600', marginBottom: 16 }]}>
                Premium & Compensation
              </Text>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  Monthly Premium
                </Text>
                <Text style={[InsuranceStyles.neonText, { fontSize: 16, fontWeight: '600' }]}>
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
            </Card>

            {/* Terms and Conditions */}
            <Card style={[InsuranceStyles.glassCard, { padding: 20, marginBottom: 24 }]}>
              <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600', marginBottom: 16 }]}>
                Terms and Conditions
              </Text>
              
              <Text style={[InsuranceStyles.mutedText, { fontSize: 12, lineHeight: 16, marginBottom: 8 }]}>
                • Premium is automatically deducted monthly
              </Text>
              <Text style={[InsuranceStyles.mutedText, { fontSize: 12, lineHeight: 16, marginBottom: 8 }]}>
                • Compensation is automatically paid when conditions are met
              </Text>
              <Text style={[InsuranceStyles.mutedText, { fontSize: 12, lineHeight: 16, marginBottom: 8 }]}>
                • You can cancel the insurance at any time
              </Text>
              <Text style={[InsuranceStyles.mutedText, { fontSize: 12, lineHeight: 16 }]}>
                • Data is collected in real-time from certified APIs
              </Text>
            </Card>

            {/* Confirm Button */}
            <Pressable
              style={({ pressed }) => [
                InsuranceStyles.primaryButton,
                { minHeight: 52, marginBottom: 24 },
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
              ]}
              onPress={handleConfirm}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Ionicons name="checkmark-circle" size={20} color={InsuranceColors.background.primary} />
                <Text style={InsuranceStyles.primaryButtonText}>
                  Subscribe to Insurance
                </Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}